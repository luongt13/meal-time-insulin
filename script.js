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


const key = "I6G9idb7cmyvfgVNwlhsDegvfMNfGcPJFAfqH4s1"
const domain = "https://api.nal.usda.gov/fdc/v1/foods/search"
const parameters = "pageSize=50"
const base_url = `${domain}?api_key=${key}&${parameters}&query=`
const nutrientDomain = "https://api.nal.usda.gov/fdc/v1/food/"
const nutrient_url = `${nutrientDomain}816524?api_key=${key}&${limits}`
const limits = "nutrients=25"

let form = document.querySelector('form')
let input= document.querySelector('#search')
let resultsSection = document.querySelector('.results')
let list = document.querySelector('.list')

function getId(event) {
    let listItem = document.createElement('div')
    getNutrients(event.target.id)
}

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

        icon.addEventListener('click', getId)
    })
}

//second axious call to get nutrients via id
async function getNutrients(itemId) {
    try {
        let nutritionfacts = await axious.get(``)
    }
}


//first axios call to get list of foods 
async function getFoods(query) {
    try {
        let response = await axios.get(`${base_url}${query}`)
        displayResults(response.data.foods)
    } catch {
        alert("No Food Found")
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let foodItem = input.value
    getFoods(foodItem)
})
