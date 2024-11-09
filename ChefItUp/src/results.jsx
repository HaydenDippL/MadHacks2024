import React, { useEffect, useState } from "react";

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    const fetchRecipeNutrition = async (recipeId) => {
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/nutritionWidget.json`;
    
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-key": "dc1dbb148emsh667601f198be67bp12c8a8jsnbd71fa52dcdc",
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
          });
    
          if (!response.ok) {
            throw new Error(`Error fetching recipe details: ${response.status}`);
          }
    
          const data = await response.json();
          return data; // Return detailed recipe data
        } catch (error) {
          setError(error.message);
        }
      };
    
      const fetchRecipeDetails = async (recipeId) => {
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids={recipeId}`;
    
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-key": "dc1dbb148emsh667601f198be67bp12c8a8jsnbd71fa52dcdc",
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
          });
    
          if (!response.ok) {
            throw new Error(`Error fetching recipe details: ${response.status}`);
          }
    
          const data = await response.json();
          return data; // Return detailed recipe data
        } catch (error) {
          setError(error.message);
        }
      };

    const fetchRecipes = async () => {
      const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients";
      const querystring = "?ingredients=apples,flour,sugar&number=5&ignorePantry=false&ranking=1";
      try {
        const response = await fetch(url + querystring, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "dc1dbb148emsh667601f198be67bp12c8a8jsnbd71fa52dcdc",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const recipesData = data.map(item => ({
            title: item.title,
            image: item.image,
            id: item.id,
          }));

        for (let recipe of recipesData) {
            const recipeNutrition = await fetchRecipeNutrition(recipe.id);
            recipe['calories'] = recipeNutrition['calories'];
            recipe['fat'] = recipeNutrition['fat'];
            recipe['protein'] = recipeNutrition['protein'];
            recipe['carbs'] = recipeNutrition['carbs'];
            const recipeDetails = await fetchRecipeDetails(recipe.id);
            recipe['instructions'] = recipeDetails['instructions'];
            console.log(recipesData)
        }

        setRecipes(recipesData.map(item => item.title));
        setImages(recipesData.map(item => item.image));
      } catch (error) {
        setError(error.message);
      }
    };

    // fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe}</h3>
              <img src={images[index]} alt={recipe} style={{ width: "100px" }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeFinder;
