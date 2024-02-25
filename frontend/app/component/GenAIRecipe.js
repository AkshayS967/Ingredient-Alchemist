import { useEffect, useState } from "react";
import { useRecipeAPI } from "../RecipeAPI";
import { Skeleton } from "@nextui-org/react";

export default function GenAIRecipe() {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);
  const { getRecipes } = useRecipeAPI();
  useEffect(() => {
    getRecipes().then((res) => {
      if (res.data.success == false) setRecipe("");
      else setRecipe(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
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
      {!loading && (
        <div>
          <div>{recipe}</div>
        </div>
      )}
    </div>
  );
}
