import { List } from "@phosphor-icons/react";
import RecipeGallery from "@/components/RecipeGallery.tsx";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DietaryPreferences, FullRecipeCollection } from "@/utility/types.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import PreferenceSelectorBar from "@/components/PreferenceSelectorBar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { getRecipeCollection } from "@/api/api.tsx";
import AppHeader from "@/AppHeader.tsx";

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
    });

  return (
    <div>
      <AppHeader />
      <div className={"flex flex-col items-center px-[5vw]"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>Recipe Selector</h1>
        <p className={"my-3 text-xl font-base"}>
          Choose your dietary requirements (if any) and pick your favourite
          recipes for your meal plan!
        </p>
        <div className={"flex flex-row items-center gap-4"}>
          <PreferenceSelectorBar
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
          />
          <Button
            variant={"green"}
            onClick={() => {
              getRecipeCollection(dietaryPreferences).then((result) =>
                setRecipeCollection(result),
              );
            }}
          >
            Get Recipes
          </Button>
        </div>
        <RecipeGallery recipeCollection={recipeCollection} />
      </div>
    </div>
  );
}
