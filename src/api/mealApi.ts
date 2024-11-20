import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipes = async (): Promise<any> => {
  const { data } = await axios.get(`${API_URL}/search.php?s`);
  console.log("mealApi fetchRecipes data:", data);

  return data.meals;
};

export const fetchRecipeById = async (id: string): Promise<any> => {
  const { data } = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  return data.meals[0];
};
