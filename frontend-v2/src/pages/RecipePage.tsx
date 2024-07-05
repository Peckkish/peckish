import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getRecipeObjectByIdOrNull } from "@/utility/utils.ts";
import { MealPlanContext } from "@/utility/context.ts";
import { Recipe } from "@/utility/types.ts";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { Button } from "@/components/ui/button.tsx";
import { getImage } from "@/api/api.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface RecipePageProps {}

export default function RecipePage({}: RecipePageProps) {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const { id } = useParams<{ id: string }>();
  const mealPlan = useContext(MealPlanContext);

  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    activeRecipe &&
      getImage(activeRecipe.recipeTitle).then((url) => setImageURL(url));
  }, [activeRecipe]);

  useEffect(() => {
    mealPlan && id && setActiveRecipe(getRecipeObjectByIdOrNull(mealPlan, id));
  }, [mealPlan, id]);

  useEffect(() => {
    console.log(activeRecipe);
  }, [activeRecipe]);

  if (!activeRecipe || imageURL === "") {
    return (
      <div
        className={
          "flex justify-center items-center w-screen h-screen bg-emerald-100/50"
        }
      >
        <DotLoader />
      </div>
    );
  }

  return (
    <div className={"w-screen min-h-screen bg-emerald-100/50 p-12"}>
      <Button
        className={"mb-6"}
        onClick={() => (window.location.href = "/app")}
      >
        Back to Dashboard
      </Button>
      <h1 className={"text-5xl font-extrabold"}>{activeRecipe.recipeTitle}</h1>
      <div className={"size-64 aspect-square overflow-hidden rounded-2xl my-8"}>
        {!!imageURL ? (
          <img
            className={"min-h-full min-w-full object-cover"}
            src={imageURL}
            alt="Recipe preview"
          />
        ) : (
          <Skeleton className={"size-64"} />
        )}
      </div>
      <h2 className={"text-2xl font-semibold"}>Ingredients</h2>
      <ul className={"list-disc ml-[1.5ch]"}>
        {activeRecipe.recipeIngredients.map((ingredient, index) => {
          return (
            <li key={index}>{`${ingredient.amount} ${ingredient.product}`}</li>
          );
        })}
      </ul>
      <h2 className={"text-2xl font-semibold mt-4"}>Steps</h2>
      <ol className={"list-decimal ml-[1.5ch]"}>
        {activeRecipe.recipeSteps.map((step, index) => {
          return <li key={index}>{step}</li>;
        })}
      </ol>
    </div>
  );
}
