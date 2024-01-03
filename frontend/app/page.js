"use client";
import { useState } from "react";
import Checkbox from "./component/Checkbox.js";
import Recipes from "./component/Recipes.js";
import Sidebar from "./component/Sidebar.js";

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



  const [selectedIngredients,setSelectedIngredients] = useState(new Set());

  function deleteIngredient(ingredient) {
    selectedIngredients.delete(ingredient);
    setSelectedIngredients(new Set(selectedIngredients));
  }

  function addIngredient(ingredient) {
    selectedIngredients.add(ingredient);
    setSelectedIngredients(new Set(selectedIngredients));
  }

  function togglefruit(event) {
    let ingredient = event.target.textContent;
    selectedIngredients.has(ingredient) ? deleteIngredient(ingredient)  : addIngredient(ingredient);
    console.log([...selectedIngredients]);
  }
  return (
    <main className="">
      <div className="flex gap-5">
        <div className="w-5/12">
          <h2 className="text-2xl font-bold text-center">Ingredients</h2>
          <Sidebar category={["Fruits","Vegetables"]}>
            {[fruits.map((fruit) => (
              <Checkbox key={fruit} className="m-1 cursor-pointer" onClick={togglefruit}>
                {fruit}
              </Checkbox>
            )),
            vegetables.map((vegetable) => (
              <Checkbox key={vegetable} className="m-1 cursor-pointer" onClick={togglefruit}>
                {vegetable}
              </Checkbox>
            ))
            ]}
          </Sidebar>
        </div>
        <div className="w-10/12">
          {selectedIngredients.size === 0 && <div className="flex justify-center h-full"><h1 className="fixed top-[50%] text-center font-extrabold text-2xl text-gray-400">Select Ingredients</h1></div>}
          {selectedIngredients.size >0 && <Recipes selectedIngredients={selectedIngredients}/>}
        </div>
      </div>
    </main>
  );
}
