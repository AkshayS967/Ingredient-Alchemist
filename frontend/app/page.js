"use client";
import { useState, useRef } from "react";
import Checkbox from "./component/Checkbox.js";
import Recipes from "./component/Recipes.js";
import Sidebar from "./component/Sidebar.js";
import { Tabs, Tab, Card, CardBody, Button, Chip } from "@nextui-org/react";

export default function Home() {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Strawberry",
    "Mango",
    "Pineapple",
    "Kiwi",
    "Blueberry",
    "Lemon",
    "Lime",
    "Raspberry",
    "Watermelon",
    "Cherry",
    "Pear",
    "Apricot",
    "Peach",
    "Plum",
    "Cranberry",
    "Coconut",
    "Avocado",
    "Blackberry",
    "Pomegranate",
    "Papaya",
    "Fig",
    "Guava",
    "Passion Fruit",
    "Lychee",
    "Dragon Fruit",
  ];

  const vegetables = [
    "Carrot",
    "Broccoli",
    "Cucumber",
    "Spinach",
    "Tomato",
    "Bell Pepper",
    "Lettuce",
    "Zucchini",
    "Eggplant",
    "Cauliflower",
    "Green Beans",
    "Peas",
    "Radish",
    "Onion",
    "Garlic",
    "Sweet Potato",
    "Asparagus",
    "Mushroom",
    "Celery",
    "Cabbage",
    "Kale",
    "Pumpkin",
    "Brussels Sprouts",
    "Artichoke",
    "Beet",
    "Turnip",
    "Leek",
    "Okra",
    "Rutabaga",
  ];

  const selectedIngredients = useRef(new Set());
  const [selectedIngredientsArray, setSelectedIngredientsArray] = useState([]);
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

  function togglefruit(event) {
    let ingredient = event.target.textContent;
    selectedIngredients.current.has(ingredient)
      ? deleteIngredient(ingredient)
      : addIngredient(ingredient);
  }
  return (
    <main className="">
      <div className="flex gap-5">
        <div className="w-5/12">
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
              <Sidebar category={["Fruits", "Vegetables"]}>
                {[
                  fruits.map((fruit) => (
                    <Checkbox
                      key={fruit}
                      className="m-1 cursor-pointer"
                      onClick={togglefruit}
                    >
                      {fruit}
                    </Checkbox>
                  )),
                  vegetables.map((vegetable) => (
                    <Checkbox
                      key={vegetable}
                      className="m-1 cursor-pointer"
                      onClick={togglefruit}
                    >
                      {vegetable}
                    </Checkbox>
                  )),
                ]}
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
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    className="font-bold bg-red-100 text-red-400"
                    onClick={() => {
                      addIngredient(customInputRef.current.value);
                      customInputRef.current.value = "";
                      setSelectedIngredientsArray([
                        ...selectedIngredients.current,
                      ]);
                    }}
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
        <div className="w-10/12">
          {selectedIngredientsArray.length === 0 && (
            <div className="flex justify-center h-full">
              <h1 className="fixed top-[50%] text-center font-extrabold text-2xl text-gray-400">
                Select Ingredients
              </h1>
            </div>
          )}
          {selectedIngredientsArray.length > 0 && (
            <Recipes selectedIngredientsArray={selectedIngredientsArray} />
          )}
        </div>
      </div>
    </main>
  );
}
