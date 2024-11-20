import React, { useState } from "react";
import { Meal } from "../types/meal.types";

const SelectedRecipesPage: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);

  const combinedIngredients = selectedRecipes.reduce((acc, recipe) => {
    for (let i = 1; i <= 100; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) acc[ingredient] = (acc[ingredient] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h1>Вибрані рецепти</h1>
      <ul>
        {selectedRecipes.map((recipe) => (
          <li key={recipe.idMeal}>{recipe.strMeal}</li>
        ))}
      </ul>
      <h2>Список інгредієнтів</h2>
      <ul>
        {Object.entries(combinedIngredients).map(([ingredient, count]) => (
          <li key={ingredient}>
            {ingredient}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedRecipesPage;
