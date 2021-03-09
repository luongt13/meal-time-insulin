# Project Overview

## Project Name
Meal Time Insulin

## Project Description
To create a tool to calculate units of insulin to administer based on total carbohydrates for a given meal. This is designed specifically for those that administer insulin before their meal, commonly those diagnosed with type 1 diabetes.

## API and Data Sample
```
{  "totalHits": 4396,
    "currentPage": 1,
    "totalPages": 88,
    "pageList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ],
    "foodSearchCriteria": {
        "query": "pizza",
        "generalSearchInput": "pizza",
        "pageNumber": 1,
        "numberOfResultsPerPage": 50,
        "pageSize": 50,
        "requireAllWords": false
    },
    "foods": [
        {
            "fdcId": 559593,
            "description": "PIZZA",
            "lowercaseDescription": "pizza",
            "dataType": "Branded",
            "gtinUpc": "077387206271",
            "publishedDate": "2019-04-01",
            "brandOwner": "FIGHT'N TOMATO PIZZA CO.",
            "ingredients": "CRUST (ENRICHED FLOUR (WHEAT FLOUR, BARLEY MALT, NIACIN, REDUCED IRON, THIAMINE MONONITRATE, RIBOFLAVIN, FOLIC ACID), WATER, SALT, RYE FLOUR, PALM OIL, FUMARIC ACID, CONTAINS LESS THAN 2% OF DEXTROSE, SOY LECITHIN, VEGETABLE OIL (CANOLA AND/OR SOYBEAN OIL), XANTHAN GUM, YEAST, ACETIC ACID), SAUCE (WATER, TOMATO PASTE, SEASONING (SALT, SUGAR, ONION POWDER, SPICES, XANTHAN AND GUAR GUM, GARLIC POWDER, POTASSIUM SORBATE, CITRIC ACID, TRICALCIUM PHOSPHATE, SOYBEAN OIL), MODIFIED FOOD STARCH, PARMESAN CHEESE (PASTEURIZED COW'S MILK, CHEESE CULTURE, SALT AND ENZYMES), LOW MOISTURE PART SKIM MOZZARELLA CHEESE (PASTEURIZED PART SKIM MILK, CHEESE CULTURES, SALT, ENZYMES), PORK PIZZA TOPPING (PORK, WATER, TEXTURED SOY FLOUR (SOY FLOUR, SALT), CONTAINS 2% OR LESS; SALT, SPICES, HYDROLYZED SOY PROTEIN, MALTODEXTRIN, FLAVORING, PAPRIKA (COLOR), TBHQ, BHT, CITRIC ACID), PEPPERONI (PORK, BEEF, SALT, CONTAINS 2% OR LESS OF FLAVORINGS, DEXTROSE, OLEORESIN OF PAPRIKA, SMOKE FLAVORING, ASCORBIC ACID, LACTIC ACID STARTER CULTURE, SODIUM NITRITE, BHA, BHT, CITRIC ACID), HARD SALAMI (PORK, SALT, DEXTROSE, CONTAINS 2% OR LESS OF BEEF, FLAVORINGS, LACTIC ACID STARTER CULTURE, NATURAL SMOKE FLAVOR, SODIUM NITRITE, SPICES, VITAMIN C (SODIUM ASCORBATE), BHA, BHT, CITRIC ACID), BACON (CURED WITH WATER, SALT, SUGAR, SODIUM ERYTHORBATE, SODIUM NITRITE. MAY ALSO CONTAIN DEXTROSE, FLAVORING, HONEY, DEHYDRATED PORK BROTH, POTASSIUM CHLORIDE, POTASSIUM LACTATE, SMOKE FLAVORING, SODIUM DIACETATE, SODIUM PHOSPHATES)",
            "allHighlightFields": "<b>Brand Owner</b>: FIGHT'N TOMATO <em>PIZZA</em> CO.<br/><b>Ingredients</b>:  MOZZARELLA CHEESE (PASTEURIZED PART SKIM MILK, CHEESE CULTURES, SALT, ENZYMES), PORK <em>PIZZA</em> TOPPING (PORK",
            "score": 604.3352,
            "foodNutrients": [
                {
                    "nutrientId": 1110,
                    "nutrientName": "Vitamin D (D2 + D3), International Units",
                    "nutrientNumber": "324",
                    "unitName": "IU",
                    "derivationCode": "LCCD",
                    "derivationDescription": "Calculated from a daily value percentage per serving size measure",
                    "value": 0.0
                },
                {
                    "nutrientId": 1003,
                    "nutrientName": "Protein",
                    "nutrientNumber": "203",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 10.2
                },
                {
                    "nutrientId": 1004,
                    "nutrientName": "Total lipid (fat)",
                    "nutrientNumber": "204",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 10.8
                },
                {
                    "nutrientId": 1005,
                    "nutrientName": "Carbohydrate, by difference",
                    "nutrientNumber": "205",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 28.0
                },
                {
                    "nutrientId": 1008,
                    "nutrientName": "Energy",
                    "nutrientNumber": "208",
                    "unitName": "KCAL",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 242
                },
                {
                    "nutrientId": 2000,
                    "nutrientName": "Sugars, total including NLEA",
                    "nutrientNumber": "269",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 1.27
                },
                {
                    "nutrientId": 1079,
                    "nutrientName": "Fiber, total dietary",
                    "nutrientNumber": "291",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 1.9
                },
                {
                    "nutrientId": 1087,
                    "nutrientName": "Calcium, Ca",
                    "nutrientNumber": "301",
                    "unitName": "MG",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 127
                },
                {
                    "nutrientId": 1089,
                    "nutrientName": "Iron, Fe",
                    "nutrientNumber": "303",
                    "unitName": "MG",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 3.18
                },
                {
                    "nutrientId": 1092,
                    "nutrientName": "Potassium, K",
                    "nutrientNumber": "306",
                    "unitName": "MG",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 76.0
                },
                {
                    "nutrientId": 1093,
                    "nutrientName": "Sodium, Na",
                    "nutrientNumber": "307",
                    "unitName": "MG",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 669
                },
                {
                    "nutrientId": 1235,
                    "nutrientName": "Sugars, added",
                    "nutrientNumber": "539",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 1.3
                },
                {
                    "nutrientId": 1253,
                    "nutrientName": "Cholesterol",
                    "nutrientNumber": "601",
                    "unitName": "MG",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 22.0
                },
                {
                    "nutrientId": 1257,
                    "nutrientName": "Fatty acids, total trans",
                    "nutrientNumber": "605",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 0.0
                },
                {
                    "nutrientId": 1258,
                    "nutrientName": "Fatty acids, total saturated",
                    "nutrientNumber": "606",
                    "unitName": "G",
                    "derivationCode": "LCCS",
                    "derivationDescription": "Calculated from value per serving size measure",
                    "value": 5.1
                }
            ]
        },
```
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
                {
                    "value": 0.1391,
                    "attr_id": 287
                },
                {
                    "value": 2.461,
                    "attr_id": 291
                },
                {
                    "value": 201.16,
                    "attr_id": 301
                },
                {
                    "value": 2.6536,
                    "attr_id": 303
                },
                {
                    "value": 25.68,
                    "attr_id": 304
                },
                {
                    "value": 231.12,
                    "attr_id": 305
                },
                {
                    "value": 184.04,
                    "attr_id": 306
                },
                {
                    "value": 639.86,
                    "attr_id": 307
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
* Allow users to choose to round their units to the nearest whole or half.
* Use localstorage to store created meals and frequently added food items

## Priority Matrix
![alt text](/assets/priority-matrix.png)

## Timeframes
| Component | Priority | Estimated Time (hours) | Time Invested (hours) | Actual Time (hours) |
| --------- | :----: | :----: | :----: | :----: |
| **INFRASTRUCTURE:** |
| Set up HTML, CSS, JS      | H |  3  | TBD | TBD |
| **DATA:** |
| API                       | H |  6  | 5 | TBD |
| Work with JS and DOM      | H |  4  | 4 | TBD |
| Connect data with page    | H |  3  | 3 | TBD |
| **DESIGN:** |
| Responsive CSS            | H |  6  | TBD | TBD |
| Layout                    | H |  3  | TBD | TBD |
| Add colors/images         | L |  4  | TBD | TBD |
| **FUNCTION:** |
| Functional form           | H |  4  | 1 | TBD |
| Functional list that adds food and carbohydrates | H | 5 | 4 | TBD |
| Functional buttons        | H |  2  | TBD | TBD | 
| Adjust serving size       | H |  5  | 2 | TBD |
| Add and calculate insulin to carbohydrate ratio | H | 3 | TBD | TBD |
| **TOTAL:**                |   |**48**|**TBD**|**TBD**| 

## Code Snippet

## Change Log