# Project Overview

## Project Name
Meal Time Insulin 

Site link to [github pages](https://luongt13.github.io/meal-time-insulin/)
and [surge](http://mealtime-insulin.surge.sh/)

![](/assets/mealtime-rec.gif)
## Project Description
To create a tool to calculate units of insulin to administer based on total carbohydrates for a given meal. This is designed specifically for those that administer insulin before their meal, commonly those diagnosed with type 1 diabetes.

## API and Data Sample
```
{
    "common": [
        {
            "food_name": "pizza",
            "serving_unit": "slice",
            "tag_name": "pizza",
            "serving_qty": 1,
            "common_type": null,
            "tag_id": "1060",
            "photo": {
                "thumb": "https://nix-tag-images.s3.amazonaws.com/1060_thumb.jpg"
            },
            "full_nutrients": [
                {
                    "value": 12.1873,
                    "attr_id": 203
                },
                {
                    "value": 10.3683,
                    "attr_id": 204
                },
                {
                    "value": 35.6631,
                    "attr_id": 205
                },
                {
                    "value": 2.5787,
                    "attr_id": 207
                },
                {
                    "value": 284.62,
                    "attr_id": 208
                },
                {
                    "value": 28.8365,
                    "attr_id": 209
                },
                {
                    "value": 0.214,
                    "attr_id": 210
                },
                {
                    "value": 0.8346,
                    "attr_id": 211
                },
                {
                    "value": 1.07,
                    "attr_id": 212
                },
                {
                    "value": 0.4494,
                    "attr_id": 213
                },
                {
                    "value": 1.1235,
                    "attr_id": 214
                },
                {
                    "value": 0,
                    "attr_id": 221
                },
                {
                    "value": 46.1919,
                    "attr_id": 255
                },
                {
                    "value": 0,
                    "attr_id": 262
                },
                {
                    "value": 0,
                    "attr_id": 263
                },
                {
                    "value": 1190.91,
                    "attr_id": 268
                },
                {
                    "value": 3.8306,
                    "attr_id": 269
                },
```

## Wireframes
[Link to interactive wireframe](https://www.figma.com/proto/t9LAoI0icyOHnMaj4ElcS8/Meal-Time-Insulin?node-id=0%3A3&scaling=contain)
#### Below are screenshots of the wireframe with description
**Image 1:** This page includes the search bar and button. The user will be able to search a food item and results will populate after they click search. The user can then add the food item (possibly modify the serving size now or at the next point). 
![alt text](/assets/wireframe-1.png)

**Image 2:** The added food items are added a list and displayed in this frame (live). The user can modify the serving size (or from previous frame). The total carbohydrates will be sumed up and displayed. 
![alt text](/assets/wireframe-2.png)

**Image 3:** The user will see the total carbohydrate and can add in their custom insulin to carbohydrate ratio as directed from their care team. The units will display (not rounded because some patient round to the nearest half and other to the nearest whole number). A disclaimer will state the units have not been rounded. 
![alt text](/assets/wireframe-3.png)

## MVP/Post MVP

### MVP
* Find and use external API
* Fetch food items and total carbohydrate amount 
* Render data on page
* Allow users to search for food from a database
* Allow users to add food items from the results to a list
* Allow users to adjust serving amount to adjust carbohydrate total
* Allow users to add custom insulin to carbohydrate ratio
* Carbohydrates will be totaled in the list


### Post MVP
* Allow users to filter food items 
* Allow users to add blood gluocose readings
* Allow users to save and update insulin to carbohydrate ratio
* Allow users to choose to round their units to the nearest whole or half
* Use localstorage to store created meals and frequently added food items

## Priority Matrix
![alt text](/assets/priority-matrix.png)

## Timeframes
| Component | Priority | Estimated Time (hours) | Time Invested (hours) | Actual Time (hours) |
| --------- | :----: | :----: | :----: | :----: |
| **INFRASTRUCTURE:** |
| Set up HTML, CSS, JS      | H | 3 | 5 | 5 |
| **DATA:** |
| API                       | H | 6 | 7 | 7 |
| Work with JS and DOM      | H | 4 | 4 | 4 |
| Connect data with page    | H | 3 | 3 | 3 |
| **DESIGN:** |
| Responsive CSS            | H | 6 | 7 | 7 |
| Layout                    | H | 3 | 3 | 3 |
| Add colors/images         | L | 4 | 3 | 3 |
| **FUNCTION:** |
| Functional form           | H | 4 | 3 | 3 |
| Functional list that adds food and carbohydrates | H | 5 | 6 | 6 |
| Functional buttons        | H | 2 | 4 | 4 | 
| Adjust serving size       | H | 5 | 2 | 2 |
| Add and calculate insulin to carbohydrate ratio | H | 3 | 5 | 5 |
| **TOTAL:**                |   |**48**|**52**|**52**| 

## Code Snippet
**Function:** delete list item
1. The user clicks on the remove icon and their parent will be removed
2. The targets previous siblings innerHTML is taken to remove it from the total
3. If there are no items left in the list then the total carbohydrates will be removed. 

```
    deleteIcon.addEventListener('click', (event)=> {
        event.target.parentNode.remove()  
        let test = document.querySelector('.total-carbs')
        test.innerHTML = test.innerHTML - event.target.previousSibling.innerHTML
        if (listSelect.childElementCount === 0) {
            test.remove()
        }
    })
```
**Function:** find units of insulin and round to the half or whole unit
1. Divde the total by the users ratio
2. If they chose round to the half unit then multiply by 2, round then divide by 2
3. If they chose round to the whole unit then round using Math.round()

```
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
```
## Change Log
**Switching APIs**
* API 1: I was unable to get a specific nutrient they were just giving me ids
* API 2: I could get specific nutrients, but limited to certain food items. They also had limit details (i.e. it says apple, but it's actually apple juice and it does not specify anywhere other than ingredients
* Result: I went with API 1. Even though they don't specify "carbohydrates", they provide the specific nutrients under "attribute ids" 