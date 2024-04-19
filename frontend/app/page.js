"use client";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import Recipes from "./component/Recipes.js";
import Sidebar from "./component/Sidebar.js";
import NutritionPanel from "./component/NutritionPanel.js";
import { Select, SelectItem, Tabs, Tab, Card, CardBody, Button, Chip, Switch } from "@nextui-org/react";
import { useRecipeAPI } from "./RecipeAPI.js";
import GenAIRecipe from "./component/GenAIRecipe.js";
import Image from "next/image.js";
import SpeechToText from "./component/SpeechToText.js";

function Home() {
  const {
    selectedIngredients,
    selectedIngredientsArray,
    setSelectedIngredientsArray,
    method,
    customQuantityEnabled,
    setCustomQuantityEnabled,
  } = useRecipeAPI();
  const customInputRef = useRef(null);
  const customInputCountRef = useRef(null);
  const invalidInputErrRef = useRef(null);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [genRecipe, setGenRecipe] = useState(false);
  const [nutritionPanelOpen, setNutritionPanelOpen] = useState(false);
  const [curUnit, setCurUnit] = useState(new Set([]));
  const [transcript, setTranscript] = useState("");
  const [transcriptOn, setTranscriptOn] = useState(false);

  // Reset GenAI Recipe on method change
  useEffect(() => {
    setGenRecipe(false);
  }, [method, selectedIngredientsArray]);

  useEffect(() => {
    setCustomQuantityEnabled(method == 2 && customQuantityEnabled);
  }, [method]);

  useEffect(() => {
    if(customInputRef.current) {
      const inputStr = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      customInputRef.current.value = inputStr;
      const inputList = inputStr.split(" ");
      setSelectedIngredientsArray(inputList);
      setIngredientCount(inputList.length);
      setTranscriptOn(true);
    }
  }, [transcript]);

  function updateSelectedIngredientsArray() {
    if(customQuantityEnabled) {
      setSelectedIngredientsArray([...selectedIngredients.current.entries()]);
      return;
    }
    setSelectedIngredientsArray([...selectedIngredients.current.keys()]);
  }

  function deleteIngredient(ingredient) {
    selectedIngredients.current.delete(ingredient);
    setIngredientCount(selectedIngredients.current.size);
    updateSelectedIngredientsArray();
  }

  function addIngredient(ingredient, amount, unit) {
    if (ingredient === "" || amount <= 0) {
      invalidInputErrRef.current.textContent = "Invalid input";
      setTimeout(() => {
        invalidInputErrRef.current.textContent = "";
      }, 2000);
      return;
    }
    selectedIngredients.current.set(ingredient, amount==null?null:{amount, unit});
    setIngredientCount(selectedIngredients.current.size);
    updateSelectedIngredientsArray();
  }

  const toggleIngredient = useCallback((event) => {
    let ingredient = event.target.textContent;
    selectedIngredients.current.has(ingredient)
      ? deleteIngredient(ingredient)
      : addIngredient(ingredient);
  }, []);

  function addIngredientFromCustomInput() {
    if(customQuantityEnabled) {
      const unit = curUnit.size > 0 ? curUnit.values().next().value : '';
      addIngredient(customInputRef.current.value, customInputCountRef.current.value, unit);
      customInputCountRef.current.value = "";
    } else {
      addIngredient(customInputRef.current.value);
    }
    customInputRef.current.value = "";
  }

  function handleInputKeyDown(event) {
    if(transcriptOn){
      setSelectedIngredientsArray([]);
      setTranscriptOn(false);
      setIngredientCount(0);
      return;
    }
    if (event.key === "Enter") addIngredientFromCustomInput();
  }

  function resetIngredients() {
    selectedIngredients.current.clear();
    setSelectedIngredientsArray([]);
    setIngredientCount(0);
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
            onSelectionChange={resetIngredients}
          >
            {/* Predefined Ingredients */}
            <Tab key="predefined" title="Predefined">
              <Sidebar toggleIngredient={toggleIngredient}/>
            </Tab>
            {/* Custom Ingredients */}
            <Tab key="custom" title="Custom">
              <Card>
                <CardBody className="gap-4">
                  <div className="mr-1 h-6 relative">
                    <span ref={invalidInputErrRef} className="ml-1 text-red-400 text-md font-bold"></span>
                    { method == 2 && <Switch className="absolute top-0 right-0" onClick={resetIngredients} isSelected={customQuantityEnabled} onValueChange={setCustomQuantityEnabled} color="primary">Quantity</Switch> }
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="flex-auto w-5/6 bg-gray-100 hover:bg-gray-200 transition p-4 rounded-xl placeholder-gray-500 text-md outline-none"
                      type="text"
                      placeholder="Enter Ingredient"
                      ref={customInputRef}
                      onKeyDown={handleInputKeyDown}
                    />
                    <SpeechToText setTranscript={setTranscript} />
                  </div>
                  { customQuantityEnabled && 
                  <div className="flex gap-3">
                    <input
                      ref={customInputCountRef}
                      placeholder="Enter Quantity"
                      min="1"
                      type="number"
                      className="flex-auto w-2/3 bg-gray-100 hover:bg-gray-200 transition p-4 rounded-xl placeholder-gray-500 text-md outline-none"
                    />
                    <Select
                      className="flex-auto w-1/3"
                      label="Unit"
                      selectedKeys={curUnit}
                      onSelectionChange={setCurUnit}
                    >
                      <SelectItem key="mg" value="mg">mg</SelectItem>
                      <SelectItem key="g" value="g">g</SelectItem>
                      <SelectItem key="kg" value="kg">kg</SelectItem>
                      <SelectItem key="ml" value="ml">ml</SelectItem>
                      <SelectItem key="l" value="l">l</SelectItem>
                      <SelectItem key="oz" value="oz">oz</SelectItem>
                      <SelectItem key="lb" value="lb">lb</SelectItem>
                      <SelectItem key="cup" value="cup">cup</SelectItem>
                      <SelectItem key="tbsp" value="tbsp">tbsp</SelectItem>
                      <SelectItem key="tsp" value="tsp">tsp</SelectItem>
                      <SelectItem key="fl oz" value="fl oz">fl oz</SelectItem>
                    </Select>
                  </div> }
                  {!transcriptOn && <Button
                    color="primary"
                    className="font-bold w-full"
                    onClick={addIngredientFromCustomInput}
                  >
                    Add Ingredient
                  </Button>}
                  <div className="flex flex-wrap gap-2">
                    { !customQuantityEnabled && selectedIngredientsArray.map((ingredient, index) => (
                      <Chip
                        key={index}
                        onClose={() => deleteIngredient(ingredient)}
                        variant="flat"
                      >
                        {ingredient}
                      </Chip>
                    ))}
                    { customQuantityEnabled && selectedIngredientsArray.map(([ingredient,{amount, unit}], index) => (
                      <Chip
                        key={index}
                        onClose={() => deleteIngredient(ingredient)}
                        variant="flat"
                      >
                       {amount}{unit} {ingredient}
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
