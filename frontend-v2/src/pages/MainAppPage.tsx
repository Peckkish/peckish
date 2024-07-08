import { Robot } from "@phosphor-icons/react";
import RecipeGallery from "@/components/RecipeGallery.tsx";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DietaryPreferences, FullRecipeCollection } from "@/utility/types.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import PreferenceSelectorBar from "@/components/PreferenceSelectorBar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { getRecipeCollection } from "@/api/api.tsx";
import AppHeader from "@/components/AppHeader.tsx";

interface MainAppPageProps {
  setRecipeCollection: Dispatch<SetStateAction<FullRecipeCollection | null>>;
}

export default function MainAppPage({ setRecipeCollection }: MainAppPageProps) {
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
    <div>
      <AppHeader />
      <div className={"flex flex-col items-center px-[4vw]"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>Recipe Selector</h1>
        <p className={"my-3 text-xl font-base"}>
          Choose your dietary requirements (if any) and pick your favourite
          recipes for your meal plan!
        </p>
        <div className={"flex flex-row items-center gap-4 relative w-full"}>
          <PreferenceSelectorBar
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
          />
          <Button
            variant={"green"}
            className={"absolute right-0 px-[2em] py-[1.5em] text-xl font-bold"}
            onClick={() => {
              getRecipeCollection(dietaryPreferences).then((result) =>
                setRecipeCollection(result),
              );
            }}
          >
            <Robot size={32} className={"mr-3"} />
            <span>Get Recipes</span>
          </Button>
        </div>
        <RecipeGallery recipeCollection={recipeCollection} />
      </div>
    </div>
  );
}
