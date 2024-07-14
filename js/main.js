let rowData = document.getElementById("rowData");
let containerSearch = document.getElementById("containerSearch");
let submitBtn;

$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading-screen").fadeOut(500);
    })
})

function openNav() {
    $(".side-nav").animate({ left: 0 }, 500)
    $(".open-close-icon").removeClass("fa-align-justify")
    $(".open-close-icon").addClass("fa-x")



    for (let i = 0; i < 5; i++) {
        $(".links ul li").eq(i).animate({ top: 0 }, (i + 1) * 300)

    }

}
let outerNavWidth = $(".side-nav .tab").outerWidth();
function closeNav() {
    $(".side-nav ").animate({ left: -outerNavWidth }, 500)
    $(".open-close-icon").removeClass("fa-x")
    $(".open-close-icon").addClass("fa-align-justify")
    $(".links li").animate({ top: 300 }, 500)


}
$(".open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()

    } else {
        openNav()
    }
})
closeNav()


async function searchByName(term) {

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const response = await api.json()
    console.log(response);

    displayFood(response.meals)
    // $("#rowData").html("cartoona")
}


function displayFood(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="col-md-3 position-relative meal overflow-hidden" style="cursor: pointer;" >
                    <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-3" >
                    <div class="meanLayer position-absolute rounded-3">
                        <h3>${arr[i].strMeal}</h3>
                 </div>
                </div>

        `
    }
    $("#rowData").html(cartoona)

}

async function getMealDetails(mealId) {
    closeNav()
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    containerSearch.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    respone = await respone.json();
    $(".inner-loading-screen").fadeOut(300)
    displayMealDetails(respone.meals[0])
}

function displayMealDetails(meal) {
    containerSearch.innerHTML = ""

    let recipes = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`


        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
                     <div class="col-md-4 text-white">
                    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3 mt-3" >
                    <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 text-white">                   
                        <h3 class="mt-3">Instructions</h3>                  
                    <p>${meal.strInstructions}</p>
                    <h3>Area :${meal.strArea} </h3>
                    <h3>Category :${meal.strCategory} </h3>
                    <h3>Recipes : </h3>
                    <ul class="list-unstyled d-flex flex-wrap g-3" >
                               ${recipes}              
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex flex-wrap g-3">
                       ${tagsStr}
                    </ul>

                    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
               </div>
     `
    $("#rowData").html(cartoona)
}

async function searchByName(term) {
    closeNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    $(".inner-loading-screen").fadeOut(300)
    response.meals ? displayFood(response.meals) : displayFood([])
}

async function searchByLetter(term) {
    closeNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayFood(response.meals) : displayFood([])
    $(".inner-loading-screen").fadeOut(300)
}

function showInputs() {
    containerSearch.innerHTML = `
    <div class="row py-4">
                <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" placeholder="Search by name..." class="form-control bg-transparent">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" maxlength="1"  type="text" placeholder="Search by first letter" class="form-control bg-transparent">
            </div>
            </div>
    `
    rowData.innerHTML = ""
}


async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    containerSearch.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    $(".inner-loading-screen").fadeOut(300)
    displayCategories(response.categories)

}
function displayCategories(arr) {

    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
                        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="col-md-3 position-relative meal overflow-hidden" style="cursor: pointer;" >
                    <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 rounded-3" >
                    <div class="meanLayer position-absolute rounded-3 text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                 </div>
                </div>
        `

    }
    $("#rowData").html(cartoona);
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    $(".inner-loading-screen").fadeOut(300)
    displayFood(response.meals.slice(0, 20))
}

async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    containerSearch.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    $(".inner-loading-screen").fadeOut(300)
    displayArea(respone.meals)
}

function displayArea(arr) {
    let cartoona ="";
    for (let i = 0; i < arr.length; i++) {
        cartoona+=`
                <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center text-white" style="cursor: pointer;">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
        
    }
    $("#rowData").html(cartoona);
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    $(".inner-loading-screen").fadeOut(300)
    displayFood(response.meals);
}

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    containerSearch.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    $(".inner-loading-screen").fadeOut(300)
    displayIngredients(respone.meals.slice(0, 20))
    
}

function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center text-white" style="cursor: pointer;">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    $("#rowData").html(cartoona);
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    $(".inner-loading-screen").fadeOut(300)
    displayFood(response.meals.slice(0, 20))

}


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")

    $("#nameInput").focus(() => {
        nameInputTouched = true 
    })
    $("#emailInput").focus(() => {
        emailInputTouched = true 
    })
    $("#phoneInput").focus(() => {
        phoneInputTouched = true 
    })
    $("#ageInput").focus(() => {
        ageInputTouched = true 
    })
    $("#passwordInput").focus(() => {
        passwordInputTouched = true 
    })
    $("#repasswordInput").focus(() => {
        repasswordTouched = true 
    })


}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            $("#nameAlert").removeClass("d-block")
            $("#nameAlert").addClass("d-none")

        } else {        
            $("#nameAlert").removeClass("d-none")
            $("#nameAlert").addClass("d-block")
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            $("#emailAlert").removeClass("d-block")
            $("#emailAlert").addClass("d-none")
        } else {
            $("#emailAlert").removeClass("d-none")
            $("#emailAlert").addClass("d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            $("#phoneAlert").removeClass("d-block")
            $("#phoneAlert").addClass("d-none")
        } else {
            
            $("#phoneAlert").removeClass("d-none")
            $("#phoneAlert").addClass("d-block")
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            $("#ageAlert").removeClass("d-block")
            $("#ageAlert").addClass("d-none")
        } else {
            $("#ageAlert").removeClass("d-none")
            $("#ageAlert").addClass("d-block")
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            $("#passwordAlert").removeClass("d-block")
            $("#passwordAlert").addClass("d-none")
        } else {          
            $("#passwordAlert").removeClass("d-none")
            $("#passwordAlert").addClass("d-block")
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            $("#repasswordAlert").removeClass("d-block")
            $("#repasswordAlert").addClass("d-none")
        } else {
            $("#repasswordAlert").removeClass("d-none")
            $("#repasswordAlert").addClass("d-block") 
        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return $("#repasswordInput").val() == $("#passwordInput").val()
}