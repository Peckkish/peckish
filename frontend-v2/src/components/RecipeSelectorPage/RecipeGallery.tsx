import { FullRecipeCollection } from "@/utility/types.ts";
import RecipeSubsection from "@/components/RecipePage/RecipeSubsection.tsx";
import { DotLoader } from "react-spinners";
import { CloudMoon, Sun, SunHorizon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

interface RecipeGalleryProps {
  recipeCollection: null | FullRecipeCollection;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}
export default function RecipeGallery({
  recipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
}: RecipeGalleryProps) {
  if (!recipeCollection) {
    return (
      <div className={"flex justify-center items-center w-full h-screen"}>
        <DotLoader />
      </div>
    );
  }

  return (
    <div className={"xl:w-[92vw] w-[95vw] min-h-screen z-0"}>
      {!!recipeCollection.breakfastRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<SunHorizon size={36} />}
          recipes={recipeCollection.breakfastRecipes}
          label={"Breakfast"}
        />
      )}
      {!!recipeCollection.lunchRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<Sun size={36} />}
          recipes={recipeCollection.lunchRecipes}
          label={"Lunch"}
        />
      )}
      {!!recipeCollection.dinnerRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<CloudMoon size={36} />}
          recipes={recipeCollection.dinnerRecipes}
          label={"Dinner"}
        />
      )}
    </div>
  );
}
