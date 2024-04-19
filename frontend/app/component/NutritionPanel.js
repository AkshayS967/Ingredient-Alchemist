import { Slider, Button } from "@nextui-org/react";
import { useRecipeAPI } from "../RecipeAPI";
import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NutritionPanel({ isOpen }) {
  const {
    updateNutritionFilter,
    applyNutritionFilter,
    clearNutritionFilter,
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
    const [calories, setCalories] = useState([0, 3000]);
    const [carbs, setCarbs] = useState([0, 500]);
    const [protein, setProtein] = useState([0, 250]);
    const [fat, setFat] = useState([0, 250]);
    const [cholesterol, setCholesterol] = useState([0, 750]);
    const [sodium, setSodium] = useState([0, 1000]);
    const [sugar, setSugar] = useState([0, 750]);

    useEffect(() => {
      updateNutritionFilter({calories, carbs, protein, fat, cholesterol, sodium, sugar});
    }, [calories, carbs, protein, fat, cholesterol, sodium, sugar])

    function resetSliders() {
      setCalories([0, 3000]);
      setCarbs([0, 500]);
      setProtein([0, 250]);
      setFat([0, 250]);
      setCholesterol([0, 750]);
      setSodium([0, 1000]);
      setSugar([0, 750]);
    }

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
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
                  <div className="mt-5 flex gap-4">
                    <Button
                      color="primary"
                      className="font-bold w-full mx-auto"
                      onClick={applyNutritionFilter}
                    >
                      Apply
                    </Button>
                    <Button
                      color="secondary"
                      className="font-bold w-full mx-auto"
                      onClick={() => {
                        clearNutritionFilter()
                        resetSliders()
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(NutritionPanel);
