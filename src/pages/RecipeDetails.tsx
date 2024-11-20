import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../api/mealApi";
import './RecipeDetails.css'; // Import your styles here

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id!),
  });

  let ingredientsAndMeasures: { ingredient: string; measure: string }[] = [];
  if (recipe) {
    ingredientsAndMeasures = Object.entries(recipe)
      .filter(([key, value]) => {
        return (key.includes("strIngredient") || key.includes("strMeasure")) && value;
      })
      .reduce((acc: { ingredient: string; measure: string }[], [key, value]) => {
        if (key.includes("strIngredient")) {
          const ingredientIndex = key.replace("strIngredient", "");
          acc.push({
            ingredient: value as string,
            measure: (recipe[`strMeasure${ingredientIndex}`] as string) || "", // strMeasure по индексу
          });
        }
        return acc;
      }, []);
  }

  if (isLoading) return <p>Завантаження...</p>;

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1 className="headline">{recipe.strMeal}</h1>
      <img className="image" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p className="instruction">{recipe.strInstructions}</p>
      <div className="recipe">
        <ul>
          {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
            <li key={measure + index}>
              <span>{ingredient}</span> - {measure}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
