import axios from "axios";
import { createContext, useState, useContext, useRef } from "react";

const RecipeAPIContext = createContext();

function useRecipeAPI() {
  return useContext(RecipeAPIContext);
}

export { RecipeAPI, useRecipeAPI };

function RecipeAPI({children}) {

  const server = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:5000/api"
        : "http://13.126.109.92:5000/api",
  });

  const [method, setMethod] = useState("1");
  const selectedIngredients = useRef(new Set());
  const [selectedIngredientsArray, setSelectedIngredientsArray] = useState([]);

  async function getRecipes() {
    return await server.post("/recipes", {
      ingredients: selectedIngredientsArray,
      method,
    });
  }

  async function getRecipe(recipe) {
    return await server.post(`/recipe`, { name: recipe });
  }

  return (
    <RecipeAPIContext.Provider
      value={{ getRecipes, getRecipe, setMethod, setSelectedIngredientsArray, method, selectedIngredients, selectedIngredientsArray}}
    >
      {children}
    </RecipeAPIContext.Provider>
  );
}
