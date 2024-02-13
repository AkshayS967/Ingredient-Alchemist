
import Image from "next/image";

export default async function Recipe({ params }) {
  const recipe = await getRecipe(params.recipe);

  return (
    <div className="h-[calc(100vh-5rem)] overflow-scroll max-w-[50rem] m-auto shadow-lg p-8">
      <h1 className="text-3xl font-bold pb-5">{recipe.title}</h1>
      { recipe.img_url &&
        <Image
        src={recipe.img_url}
        alt={recipe.title}
        width={0}
        height={0}
        sizes="100vw"
        className="w-auto h-[300px] rounded-lg"
      />}
      <p className="text-md my-5">{recipe.description}</p>
      <h2 className="text-2xl my-3">Ingredients</h2>
      <ul className="text-md my-3">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl my-3">Instructions</h2>
      <p className="text-md">{recipe.instructions}</p>
      <h2 className="text-2xl my-3">Nutrition</h2>
      <p className="text-md">Calories: {recipe.calories}KCal</p>
      <p className="text-md">Carbohydrates: {recipe.carbohydrate}g</p>
      <p className="text-md">Protein: {recipe.protein}g</p>
      <p className="text-md">Fat: {recipe.fat}g</p>
      <p className="text-md">Cholesterol: {recipe.cholesterol}mg</p>
      <p className="text-md">Sodium: {recipe.sodium}mg</p>
      <p className="text-md">Sugar: {recipe.sugar}g</p>
    </div>
  );
}

async function getRecipe(recipeURIcomponent) {
  const recipeString = decodeURIComponent(recipeURIcomponent);
  const res = await fetch(`http://127.0.0.1:5000/api/recipe`, {
    method: "POST",
    body: JSON.stringify({ name: recipeString }),
    cache: "no-store",
    revalidate: 0,
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}