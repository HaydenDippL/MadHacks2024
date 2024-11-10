import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { useIngredientContext } from "@/context/ingredients-context";

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useIngredientContext();

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
    } catch (error: unknown) {
        console.log(error)
    }
  };

  const fetchRecipes = async () => {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients";
    const queryIngredients = ingredients.join(",");
    const querystring = "?ingredients="+queryIngredients+"&number=5&ignorePantry=false&ranking=1";
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
        console.log(recipesData)

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

      setRecipes(recipesData.map((item: any) => item.title));
      setImages(recipesData.map((item: any) => item.image));
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Button
        className="w-1/2"
        onClick={fetchRecipes}
      >
        Search Recipes
      </Button>
      <ScrollShadow className="cols" hideScrollBar>
          {recipes.map((recipe, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")} disableRipple>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{recipe}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={images[index]}
                width={100}
              />
            </CardBody>
          </Card>
          ))}
        </ScrollShadow>
    </div>
  );
};

export default RecipeFinder;
