import axios from "axios";
import { createContext, useState, useContext, useRef } from "react";

const RecipeAPIContext = createContext();

function useRecipeAPI() {
  return useContext(RecipeAPIContext);
}

export { RecipeAPI, useRecipeAPI };

function RecipeAPI({ children }) {
  const [method, setMethod] = useState("1");
  const [recipes, setRecipes] = useState([]);
  const selectedIngredients = useRef(new Set());
  const [selectedIngredientsArray, setSelectedIngredientsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calories, setCalories] = useState([0, 3000]);
  const [carbs, setCarbs] = useState([0, 1000]);
  const [protein, setProtein] = useState([0, 1000]);
  const [fat, setFat] = useState([0, 1000]);
  const [cholesterol, setCholesterol] = useState([0, 1000]);
  const [sodium, setSodium] = useState([0, 5000]);
  const [sugar, setSugar] = useState([0, 1000]);

  const server = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:5000/api"
        : "http://3.7.68.129:5000/api",
  });

  async function getRecipes(filter=false) {
    if (selectedIngredientsArray.length == 0) return { data: [] };
    // API call to azure server for genAI
    if (method == "3") {
      const endpoint =
        process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:4000/api/genai"
        : "http://4.247.147.225:4000/api/genai";

      const res = await axios.post(endpoint, {
        ingredients: selectedIngredientsArray,
      });
      if (res.data.success == false) setRecipes([]);
      else setRecipes(res.data);
    }
    // API call to aws server for apriori and vector db
    const endpoint =
    process.env.NEXT_PUBLIC_PHASE == "dev"
      ? "http://127.0.0.1:5000/api/recipes"
      : "http://3.7.68.129:5000/api/recipes";

    const res = await axios.post(endpoint, {
      ingredients: selectedIngredientsArray,
      method,
      nutrition: {
        calories,
        carbs,
        protein,
        fat,
        cholesterol,
        sodium,
        sugar,
      },
      filter,
    });
    if (res.data.success == false) setRecipes([]);
    else setRecipes(res.data);
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
        setLoading,
        setCalories,
        setCarbs,
        setProtein,
        setFat,
        setCholesterol,
        setSodium,
        setSugar,
        calories,
        carbs,
        protein,
        fat,
        cholesterol,
        sodium,
        sugar,
        method,
        recipes,
        selectedIngredients,
        selectedIngredientsArray,
        loading,
      }}
    >
      {children}
    </RecipeAPIContext.Provider>
  );
}
