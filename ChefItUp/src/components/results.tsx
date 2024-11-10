import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { useIngredientContext } from "@/context/ingredients-context";
import { useMacroContext } from "@/context/macro-context";

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useIngredientContext();
  const [macros, setMacros] = useMacroContext();

  const fetchRecipeNutrition = async (recipeId: number) => {
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
        console.log(error);
    }
  };

  const fetchRecipeDetails = async (recipeId: number) => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=`+recipeId;

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
    } catch (error: unknown) {
        console.log(error)
    }
  };

  const fetchRecipes = async () => {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients";
    const queryIngredients = ingredients.join(",");
    const querystring = "?ingredients="+queryIngredients+"&number=10&ignorePantry=false&ranking=1";
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
      const recipesData = data.map((item: any) => ({
          title: item.title,
          image: item.image,
          id: item.id,
        }));

      for (let recipe of recipesData) {
          const recipeNutrition = await fetchRecipeNutrition(recipe.id);
          recipe['calories'] = recipeNutrition['calories'];
          recipe['fats'] = recipeNutrition['fat'];
          recipe['protein'] = recipeNutrition['protein'];
          recipe['carbs'] = recipeNutrition['carbs'];
          const recipeDetails = await fetchRecipeDetails(recipe.id);
          console.log(recipeDetails[0]['instructions'])
          recipe['instructions'] = recipeDetails[0]['instructions'];
      }

      for (let i = 0; i < recipesData.length; i++) {
        if (recipesData[i]['calories'] > macros['calories']['amount']) {
          delete recipesData[i];
        }
        if (recipesData[i]['protein'] < macros['protein']['amount']) {
          delete recipesData[i];
        }
        if (recipesData[i]['fats'] > macros['fats']['amount']) {
          delete recipesData[i];
        }
        if (recipesData[i]['carbs'] < macros['carbs']['amount']) {
          delete recipesData[i];
        }
      }
      setRecipes(recipesData.map((item: any) => item.title));
      setImages(recipesData.map((item: any) => item.image));
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Button
        className="w-1/2 mb-4"
        onClick={fetchRecipes}
      >
        Search Recipes
      </Button>
      <div className="flex flex-col gap-2">
        {recipes.map((recipe, index) => (
          <Card
            className="h-44 g-4 p-6"
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
            disableRipple
          >
            <div className="flex flex-row items-center">
              <h4 className="flex-1 font-bold text-large mr-4">{recipe}</h4>
              <Image
                  alt="Card background"
                  className="flex-1 object-cover rounded-xl"
                  src={images[index]}
                  width={175}
                />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;
