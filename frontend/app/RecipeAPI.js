import axios from "axios";
import { createContext, useState, useContext, useRef } from "react";

const RecipeAPIContext = createContext();

function useRecipeAPI() {
  return useContext(RecipeAPIContext);
}

export { RecipeAPI, useRecipeAPI };

function RecipeAPI({ children }) {
  const [method, setMethod] = useState("1");
  const selectedIngredients = useRef(new Set());
  const [selectedIngredientsArray, setSelectedIngredientsArray] = useState([]);

  const server = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:5000/api"
        : "http://13.126.109.92:5000/api",
  });

  async function getRecipes() {
    // API call to azure server for genAI
    if (method == "3") {
      const endpoint =
        process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:4000/api/genai"
        : "http://4.247.147.225:4000/api/genai";

      return await axios.post(endpoint, {
        ingredients: selectedIngredientsArray,
      });
    }
    // API call to aws server for apriori and vector db
    const endpoint =
    process.env.NEXT_PUBLIC_PHASE == "dev"
      ? "http://127.0.0.1:5000/api/recipes"
      : "http://13.126.109.92:5000/api/recipes";

    return await axios.post(endpoint, {
      ingredients: selectedIngredientsArray,
      method,
    });
  }

  async function getRecipe(recipe) {
    return await server.post(`/recipe`, { name: recipe });
  }

  return (
    <RecipeAPIContext.Provider
      value={{
        getRecipes,
        getRecipe,
        setMethod,
        setSelectedIngredientsArray,
        method,
        selectedIngredients,
        selectedIngredientsArray,
      }}
    >
      {children}
    </RecipeAPIContext.Provider>
  );
}
