const domain = "https://trackapi.nutritionix.com/v2/search/instant"
const detail = "detailed=true"
const base_url = `${domain}?${detail}&query=`

const nutrients = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id="

let form = document.querySelector('form')
let input= document.querySelector('#search')
let resultsSection = document.querySelector('.results')

function displayResults(foods) {
    foods.forEach(food => {
        console.log(food)
        let item = document.createElement('div')
        item.innerHTML = food.food_name
        resultsSection.appendChild(item)

    })
}
async function getFoodId(query) {
    try {
        let response = await axios.get(`${base_url}${query}`, {
            headers: {
                'x-app-id': '72765c18',
                'x-app-key': '9af4787a2fa9eb00620b9b5328110c9d',
                'x-remote-user-id': '0',
            }
        })
        displayResults(response.data.common)
    } catch {
        alert("No Food Found")
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let foodItem = input.value
    getFoodId(foodItem)
})


//USDA
// const key = "I6G9idb7cmyvfgVNwlhsDegvfMNfGcPJFAfqH4s1"
// const domain = "https://api.nal.usda.gov/fdc/v1/foods/search"
// const parameters = "pageSize=10"
// const base_url = `${domain}?api_key=${key}&${parameters}&query=`


// // https://api.nal.usda.gov/fdc/v1/food/816524?nutrients=25

// let form = document.querySelector('form')
// let input= document.querySelector('#search')


// function displayResults(foods) {
//     foods.forEach(food => {
//         console.log(food)
//     })
// }
// async function getFoodId(query) {
//     try {
//         let response = await axios.get(`${base_url}${query}`)
//         displayResults(response.data.foods)
//         // console.log(response.data.foods)
//     } catch {
//         alert("No Food Found")
//     }
// }

// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     let foodItem = input.value
//     getFoodId(foodItem)
// })
