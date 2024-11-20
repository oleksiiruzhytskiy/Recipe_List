import React from "react";
import { Link } from "react-router-dom";
import { Meal } from "../types/meal.types";

interface RecipeCardProps {
  recipe: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: ".5rem", width: "250px", height: '400px' }}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="100%" />
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strCategory}</p>
      <p>{recipe.strArea}</p>
      <Link to={`/recipes/${recipe.idMeal}`}>Деталі</Link>
    </div>
  );
};

export default RecipeCard;
