"use client";
import Checkbox from "./component/Checkbox.js";
import Box from './component/Box.js'
import {Card, Skeleton} from "@nextui-org/react";

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



  let selectedfruit = []
  function togglefruit(event) {
    let fruit = event.target.textContent;
    const index = selectedfruit.indexOf(fruit);
    index === -1 ? selectedfruit.push(fruit) : selectedfruit.splice(index, 1);
    console.log(selectedfruit);
  }
  return (
    <main className="min-h-screen max-w-6xl p-5 m-auto">
      <div className="flex gap-5">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold m-5">Ingredients</h2>
          <Box category={["Fruits","Vegetables"]}>
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
          </Box>
        </div>
        <div className="w-2/3">
          <h2 className="text-2xl font-bold m-5 text-center">Recipes</h2>
          <div className="w-full h-full bg-white shadow-xl border border-slate-200 rounded-lg flex flex-wrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-fit h-fit flex-1 m-auto">
                <Card className="w-[200px] space-y-5 p-4 m-auto" radius="2xl">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">  
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
