//api call related things
const domain = "https://trackapi.nutritionix.com/v2/search/instant"
const detail = "detailed=true"
const base_url = `${domain}?${detail}&query=`

//selecting elements 
let form = document.querySelector('form')
let searchBtn = document.querySelector('#submit')
let input = document.querySelector('#search')
let resultsSection = document.querySelector('.results')
let list = document.querySelector('.list')
let listSelect = document.querySelector('#custom-list')
let endInput = document.querySelector('#insulin-to-carb')
let carbInput = document.querySelector('#carb')
let units = document.querySelector('#units')
let nextBtn = document.querySelector('#next1')
let nextBtn2 = document.querySelector('#next2')
let section1 = document.querySelector('#one')
let section2 = document.querySelector('#two')
let selectRound = document.querySelector('.round')
let startBtn = document.querySelector('#started')

//remove items
function removeItems() {
    while (resultsSection.firstChild) {
        resultsSection.removeChild(resultsSection.firstChild)
    }
}

function remove() {
    while (units.firstChild) {
        units.removeChild(units.firstChild)
    }
}

//display units of insulin
function displayUnits(unitsInsulin) {
    let endUnit = document.createElement('div')
    endUnit.innerHTML = unitsInsulin
    remove()
    units.appendChild(endUnit)
}

//calculate based on input and carb ratio
function calculate(totalCarb, carbRatio) {
    let unitsInsulin = totalCarb/carbRatio
    //rounding
    if (selectRound.value === "Round to half unit") {
        displayUnits(Math.round(unitsInsulin * 2)/2)
    }  else if (selectRound.value === "Round to whole unit") {
        displayUnits(Math.round(unitsInsulin))     
    } else {
        displayUnits(Number(unitsInsulin.toFixed(2)))
    }
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
        array.push(Number(value.innerHTML))
    })
    let total = array.reduce((accumulator, currentValue) => accumulator + currentValue)
    displayTotal(total)
}

//extract and add serving size, serving size unit, and carbs
function addToList(object) {
    let container = document.createElement('div')
    container.classList.add('added')
    //create select element
    let select = document.createElement('div')
    select.classList.add('serving-size')
    //create input element
    let servingInput = document.createElement('input')
    //delete icon
    let deleteIcon = document.createElement('img')
    deleteIcon.classList.add('delete')
    deleteIcon.src = "./assets/delete-icon.png"
    //add type to input
    servingInput.type = "number"
    servingInput.placeholder = "Enter Number"
    servingInput.id = "qty"

    //set serving size and unit to variables
    let unit = object.unit
    let size = object.weight
    let quantity = object.quantity

    //add p tag and desciption to list
    let foodDes = document.createElement('p')
    container.appendChild(foodDes)
    foodDes.innerText = object.name

    //append input to select
    container.appendChild(servingInput)

    //add option and serving sizes
    const setAmount = document.createElement('p')
    setAmount.innerHTML = `${quantity} ${unit} (${size}g)`
    select.appendChild(setAmount)
    container.appendChild(select)

    //add div tag
    let carbAmount = document.createElement('div')
    carbAmount.classList.add('carb-amount')
    let starter = Number(object.carb.toFixed())
    container.appendChild(carbAmount)
    container.appendChild(deleteIcon)
    listSelect.appendChild(container)

    //delete list item and subtract the amount from the total
    deleteIcon.addEventListener('click', (event)=> {
        event.target.parentNode.remove()  
        let test = document.querySelector('.total-carbs')
        test.innerHTML = test.innerHTML - event.target.previousSibling.innerHTML

        //if listSelect has no children then remove test...
        if (listSelect.childElementCount === 0) {
            test.remove()
        }
    })

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
        item.appendChild(icon)
        text.appendChild(name)
        text.appendChild(serving)
        item.appendChild(text)
        item.appendChild(img)
        resultsSection.appendChild(item)
        icon.addEventListener('click', () => addToList(setDetails))
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
        item.appendChild(icon)
        text.appendChild(name)
        text.appendChild(serving)
        item.appendChild(text)
        item.appendChild(img)
        resultsSection.appendChild(item)

        //when icon is clicked
        icon.addEventListener('click', () => addToList(setDetails))    
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
searchBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    let foodItem = input.value
    removeItems()
    await getFoods(foodItem)
    searchBtn.style.margin = "5px 0 5px 0"
    nextBtn.style.display = "block"
    window.scrollTo({
        top: input.offsetTop,
        left: 0,
        behavior: "smooth"
    })
})

startBtn.addEventListener('click', () => {
    window.scrollTo({
        top: input.offsetTop,
        left: 0,
        behavior: "smooth"
    })
})

//button/section to appear after one is clicked 
nextBtn.addEventListener('click', () => {
    nextBtn2.style.display = "block"
    section1.style.display = "block"
    window.scrollTo({
        top: section1.offsetTop,
        left: 0,
        behavior: "smooth"
    })
})

//button to appear after one is clicked
nextBtn2.addEventListener('click', ()=> {
    section2.style.display = "block"
    window.scrollTo({
        top: section2.offsetTop,
        left: 0,
        behavior: "smooth"
    })
})