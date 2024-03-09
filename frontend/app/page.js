"use client";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import Recipes from "./component/Recipes.js";
import Sidebar from "./component/Sidebar.js";
import NutritionPanel from "./component/NutritionPanel.js";
import { Tabs, Tab, Card, CardBody, Button, Chip } from "@nextui-org/react";
import { useRecipeAPI } from "./RecipeAPI.js";
import GenAIRecipe from "./component/GenAIRecipe.js";
import Image from "next/image.js";

function Home() {
  const {
    selectedIngredients,
    selectedIngredientsArray,
    setSelectedIngredientsArray,
    method,
  } = useRecipeAPI();
  const customInputRef = useRef(null);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [genRecipe, setGenRecipe] = useState(false);
  const [nutritionPanelOpen, setNutritionPanelOpen] = useState(false);

  // Reset GenAI Recipe on method change
  useEffect(() => {
    setGenRecipe(false);
  }, [method, selectedIngredientsArray]);

  function deleteIngredient(ingredient) {
    selectedIngredients.current.delete(ingredient);
    setIngredientCount(selectedIngredients.current.size);
    setSelectedIngredientsArray([...selectedIngredients.current]);
  }

  function addIngredient(ingredient) {
    if (ingredient === "") return;
    selectedIngredients.current.add(ingredient);
    setIngredientCount(selectedIngredients.current.size);
    setSelectedIngredientsArray([...selectedIngredients.current]);
  }

  const toggleIngredient = useCallback((event) => {
    let ingredient = event.target.textContent;
    selectedIngredients.current.has(ingredient)
      ? deleteIngredient(ingredient)
      : addIngredient(ingredient);
  }, []);

  function addIngredientFromCustomInput() {
    addIngredient(customInputRef.current.value);
    customInputRef.current.value = "";
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter") addIngredientFromCustomInput();
  }

  return (
    <main className="">
      <div className="flex gap-5">
        <div className="flex-auto w-4/12">
          <div className="mb-4 relative flex items-center justify-center h-12 text-2xl font-bold text-center">
            <span>Ingredients</span>
            <div className={`${nutritionPanelOpen?'bg-red-100 border-red-500' : 'bg-gray-200'}  border-3 rounded-xl mr-1 p-0.5 cursor-pointer absolute right-0`}
              onClick={() => setNutritionPanelOpen(!nutritionPanelOpen)}>
              <Image
                src="/Nutrition.png"
                alt="nutrition"
                width={35}
                height={35}
              />
            </div>
          </div>
          <NutritionPanel isOpen={nutritionPanelOpen} />
          {/* Tabs to toggle between predefined and custom ingredients */}
          <Tabs
            className="grid mt-2 px-1"
            aria-label="Options"
            onSelectionChange={() => {
              selectedIngredients.current.clear();
              setSelectedIngredientsArray([]);
              setIngredientCount(0);
            }}
          >
            {/* Predefined Ingredients */}
            <Tab key="predefined" title="Predefined">
              <Sidebar toggleIngredient={toggleIngredient}/>
            </Tab>
            {/* Custom Ingredients */}
            <Tab key="custom" title="Custom">
              <Card>
                <CardBody className="gap-4">
                  <input
                    className="bg-gray-100 p-4 rounded-xl text-md outline-none"
                    type="text"
                    placeholder="Enter Ingredient"
                    ref={customInputRef}
                    onKeyDown={handleInputKeyDown}
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    className="font-bold bg-red-100 text-red-400"
                    onClick={addIngredientFromCustomInput}
                  >
                    Add Ingredient
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredientsArray.map((ingredient, index) => (
                      <Chip
                        key={index}
                        onClose={() => deleteIngredient(ingredient)}
                        variant="flat"
                      >
                        {ingredient}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        <div className="flex-auto w-8/12">
          {/* When no ingredients are selected, display a message to the user to select ingredients */}
          {ingredientCount == 0 && (
            <div className="flex justify-center h-full">
              <h1 className="fixed top-[50%] text-center font-extrabold text-2xl text-gray-400">
                Select Ingredients
              </h1>
            </div>
          )}
          {/* When ingredients are selected, display recipes */}
          {ingredientCount > 0 && method != "3" && <Recipes />}
          {/* When ingredients are selected and method is Gen AI, display the GenAIRecipe component */}
          {ingredientCount > 0 && method == "3" && (
            <div className="flex justify-center mt-10 px-5">
              {!genRecipe && (
                <Button
                  color="primary"
                  variant="flat"
                  className="font-bold bg-red-100 text-red-400 w-4/12 mt-6"
                  onClick={() =>
                    setGenRecipe(true)
                  }
                >
                  Generate Recipe
                </Button>
              )}
              {genRecipe && <GenAIRecipe />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default memo(Home);
