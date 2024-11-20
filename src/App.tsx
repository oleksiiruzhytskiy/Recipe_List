import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import SelectedRecipesPage from "./pages/SelectedRecipesPage";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <Link to="/">
            <button>All Recipes</button>
          </Link>
          <Link to="/selected">
            <button>Selected Recipes</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />

          <Route path="/selected" element={<SelectedRecipesPage />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
