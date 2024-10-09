document.getElementById('search-button').addEventListener('click', fetchRecipes);

function fetchRecipes() {
    const ingredientInput = document.getElementById('ingredient-input').value;
    const ingredient = ingredientInput.split(',').map(ing => ing.trim()).join(',');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => displayRecipes(data.meals))
        .catch(error => console.error('Error fetching recipes:', error));
}
function displayRecipes(meals) {
    const recipeResults = document.getElementById('recipe-results');
    recipeResults.innerHTML = ''; // Clear previous results

    if (!meals) {
        recipeResults.innerHTML = '<p>No recipes found. Please try different ingredients.</p>';
        return;
    }

    meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe';

        // Simulate a description and price for each meal
        const description = "A delicious meal made with fresh ingredients."; // You can customize this
        const price = (Math.random() * 20).toFixed(2); // Simulated price between $0.00 and $20.00

        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <p>${description}</p>
            <p><strong>Price: $${price}</strong></p>
        `;
        recipeResults.appendChild(recipeCard);
    });
}

