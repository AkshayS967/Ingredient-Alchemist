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
  const filter = useRef(false);
  const selectedIngredients = useRef(new Map());
  const [selectedIngredientsArray, setSelectedIngredientsArray] = useState([]);
  const [customQuantityEnabled, setCustomQuantityEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const nutrition = {
    calories: [0, 3000],
    carbs: [0, 500],
    protein: [0, 250],
    fat: [0, 250],
    cholesterol: [0, 750],
    sodium: [0, 1000],
    sugar: [0, 750],
  };

  function updateNutritionFilter(nutritionObj) {
    for (const key in nutritionObj) {
      nutrition[key] = nutritionObj[key];
    }
  }

  function applyNutritionFilter() {
    filter.current = true;
    setLoading(true);
    getRecipes().then(() => setLoading(false));
  }

  function clearNutritionFilter() {
    filter.current = false;
    setLoading(true);
    getRecipes().then(() => setLoading(false));
  }

  async function getRecipes() {
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
      return;
    }
    // API call to aws server for apriori and vector db
    const endpoint =
    process.env.NEXT_PUBLIC_PHASE == "dev"
      ? "http://127.0.0.1:5000/api/recipes"
      : "http://3.7.68.129:5000/api/recipes";

    try {
      const res = await axios.post(endpoint, {
        ingredients: selectedIngredientsArray,
        method: method,
        quantityEnabled: customQuantityEnabled,
        nutrition: nutrition,
        filter: filter.current
      });
      setRecipes(res.data);
    } catch (err) {
      setRecipes([]);
    }
  }

  return (
    <RecipeAPIContext.Provider
      value={{
        getRecipes,
        setMethod,
        setSelectedIngredientsArray,
        setLoading,
        updateNutritionFilter,
        applyNutritionFilter,
        clearNutritionFilter,
        setCustomQuantityEnabled,
        method,
        recipes,
        selectedIngredients,
        selectedIngredientsArray,
        customQuantityEnabled,
        loading,
      }}
    >
      {children}
    </RecipeAPIContext.Provider>
  );
}
