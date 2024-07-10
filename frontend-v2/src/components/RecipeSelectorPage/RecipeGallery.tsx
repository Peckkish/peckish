import { Recipe } from "@/utility/types.ts";
import RecipeSubsection from "@/components/RecipeSelectorPage/RecipeSubsection.tsx";
import { DotLoader } from "react-spinners";
import { CloudMoon, Sun, SunHorizon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RecipeGalleryProps {
  recipeCollection: Recipe[];
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
}
export default function RecipeGallery({
  recipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
  isLoading,
}: RecipeGalleryProps) {
  const [isFabLoading, setIsFabLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsFabLoading(false), 350);
  }, []);

  if (!recipeCollection || isLoading || isFabLoading) {
    return (
      <div className={"flex justify-center items-center w-full"}>
        <DotLoader />
      </div>
    );
  }

  const breakfastRecipes = recipeCollection.filter(
    (recipe) => recipe.BLD === "Breakfast",
  );
  const lunchRecipes = recipeCollection.filter(
    (recipe) => recipe.BLD === "Lunch",
  );
  const dinnerRecipes = recipeCollection.filter(
    (recipe) => recipe.BLD === "Dinner",
  );

  return (
    <div className={"xl:w-[92vw] w-[95vw] min-h-screen z-0"}>
      {breakfastRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<SunHorizon size={36} />}
          recipes={breakfastRecipes}
          label={"Breakfast"}
        />
      )}
      {lunchRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<Sun size={36} />}
          recipes={lunchRecipes}
          label={"Lunch"}
        />
      )}
      {dinnerRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<CloudMoon size={36} />}
          recipes={dinnerRecipes}
          label={"Dinner"}
        />
      )}
    </div>
  );
}
