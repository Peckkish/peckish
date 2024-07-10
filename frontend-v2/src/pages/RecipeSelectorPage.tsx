import RecipeGallery from "@/components/RecipeSelectorPage/RecipeGallery.tsx";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DietaryPreferences, FullRecipeCollection } from "@/utility/types.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import PreferenceSelectorBar from "@/components/RecipeSelectorPage/PreferenceSelectorBar.tsx";
import AppHeader from "@/components/shared/AppHeader.tsx";
import SelectorActionButtonPair from "@/components/RecipeSelectorPage/SelectorActionButtonPair.tsx";

interface RecipeSelectorPageProps {
  setRecipeCollection: Dispatch<SetStateAction<FullRecipeCollection | null>>;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function RecipeSelectorPage({
  setRecipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
}: RecipeSelectorPageProps) {
  const recipeCollection = useContext(RecipeCollectionContext);

  const [dietaryPreferences, setDietaryPreferences] =
    useState<DietaryPreferences>({
      isHighProtein: false,
      isLowCarb: false,
      isVegetarian: false,
      isHalal: false,
      isGlutenFree: false,
      isKeto: false,
      isDairyFree: false,
      isVegan: false,
    });

  return (
    <div className={"min-h-screen"}>
      <AppHeader />
      <div className={"flex flex-col items-center px-[4vw] relative"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>
          Add recipes to your plan.
        </h1>
        <p className={"mt-2 text-lg text-muted-foreground"}>
          Choose your dietary requirements (if any) and pick your favourite
          recipes for your meal plan!
        </p>
        <div className={"flex flex-row items-center gap-4 w-full z-10"}>
          <PreferenceSelectorBar
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
          />
          <SelectorActionButtonPair
            setRecipeCollection={setRecipeCollection}
            dietaryPreferences={dietaryPreferences}
            selectedRecipeIds={selectedRecipeIds}
          />
        </div>
        {!!recipeCollection ? (
          <RecipeGallery
            selectedRecipeIds={selectedRecipeIds}
            setSelectedRecipeIds={setSelectedRecipeIds}
            recipeCollection={recipeCollection}
          />
        ) : (
          <p className={"mt-10 text-lg text-muted-foreground"}>
            Your recipes will appear here!
          </p>
        )}
      </div>
    </div>
  );
}
