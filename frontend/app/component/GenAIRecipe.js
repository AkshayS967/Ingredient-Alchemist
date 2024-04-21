import { useEffect, useState, memo } from "react";
import { useRecipeAPI } from "../RecipeAPI";
import { Skeleton } from "@nextui-org/react";

function GenAIRecipe() {
  const [loading, setLoading] = useState(true);
  const { genAIRecipe, getRecipes } = useRecipeAPI();
  useEffect(() => {
    getRecipes().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full mt-20">
      {loading && (
        <div>
          {/* Title */}
          <Skeleton className="w-3/5 rounded-lg mb-4">
            <div className="h-10 rounded-lg"></div>
          </Skeleton>
          {/* Ingredients */}
          <div className="space-y-3 mt-10">
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-4 rounded-lg"></div>
            </Skeleton>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-2/5 rounded-lg">
                <div className="h-3 rounded-lg"></div>
              </Skeleton>
            ))}
          </div>
          {/* Instructions */}
          <div className="space-y-3 mt-8">
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-4 rounded-lg"></div>
            </Skeleton>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5/5 rounded-lg">
                <div className="h-3 rounded-lg"></div>
              </Skeleton>
            ))}
          </div>
        </div>
      )}
      { !loading && genAIRecipe && 
        <div>
        {/* Title */}
        <h1 className="text-2xl font-bold">{genAIRecipe.title}</h1>
        {/* Ingredients */}
        <div className="mt-10">
          <h2 className="text-lg font-bold">Ingredients</h2>
          <ul>
            {genAIRecipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        {/* Instructions */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">Instructions</h2>
          <p>{genAIRecipe.instructions}</p>
        </div>
      </div> }
      { !loading && !genAIRecipe &&
          <div>Failed to generate recipe</div>
        }
    </div>
  );
}

export default memo(GenAIRecipe);
