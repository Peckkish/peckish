import { Robot } from "@phosphor-icons/react";
import RecipeGallery from "@/components/RecipeSelectorPage/RecipeGallery.tsx";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DietaryPreferences, FullRecipeCollection } from "@/utility/types.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import PreferenceSelectorBar from "@/components/RecipeSelectorPage/PreferenceSelectorBar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { getRecipeCollection } from "@/api/api.tsx";
import AppHeader from "@/components/shared/AppHeader.tsx";
import { Utensils } from "lucide-react";

interface RecipeSelectorPageProps {
  setRecipeCollection: Dispatch<SetStateAction<FullRecipeCollection | null>>;
}

export default function RecipeSelectorPage({
  setRecipeCollection,
}: RecipeSelectorPageProps) {
  const recipeCollection = useContext(RecipeCollectionContext);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);

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
      <div className={"flex flex-col items-center px-[4vw] relative"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>
          Add recipes to your plan.
        </h1>
        <p className={"mt-3 text-xl font-base"}>
          Choose your dietary requirements (if any) and pick your favourite
          recipes for your meal plan!
        </p>
        <div className={"flex flex-row items-center gap-4 w-full z-10"}>
          <PreferenceSelectorBar
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
          />
          <div
            className={"right-4 bottom-4 flex flex-col fixed items-end gap-4"}
          >
            <Button
              className={"px-[1.5em] py-[1.25em] text-xl font-bold z-10"}
              onClick={() => {
                getRecipeCollection(dietaryPreferences).then((result) =>
                  setRecipeCollection(result),
                );
              }}
            >
              <Robot size={32} className={"mr-3"} />
              <span>Get New Recipes</span>
            </Button>
            <Button
              variant={"green"}
              className={"px-[1.5em] py-[1.25em] text-xl font-bold z-10"}
              disabled={selectedRecipeIds.length < 2}
              onClick={() => {
                window.location.href = "/app/plans/myMealPlan";
              }}
            >
              <Utensils size={32} className={"mr-3"} />
              <span>
                {selectedRecipeIds.length < 2
                  ? "Select at Least Two Recipes"
                  : "Create Meal Plan"}
              </span>
            </Button>
          </div>
        </div>
        <RecipeGallery
          selectedRecipeIds={selectedRecipeIds}
          setSelectedRecipeIds={setSelectedRecipeIds}
          recipeCollection={recipeCollection}
        />
      </div>
    </div>
  );
}
