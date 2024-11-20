import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/mealApi";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import { useDebounce } from "../hooks/useDebounce";

const ITEMS_PER_PAGE = 10;

const AllRecipes: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <p>Завантаження...</p>;

  // Фільтрація за категорією та пошуком
  const filteredRecipes = recipes.filter((recipe: any) => {
    const matchesCategory = category === "All" || recipe.strCategory === category;
    const matchesSearch = recipe.strMeal
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div style={{ height: "80vh" }}>
      <h1>Рецепти</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search for meal name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={selectCategory}>
          <option value="All">Всі категорії</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Beef">Beef</option>
          <option value="Pork">Pork</option>
          <option value="Pasta">Pasta</option>
          <option value="Dessert">Dessert</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Lamb">Lamb</option>
          <option value="Chicken">Chicken</option>
          <option value="Pork">Pork</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          height: "100%",
        }}
      >
        {paginatedRecipes.map((recipe: any) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      <Pagination
        totalItems={1200}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllRecipes;
