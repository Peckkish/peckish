import { FullRecipeCollection } from "@/utility/types.ts";
import RecipeSubsection from "@/components/RecipeSubsection.tsx";
import { DotLoader } from "react-spinners";
import { CloudMoon, Sun, SunHorizon } from "@phosphor-icons/react";

interface RecipeGalleryProps {
  recipeCollection: null | FullRecipeCollection;
}
export default function RecipeGallery({
  recipeCollection,
}: RecipeGalleryProps) {
  if (!recipeCollection) {
    return (
      <div className={"flex justify-center items-center w-full h-screen"}>
        <DotLoader />
      </div>
    );
  }

  return (
    <div className={"xl:w-[92vw] w-[95vw] min-h-screen"}>
      {!!recipeCollection.breakfastRecipes && (
        <RecipeSubsection
          headerIcon={<SunHorizon size={36} />}
          recipes={recipeCollection.breakfastRecipes}
          label={"Breakfast"}
        />
      )}
      {!!recipeCollection.lunchRecipes && (
        <RecipeSubsection
          headerIcon={<Sun size={36} />}
          recipes={recipeCollection.lunchRecipes}
          label={"Lunch"}
        />
      )}
      {!!recipeCollection.dinnerRecipes && (
        <RecipeSubsection
          headerIcon={<CloudMoon size={36} />}
          recipes={recipeCollection.dinnerRecipes}
          label={"Dinner"}
        />
      )}
    </div>
  );
}
