const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

// Get all the meals
async function getMealsList(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result.meals; // Return only the "meals" array
    } catch (err) {
        console.log(err);
    }
}
//accessing the meals container
const mealsContainer = document.getElementById('meals-container');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results-container');
//creating the meal card
async function createMealCard() {
    const meals = await getMealsList(url);

    if (meals && meals.length > 0) {
        for (let meal of meals) {
            const mealCard = `<div id="meal-card">
                            <a href='details.html'> 
                            <img src=${meal.strMealThumb} alt="meal-image" class="meal-image" data-mealId=${meal.idMeal}>
                            </a>
                            <p class="meal-name">${meal.strMeal}</p>
                            </div>`;
            mealsContainer.insertAdjacentHTML('beforeend', mealCard);

            //adding event to the meal images 
            document.querySelectorAll('.meal-image')
                .forEach(image => {
                    image.addEventListener('click', (event) => {
                        const mealId = event.target.getAttribute('data-mealId');
                        console.log(mealId);
                        const meal = meals.find(meal => meal.idMeal === mealId);
                        window.sessionStorage.setItem('presentMeal', JSON.stringify(meal));
                    });
                });
        }

    }
}
createMealCard();

//implementing searchn feature

//fetching meals based on query
async function fetchMeals(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const mealsPresnt = await response.json();
        return mealsPresnt.meals;
    }
    catch (err) {
        console.log(err);
    }
}

//displaying the search results
async function displaySearchResult(query) {
    try {
        const meals = await fetchMeals(query);
        searchResults.innerHTML = '';
        if (meals && meals.length > 0) {
            for (let meal of meals) {
                const requiredmeal = `<div id="searched-meal">
            <p class="meal-name">${meal.strMeal}</p>
            <a href='details.html'>
            <button class="details" value=${meal.idMeal}>More Details</button>
            </a>
            <button class="add-favourite" value=${meal.idMeal}>Add to Favourite</button>
           </div>`

                searchResults.insertAdjacentHTML('beforeend', requiredmeal)
            }

            //adding event to all the details buttons
            document.querySelectorAll('.details')
                .forEach(button => {
                    button.addEventListener('click', (event) => {
                        const mealId = event.target.value;
                        const meal = meals.find(meal => meal.idMeal === mealId);
                        window.sessionStorage.setItem('presentMeal', JSON.stringify(meal));
                    });
                });

            //adding event to all the details buttons
            document.querySelectorAll('.add-favourite')
                .forEach(button => {
                    button.addEventListener('click', (event) => {
                        const mealId = event.target.value;
                        const meal = meals.find(meal => meal.idMeal === mealId);

                        const existingMeals = JSON.parse(localStorage.getItem('existingMeals')) || [];
                        // Check if the meal already exists in favorites
                        const mealPresent = existingMeals.find(favMeal => favMeal.idMeal === meal.idMeal);
                        if (!mealPresent) {
                            existingMeals.push(meal);
                            localStorage.setItem('existingMeals', JSON.stringify(existingMeals));
                            alert(`${meal.strMeal} is added to your favourites`);
                        }
                        else {
                            alert(`Meal ${meal.strMeal} is already in favorites`);
                        }
                    });
                });

        }
        else {
            searchResults.innerHTML = '<p style="color:white;">No Meals found for your search.</p>'
        }
    }
    catch (err) {
        console.log(err);
    }
}

//adding event to the search-box
searchBox.addEventListener('input', async (event) => {
    searchResults.innerHTML = '';
    const query = event.target.value.trim();
    if (query === '') return;
    try {
        await displaySearchResult(query);
    }
    catch (err) {
        console.log(err);
    }
});
