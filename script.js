//api call related things
const domain = "https://trackapi.nutritionix.com/v2/search/instant"
const detail = "detailed=true"
const base_url = `${domain}?${detail}&query=`

//selecting elements 
let form = document.querySelector('form')
let input = document.querySelector('#search')
let resultsSection = document.querySelector('.results')
let list = document.querySelector('.list')
let listSelect = document.querySelector('#custom-list')
let endInput = document.querySelector('#insulin-to-carb')
let carbInput = document.querySelector('#carb')
let units = document.querySelector('#units')

//remove items
function removeItems() {
    while (resultsSection.firstChild) {
        resultsSection.removeChild(resultsSection.firstChild)
    }
}

//display units of insulin
function displayUnits(unitsInsulin) {
    units.innerHTML = unitsInsulin
}

//calculate based on input and carb ratio
function calculate(totalCarb, carbRatio) {
  let unitsInsulin = totalCarb/carbRatio
  displayUnits(unitsInsulin)
}

//event listener for calculate button to get total carbs and carb ratio
endInput.addEventListener('submit', (event => {
    event.preventDefault()
    let totalCarb = document.querySelector('.total-carbs').innerHTML
    let carbRatio = carbInput.value
    calculate(totalCarb, carbRatio)   
}))

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
//https://stackoverflow.com/questions/34193751/js-remove-last-child

//display total carbs 
function displayTotal(total) {
    if (isNaN(total)) {
    } else {
        let totalCarbs = document.createElement('div')
        // let heading = document.createElement('h4')
        // heading.innerHTML = "Total Carbohydrates: "
        // totalCarbs.appendChild(heading)
        totalCarbs.classList.add('total-carbs')
        list.removeChild(list.lastChild)
        totalCarbs.innerHTML = total
        list.appendChild(totalCarbs)
    }
}

//add total carbs
function addTotal() {
    let array = []
    let getAmounts = document.querySelectorAll('.carb-amount')
    getAmounts.forEach(value => {
        let values = value.innerHTML
        let int = parseInt(values)
        array.push(int)
    })
    let total = array.reduce((accumulator, currentValue) => accumulator + currentValue)
    displayTotal(total)
}

//extract and add serving size, serving size unit, and carbs
function addToList(object) {
    let container = document.createElement('div')
    container.classList.add('added')
    //create select element
    let select = document.createElement('select')
    //create input element
    let servingInput = document.createElement('input')
    //add type to input
    servingInput.type = "number"
    servingInput.placeholder = "Enter Number"
    servingInput.id = "qty"

    //set serving size and unit to variables
    let unit = object.unit
    let size = object.weight

    //add p tag and desciption to list
    let foodDes = document.createElement('p')
    container.appendChild(foodDes)
    foodDes.innerText = object.name

    //append input to select
    container.appendChild(servingInput)

    //add option and serving sizes
    const setAmount = document.createElement('option')
    setAmount.innerHTML = `${unit} (${size}g)`
    select.appendChild(setAmount)
    container.appendChild(select)

    //add div tag
    let carbAmount = document.createElement('div')
    carbAmount.classList.add('carb-amount')
    let starter = object.carb
    container.appendChild(carbAmount)

    listSelect.appendChild(container)
    //update carb when quantity is added
    servingInput.addEventListener('input', (event)=> {
        let multiplier = event.target.value
        let newAmount = starter * multiplier
        carbAmount.innerHTML = newAmount
        addTotal()
    })
}

//display for common foods
function displayCommonResults(foods) {
    foods.forEach(food => {

        //create elements
        const item = document.createElement('div')
        item.classList.add('result-item')
        const icon = document.createElement('img')
        icon.classList.add('icon')
        const img = document.createElement('img')
        img.classList.add('thumbnail')
        const text = document.createElement('div')
        text.classList.add('text')
        const name = document.createElement('p')
        const serving = document.createElement('p')

        //add content
        icon.src = "./assets/add-icon.png"
        img.src = food.photo.thumb
        name.innerHTML = food.food_name
        serving.innerHTML = `${food.serving_qty} ${food.serving_unit}`

        //gather info into object
        const setDetails = {
            name: food.food_name,
            quantity: food.serving_qty,
            unit: food.serving_unit,
            weight: food.serving_weight_grams,
            carb: 0,
        }

        //get specific carb amount for food item
        food.full_nutrients.forEach(carb => {
            if (carb.attr_id === 205) {
               setDetails.carb = carb.value
            }
            })
       
        //append
        item.appendChild(img)
        text.appendChild(name)
        text.appendChild(serving)
        item.appendChild(text)
        item.appendChild(icon)
        resultsSection.appendChild(item)

        icon.addEventListener('click', ()=> addToList(setDetails))
    })
}

//display for branded foods
function displayBrandedResults(brandedFoods) {
    brandedFoods.forEach(brandedFood => {
        //create elements
        const item = document.createElement('div')
        item.classList.add('result-item')
        const icon = document.createElement('img')
        icon.classList.add('icon')
        const img = document.createElement('img')
        img.classList.add('thumbnail')
        const text= document.createElement('div')
        text.classList.add('text')
        const name = document.createElement('p')
        const serving = document.createElement('p')

        // //add content
        icon.src = "./assets/add-icon.png"
        img.src = brandedFood.photo.thumb
        name.innerText = `${brandedFood.food_name}, ${brandedFood.brand_name}`
        serving.innerHTML = `${brandedFood.serving_qty} ${brandedFood.serving_unit}`

         //gather info into object
         const setDetails = {
            name: brandedFood.food_name,
            quantity: brandedFood.serving_qty,
            unit: brandedFood.serving_unit,
            weight: brandedFood.serving_weight_grams,
            carb: 0,
        }

        //get specific carb amount for food item
        brandedFood.full_nutrients.forEach(carb => {
            if (carb.attr_id === 205) {
               setDetails.carb = carb.value
            }
            })

        //append
        item.appendChild(img)
        text.appendChild(name)
        text.appendChild(serving)
        item.appendChild(text)
        item.appendChild(icon)
        resultsSection.appendChild(item)

        //when icon is clicked
        icon.addEventListener('click', ()=> addToList(setDetails))
    })
}

//first axios call to get list of foods 
async function getFoods(query) {
    try {
    let response = await axios.get(`${base_url}${query}`, {
        headers: {
            'x-app-id': '72765c18',
            'x-app-key': '9af4787a2fa9eb00620b9b5328110c9d',
            'x-remote-user-id': '0',
                }
        })
        displayCommonResults(response.data.common)
        displayBrandedResults(response.data.branded)
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


// //api call related things
// const key = "I6G9idb7cmyvfgVNwlhsDegvfMNfGcPJFAfqH4s1"
// const domain = "https://api.nal.usda.gov/fdc/v1/foods/search"
// const parameter1 = "pageSize=50"
// const parameter2 = "dataType=Branded"
// // &${parameter2}
// const base_url = `${domain}?api_key=${key}&${parameter1}&query=`
// const nutrientDomain = "https://api.nal.usda.gov/fdc/v1/food/"
// const limit = "25"



// //selecting elements 
// let form = document.querySelector('form')
// let input = document.querySelector('#search')
// let resultsSection = document.querySelector('.results')
// let list = document.querySelector('.list')
// let listSelect = document.querySelector('#custom-list')

// //remove items
// function removeItems() {
//     while (resultsSection.firstChild) {
//         resultsSection.removeChild(resultsSection.firstChild)
//     }
// }
// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
// //https://stackoverflow.com/questions/34193751/js-remove-last-child
// //display total carbs 
// function displayTotal(total) {
//     if (isNaN(total)) {
//     } else {
//         let totalCarbs = document.createElement('div')
//         list.removeChild(list.lastChild)
//         totalCarbs.innerHTML = total
//         list.appendChild(totalCarbs)
//     }
// }

// //add total carbs
// function addTotal() {
//     let array = []
//     let getAmounts = document.querySelectorAll('.carb-amount')
//     getAmounts.forEach(value => {
//         let values = value.innerHTML
//         let int = parseInt(values)
//         array.push(int)
//     })
//     let total = array.reduce((accumulator, currentValue) => accumulator + currentValue)
//     console.log(array)
//     displayTotal(total)
// }


// //extract and add serving size, serving size unit, and carbs
// function extractFacts(facts) {
//     //create select element
//     let select = document.createElement('select')
//     //create input element
//     let servingInput = document.createElement('input')
//     //add type to input
//     servingInput.type = "number"
//     //append input to select
//     listSelect.appendChild(servingInput)

//     // console.log(facts.brandedFoodCategory)

//     //set serving size and unit to variables
//     let unit = facts.servingSizeUnit
//     let size = facts.servingSize
    
//     //create, adds content, and appends
//     if (unit === "g") {
//         const grams = document.createElement('option')
//         grams.innerHTML = `${size}${unit}`
//         select.appendChild(grams)
//         listSelect.appendChild(select)

//     } else if (unit === "ml") {
//         const mliters = document.createElement('option')
//         const ounces = document.createElement('option')
//         mliters.innerHTML = `${size}${unit}`
//         ounces.innerHTML = size/30 + "oz"
//         select.appendChild(mliters)
//         select.appendChild(ounces)
//         listSelect.appendChild(select)

//     } else {
//         const setAmount = document.createElement('option')
//         setAmount.innerHTML = `${size}${unit}`
//         select.appendChild(setAmount)
//         listSelect.appendChild(select)
//     }

//     //add p tag and desciption to list
//     let foodDes = document.createElement('p')
//     listSelect.appendChild(foodDes)
//     foodDes.innerText = facts.description

//     //add div tag
//     let carbAmount = document.createElement('div')
//     carbAmount.classList.add('carb-amount')
//     let starter = facts.labelNutrients.carbohydrates.value
//     listSelect.appendChild(carbAmount)

//     //update carb when quantity is added
//     servingInput.addEventListener('input', (event)=> {
//         let multiplier = event.target.value
//         let newAmount = starter * multiplier
//         carbAmount.innerHTML = newAmount
//         addTotal()
//     })
// }

// //second axious call to get nutrients via id
// async function getNutrients(itemId) {
//     try {
//         const info = await axios.get(`${nutrientDomain}${itemId}?api_key=${key}&nutrients=${limit}`)
//         // extractFacts(info.data)
//         console.log(info)
//     } catch {
//         console.log("Cannot Find Nutrients")
//     }
// }

// //get id based on the item they clicked on
// function getId(event) {
//     getNutrients(event.target.id)
// }

// //display the search results
// function displayResults(foods) {
//     foods.forEach(food => {

//         //create elements
//         const item = document.createElement('div')
//         item.classList.add('result-item')
//         const icon = document.createElement('img')
//         icon.classList.add('icon')
//         const name = document.createElement('p')
//         const brand = document.createElement('p')

//         // //add content
//         icon.src = "./assets/add-icon.png"
//         name.innerText = food.lowercaseDescription
//         icon.id = food.fdcId

//         if (food.brandOwner === undefined ) {
//             console.log(food)
//         } else {
//             brand.innerHTML = food.brandOwner
//         }

//         //append
//         item.appendChild(icon)
//         item.appendChild(name)
//         item.appendChild(brand)

//         resultsSection.appendChild(item)

//         //when icon is clicked
//         icon.addEventListener('click', getId)

//     })
// }

// //first axios call to get list of foods 
// async function getFoods(query) {
//     try {
//         const response = await axios.get(`${base_url}${query}`)
//         displayResults(response.data.foods)
//     } catch {
//         alert("No Food Found")
//     }
// }

// //when search button is clicked
// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     let foodItem = input.value
//     removeItems()
//     getFoods(foodItem)
// })
