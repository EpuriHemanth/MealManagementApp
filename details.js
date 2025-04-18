

const detailsContainer=document.getElementById('details');

//display the meal
function displayMeal(){
    const meal=JSON.parse(window.sessionStorage.getItem('presentMeal'));
   
    const mealDetail=`<div id='img-container'>
    <img class="details-meal-image" src=${meal.strMealThumb}>
    <p class='meal-name'>${meal.strMeal}</p>
    </div>
    <div id='instruction-container'>
    <h1 class='meal-instructions'>Instructions:-</h1>
    <p class='meal-instructions'>${meal.strInstructions}</p>
    </div>`;
    detailsContainer.insertAdjacentHTML('beforeend',mealDetail);
    
}
displayMeal();