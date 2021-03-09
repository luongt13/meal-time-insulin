// const domain = "https://trackapi.nutritionix.com/v2/search/instant"
// const detail = "detailed=true"
// const base_url = `${domain}?${detail}&query=`

// const nutrients = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id="

// let form = document.querySelector('form')
// let input= document.querySelector('#search')
// let resultsSection = document.querySelector('.results')
// let list = document.querySelector('.list')

// //add to list 
// function addToList(event) {
//     let listItem = document.createElement('div')
//     console.log(event.target.id)
//     // listItem.innerHTML = 
// }


// //go through each gets id, name, photo, adds icon
// function displayResults(foods) {
//     console.log(foods)
//     foods.forEach(food => {
//         //create elements
//         const item = document.createElement('div')
//         item.classList.add('result-item')
//         const icon = document.createElement('img')
//         icon.classList.add('icon')
//         const img = document.createElement('img')
//         const name = document.createElement('p')

//         //add content
//         icon.src = "./assets/add-icon.png"
//         img.src = food.photo.thumb
//         name.innerHTML = food.food_name
//         icon.id = food.nix_item_id

//         //append
//         item.appendChild(icon)
//         item.appendChild(img)
//         item.appendChild(name)
//         resultsSection.appendChild(item)

//         icon.addEventListener('click', addToList)
//     })
// }

// //gets food from database
// async function getFood(query) {
//     try {
//         let response = await axios.get(`${base_url}${query}`, {
//             headers: {
//                 'x-app-id': '72765c18',
//                 'x-app-key': '9af4787a2fa9eb00620b9b5328110c9d',
//                 'x-remote-user-id': '0',
//             }
//         })

//         displayResults(response.data.branded)
//     } catch {
//         alert("No Food Found")
//     }
// }

// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     let foodItem = input.value
//     getFood(foodItem)
// })

//api call related things
const key = "I6G9idb7cmyvfgVNwlhsDegvfMNfGcPJFAfqH4s1"
const domain = "https://api.nal.usda.gov/fdc/v1/foods/search"
const parameters = "pageSize=50"
const base_url = `${domain}?api_key=${key}&${parameters}&query=`
const nutrientDomain = "https://api.nal.usda.gov/fdc/v1/food/"
const limit = "25"


//selecting elements 
let form = document.querySelector('form')
let input = document.querySelector('#search')
let resultsSection = document.querySelector('.results')
let list = document.querySelector('.list')
let listSelect = document.querySelector('#custom-list')

//remove items
function removeItems() {
    while (resultsSection.firstChild) {
        resultsSection.removeChild(resultsSection.firstChild)
    }
}

//add total
function addTotal() {
    
    let array = []
    // let getAmounts = document.querySelectorAll('.carb-amount')
    let getAmounts = document.querySelectorAll('.carb-amount')
    getAmounts.forEach(value => {
        let values = value.innerHTML
        let int = parseInt(values)
        array.push(int)
        console.log(array)
    })

    console.log(array.reduce((accumulator, currentValue) => accumulator + currentValue))
}


//extract and add serving size, serving size unit, and carbs
function extractFacts(facts) {
    //create select element
    let select = document.createElement('select')
    //create input element
    let servingInput = document.createElement('input')
    //add type to input
    servingInput.type = "number"
    //append input to select
    listSelect.appendChild(servingInput)

    //set serving size and unit to variables
    let unit = facts.servingSizeUnit
    let size = facts.servingSize
    
    //create, adds content, and appends
    if (unit === "g") {
    const grams = document.createElement('option')
    grams.innerHTML = `${size}${unit}`
    select.appendChild(grams)
    listSelect.appendChild(select)

    } else if (unit === "ml") {
    const mliters = document.createElement('option')
    const ounces = document.createElement('option')
    mliters.innerHTML = `${size}${unit}`
    ounces.innerHTML = size/30 + "oz"
    select.appendChild(mliters)
    select.appendChild(ounces)
    listSelect.appendChild(select)

    } else {
        const setAmount = document.createElement('option')
        setAmount.innerHTML = `${size}${unit}`
        select.appendChild(setAmount)
        listSelect.appendChild(select)
    }

    //add p tag and desciption to list
    let foodDes = document.createElement('p')
    listSelect.appendChild(foodDes)
    foodDes.innerText = facts.description

    //add p tag and carb amount to p
    let carbAmount = document.createElement('p')
    carbAmount.classList.add('carb-amount')
    let starter = facts.labelNutrients.carbohydrates.value
    // carbAmount.innerHTML = facts.labelNutrients.carbohydrates.value
    listSelect.appendChild(carbAmount)

    //update carb when quantity is added
    servingInput.addEventListener('input', (event)=> {
        let multiplier = event.target.value
        let newAmount = starter * multiplier
        carbAmount.innerHTML = newAmount
        addTotal()
    })

}

//second axious call to get nutrients via id
async function getNutrients(itemId) {
    try {
        const info = await axios.get(`${nutrientDomain}${itemId}?api_key=${key}&nutrients=${limit}`)
        extractFacts(info.data)
    } catch {
        console.log("Cannot Find Nutrients")
    }
}

//get id based on the item they clicked on
function getId(event) {
    getNutrients(event.target.id)
}

//display the search results
function displayResults(foods) {
    foods.forEach(food => {
        //create elements
        const item = document.createElement('div')
        item.classList.add('result-item')
        const icon = document.createElement('img')
        icon.classList.add('icon')
        const name = document.createElement('p')
        const brand = document.createElement('p')

        // //add content
        icon.src = "./assets/add-icon.png"
        name.innerText = food.lowercaseDescription
        icon.id = food.fdcId
        brand.innerHTML = food.brandOwner

        // //append
        item.appendChild(icon)
        item.appendChild(name)
        item.appendChild(brand)
        resultsSection.appendChild(item)

        //when icon is clicked
        icon.addEventListener('click', getId)
    })
}

//first axios call to get list of foods 
async function getFoods(query) {
    try {
        const response = await axios.get(`${base_url}${query}`)
        displayResults(response.data.foods)
    } catch {
        alert("No Food Found")
    }
}

//when search button is clicked
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let foodItem = input.value
    removeItems()
    getFoods(foodItem)
})
