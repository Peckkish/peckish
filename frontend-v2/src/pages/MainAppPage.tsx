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
      <div
        className={"w-full shadow-md h-[65px] flex flex-row items-center px-8"}
      >
        <List size={20} />
      </div>
      <div className={"flex flex-col items-center px-[5vw]"}>
        <div className={"flex flex-row items-center gap-4"}>
          <PreferenceSelectorBar
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
          />
          <Button onClick={() => getRecipeCollection(dietaryPreferences)}>
            Get Recipes
          </Button>
        </div>
        <RecipeGallery recipeCollection={recipeCollection} />
      </div>
    </div>
  );
}
