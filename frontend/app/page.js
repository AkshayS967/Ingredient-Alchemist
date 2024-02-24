"use client";
import { useState, useRef } from "react";
import Checkbox from "./component/Checkbox.js";
import Recipes from "./component/Recipes.js";
import Sidebar from "./component/Sidebar.js";
import { Tabs, Tab, Card, CardBody, Button, Chip } from "@nextui-org/react";
import { useRecipeAPI } from "./RecipeAPI.js";

export default function Home() {
  const ingredients = { 
    Fruits: ["Apple", "Banana", "Orange", "Grapes", "Strawberry", "Mango", "Pineapple", "Kiwi", "Blueberry", "Lemon", "Lime", "Raspberry", "Watermelon", "Cherry", "Pear", "Apricot", "Peach", "Plum", "Cranberry", "Coconut", "Avocado", "Blackberry", "Pomegranate", "Papaya", "Fig", "Guava", "Passion Fruit", "Lychee", "Dragon Fruit"], 
    Vegetables: ["Carrot", "Broccoli", "Cucumber", "Spinach", "Tomato", "Bell Pepper", "Lettuce", "Zucchini", "Eggplant", "Cauliflower", "Green Beans", "Peas", "Radish", "Onion", "Garlic", "Sweet Potato", "Asparagus", "Mushroom", "Celery", "Cabbage", "Kale", "Pumpkin", "Brussels Sprouts", "Artichoke", "Beet", "Turnip", "Leek", "Okra", "Rutabaga"], 
    Grains: ["Wheat", "Rice", "Barley", "Quinoa", "Oats", "Corn", "Rye", "Bulgur", "Millet", "Buckwheat", "Amaranth", "Farro", "Sorghum"], 
    Proteins: ["Chicken", "Beef", "Pork", "Salmon", "Tuna", "Cod", "Shrimp", "Tofu", "Tempeh", "Lentils", "Black beans", "Kidney beans", "Chickpeas", "Eggs", "Turkey", "Quorn", "Duck", "Lamb", "Venison"], 
    Dairy: ["Milk", "Cheddar", "Mozzarella", "Parmesan", "Yogurt", "Butter", "Cream", "Cottage Cheese", "Sour Cream", "Cream Cheese", "Ricotta", "Feta", "Goat Cheese", "Mascarpone"], "Herbs and Spices": ["Basil", "Parsley", "Cilantro", "Thyme", "Rosemary", "Oregano", "Mint", "Dill", "Sage", "Bay Leaves", "Chili Powder", "Paprika", "Cumin", "Turmeric", "Ginger", "Nutmeg", "Cloves", "Cardamom", "Allspice", "Coriander"], 
    Condiments: ["Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "BBQ Sauce", "Worcestershire Sauce", "Hot Sauce", "Honey", "Maple Syrup", "Balsamic Vinegar", "Apple Cider Vinegar", "Red Wine Vinegar", "White Wine Vinegar", "Salsa", "Pesto", "Tahini", "Fish Sauce", "Teriyaki Sauce", "Hoisin Sauce"] 
  };

  const { selectedIngredients, selectedIngredientsArray, setSelectedIngredientsArray } = useRecipeAPI();
  const customInputRef = useRef(null);

  function deleteIngredient(ingredient) {
    selectedIngredients.current.delete(ingredient);
    setSelectedIngredientsArray([...selectedIngredients.current]);
  }

  function addIngredient(ingredient) {
    if (ingredient === "") return;
    selectedIngredients.current.add(ingredient);
    setSelectedIngredientsArray([...selectedIngredients.current]);
  }

  function toggleIngredient(event) {
    let ingredient = event.target.textContent;
    selectedIngredients.current.has(ingredient)
      ? deleteIngredient(ingredient)
      : addIngredient(ingredient);
  }

  function addIngredientFromCustomInput() {
    addIngredient(customInputRef.current.value);
    customInputRef.current.value = "";
    setSelectedIngredientsArray([...selectedIngredients.current]);
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter")  addIngredientFromCustomInput();
  }
  
  return (
    <main className="">
      <div className="flex gap-5">
        <div className="flex-auto w-4/12 h-[44rem]">
          <h2 className="text-2xl font-bold text-center">Ingredients</h2>
          <Tabs
            className="grid mt-2 px-1"
            aria-label="Options"
            onSelectionChange={() => {
              selectedIngredients.current.clear();
              setSelectedIngredientsArray([]);
            }}
          >
            <Tab key="predefined" title="Predefined">
              <Sidebar category={Object.keys(ingredients)}>
                {Object.entries(ingredients).map(([category, items]) =>
                  items.map((item) => (
                    <Checkbox
                      key={item}
                      className="m-1 cursor-pointer"
                      onClick={toggleIngredient}
                    >
                      {item}
                    </Checkbox>
                  ))
                )}
              </Sidebar>
            </Tab>
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
          {selectedIngredientsArray.length === 0 && (
            <div className="flex justify-center h-full">
              <h1 className="fixed top-[50%] text-center font-extrabold text-2xl text-gray-400">
                Select Ingredients
              </h1>
            </div>
          )}
          {selectedIngredientsArray.length > 0 && (
            <Recipes/>
          )}
        </div>
      </div>
    </main>
  );
}
