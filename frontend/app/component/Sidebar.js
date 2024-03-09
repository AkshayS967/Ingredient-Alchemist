import { Accordion, AccordionItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import { memo } from "react";
import Checkbox from "./Checkbox.js";

function Sidebar({toggleIngredient}) {
  const ingredients = { 
    Fruits: [ "Apple", "Banana", "Orange", "Grapes", "Strawberry", "Mango", "Pineapple", "Kiwi", "Blueberry", "Lemon", "Lime", "Raspberry", "Watermelon", "Cherry", "Pear", "Apricot", "Peach", "Plum", "Cranberry", "Coconut", "Avocado", "Blackberry", "Pomegranate", "Papaya", "Fig", "Guava", "Passion Fruit", "Lychee", "Dragon Fruit", ],
    Vegetables: [ "Carrot", "Broccoli", "Cucumber", "Spinach", "Tomato", "Bell Pepper", "Lettuce", "Zucchini", "Eggplant", "Cauliflower", "Green Beans", "Peas", "Radish", "Onion", "Garlic", "Sweet Potato", "Asparagus", "Mushroom", "Celery", "Cabbage", "Kale", "Pumpkin", "Brussels Sprouts", "Artichoke", "Beet", "Turnip", "Leek", "Okra", "Rutabaga", ],
    Grains: [ "Wheat", "Rice", "Barley", "Quinoa", "Oats", "Corn", "Rye", "Bulgur", "Millet", "Buckwheat", "Amaranth", "Farro", "Sorghum", ],
    Proteins: [ "Chicken", "Beef", "Pork", "Salmon", "Tuna", "Cod", "Shrimp", "Tofu", "Tempeh", "Lentils", "Black beans", "Kidney beans", "Chickpeas", "Eggs", "Turkey", "Quorn", "Duck", "Lamb", "Venison", ],
    Dairy: [ "Milk", "Cheddar", "Mozzarella", "Parmesan", "Yogurt", "Butter", "Cream", "Cottage Cheese", "Sour Cream", "Cream Cheese", "Ricotta", "Feta", "Goat Cheese", "Mascarpone", ],
    "Herbs and Spices": [ "Basil", "Parsley", "Cilantro", "Thyme", "Rosemary", "Oregano", "Mint", "Dill", "Sage", "Bay Leaves", "Chili Powder", "Paprika", "Cumin", "Turmeric", "Ginger", "Nutmeg", "Cloves", "Cardamom", "Allspice", "Coriander", ],
    Condiments: [ "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "BBQ Sauce", "Worcestershire Sauce", "Hot Sauce", "Honey", "Maple Syrup", "Balsamic Vinegar", "Apple Cider Vinegar", "Red Wine Vinegar", "White Wine Vinegar", "Salsa", "Pesto", "Tahini", "Fish Sauce", "Teriyaki Sauce", "Hoisin Sauce", ],
  }
  const category = Object.keys(ingredients);
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <ScrollShadow className="h-[45rem] overflow-scroll p-1 rounded-2xl">
      <Accordion
        showDivider={false}
        defaultExpandedKeys={category.map((_, index) => index.toString())}
        className="p-2 flex flex-col gap-1 w-full"
        variant="shadow"
        itemClasses={itemClasses}
      >
        {category.map((name, index) => (
          <AccordionItem
            key={index}
            startContent={
              <Image src={`/${name}.png`} width={30} height={30} alt={name} />
            }
            title={name}
            keepContentMounted
          >
            <div className="flex flex-wrap">
              {ingredients[name].map((ingredient, index) => (
                <Checkbox
                  key={index}
                  className="m-1 cursor-pointer"
                  onClick={toggleIngredient}
                >
                  {ingredient}
                </Checkbox>
              ))}  
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollShadow>
  );
}

export default memo(Sidebar);
