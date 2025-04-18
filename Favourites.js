// window.addEventListener('addToFav', (event) => {
//     const meal = event.detail.meal;
//     const existingMeals = JSON.parse(localStorage.getItem('existingMeals')) || [];
  
//     // Check if the meal already exists in favorites
//     const mealPresent = existingMeals.find(favMeal => favMeal.idMeal === meal.idMeal);
//     if (!mealPresent) {
//         // Add the meal to the favorites array
//         existingMeals.push(meal);
//         // Update localStorage
//         localStorage.setItem('existingMeals', JSON.stringify(existingMeals));
        
//         alert(`${meal.strMeal} is added to your favourites`);
//     } 
//     else {
//         alert(`Meal ${meal.strMeal} is already in favorites`);
//     }
    
// });

const favContainer=document.getElementById('favorites-container');

function displayFavourites() {
    const favMeals = JSON.parse(localStorage.getItem('existingMeals')) || [];
    if(favMeals.length>0){
        favMeals.forEach((favMeal)=>{
            const favMealCard=`<div id='fav-meal'>
            <img src=${favMeal.strMealThumb} id='fav-meal-img'>
            <p id='fav-meal-name'>${favMeal.strMeal}</p>
            <button class='remove-fav' value=${favMeal.idMeal}>Remove</button>
            </div>`;
            favContainer.insertAdjacentHTML('beforeend',favMealCard);
            document.querySelector('.remove-fav')
                    .addEventListener('click',(event)=>{
                        
                        const mealId=event.target.value;
                        const existingMeals=JSON.parse(window.localStorage.getItem('existingMeals'));
                        const updatedMeals=existingMeals.filter(meal => meal.idMeal !=mealId);
                        window.localStorage.setItem('existingMeals',JSON.stringify(updatedMeals));
                        location.reload();
                    })
        });
       
    }
    else{
        favContainer.innerHTML='<p>No favourites are present.</p>'
    }
}
displayFavourites();