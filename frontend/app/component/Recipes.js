import { Card, Skeleton, ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecipeAPI } from "../RecipeAPI";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getRecipes, selectedIngredientsArray, method } = useRecipeAPI();

  useEffect(() => {
    setLoading(true);
    getRecipes().then((res) => {
      if (res.data.success == false) setRecipes([]);
      else setRecipes(res.data);
      setLoading(false);
    });
  }, [method, selectedIngredientsArray]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Recipes</h2>
      <ScrollShadow className="bg-white h-[47.5rem] overflow-scroll grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
        {/* When the page is loading, display a skeleton loader */}
        {loading &&
          [...Array(9)].map((_, i) => (
            <div key={i} className="">
              <Card className="p-3 aspect-[5/7] border-4" radius="2xl">
                <Skeleton className="rounded-lg mb-3">
                  <div className="h-36 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
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
        {/* When recipes are found, display them */}
        {!loading &&
          recipes.length != 0 &&
          recipes.map((recipe) => (
            <div key={recipe.title} className="">
              <Link href={`/recipe/${recipe.title}`}>
                <Card
                  className="p-3 aspect-[3/4] cursor-pointer border-4 hover:border-gray-300 hover:scale-[101%]"
                  radius="2xl"
                >
                  {recipe.img_url && (
                    <img
                      src={recipe.img_url}
                      alt={recipe.title}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        height: "8rem",
                      }}
                      className="rounded-lg mb-3 w-full h-36 object-cover"
                    />
                  )}
                  {!recipe.img_url && (
                    <Skeleton className="rounded-lg mb-3">
                      <div className="h-36 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  )}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm line-clamp-3">{recipe.description}</p>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        {/* When no recipes are found, display a message to the user */}
        {!loading && recipes.length == 0 && (
            <h1 className="fixed top-[50%] text-center font-extrabold text-2xl text-gray-400 w-6/12">
              Server Unreachable / No Recipes Found
            </h1>
        )}
      </ScrollShadow>
    </>
  );
}
