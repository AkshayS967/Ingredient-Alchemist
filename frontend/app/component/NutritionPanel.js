import { Slider, Button } from "@nextui-org/react";
import { useRecipeAPI } from "../RecipeAPI";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NutritionPanel({ isOpen }) {
  const {
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
    getRecipes,
    setLoading,
  } = useRecipeAPI();
    const sliderColor = "foreground";
    const sliderSize = "md";
    const sliderStyle = {
        value: "text-gray-500 font-bold",
        label: "text-gray-700 font-bold",
        track: "bg-gray-200",
        thumb: "bg-gray-200",
        filler: "bg-red-300",
    };

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 0, opacity: 0, height: 0 }}
            animate={{ x: 0, opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, transition: { duration: 0.2 }, height: 0}}
          >
            <div className="m-1 bg-gray-100 p-1 rounded-2xl">
                <div className="bg-white rounded-xl p-6 border-gray-300 border-1 flex flex-col gap-3 -z-10">
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Calories (kcal)"
                    minValue={0}
                    maxValue={3000}
                    value={calories}
                    onChange={setCalories}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Carbohydrates (g)"
                    minValue={0}
                    maxValue={500}
                    value={carbs}
                    onChange={setCarbs}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Protein (g)"
                    minValue={0}
                    maxValue={250}
                    value={protein}
                    onChange={setProtein}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Fat (g)"
                    minValue={0}
                    maxValue={250}
                    value={fat}
                    onChange={setFat}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Cholesterol (mg)"
                    minValue={0}
                    maxValue={750}
                    value={cholesterol}
                    onChange={setCholesterol}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Sodium (mg)"
                    minValue={0}
                    maxValue={1000}
                    value={sodium}
                    onChange={setSodium}
                    classNames={sliderStyle}
                />
                <Slider
                    color={sliderColor}
                    size={sliderSize}
                    label="Sugar (g)"
                    minValue={0}
                    maxValue={750}
                    value={sugar}
                    onChange={setSugar}
                    classNames={sliderStyle}
                />
                <Button
                  color="primary"
                  variant="flat"
                  className="mt-5 font-bold bg-red-100 text-red-400 w-full mx-auto"
                  onClick={() => {
                    setLoading(true)
                    getRecipes(true).then(
                        () => setLoading(false)
                    )
                }}
                >
                  Apply
                </Button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(NutritionPanel);
