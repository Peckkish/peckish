import RecipeGallery from "@/components/RecipeSelectorPage/RecipeGallery.tsx";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DietaryPreferences,
  Recipe,
  SupermarketPreferences,
} from "@/utility/types.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import PreferenceSelectorBar from "@/components/RecipeSelectorPage/PreferenceSelectorBar.tsx";
import SelectorActionButtonPair from "@/components/RecipeSelectorPage/SelectorActionButtonPair.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface RecipeSelectorPageProps {
  setRecipeCollection: Dispatch<SetStateAction<Recipe[] | null>>;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  setUserMealPlan: Dispatch<SetStateAction<Recipe[]>>;
}

export default function RecipeSelectorPage({
  setRecipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
  setUserMealPlan,
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

  const [supermarketPreferences, setSupermarketPreferences] =
    useState<SupermarketPreferences>({
      wooliesEnabled: true,
      colesEnabled: true,
    });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "selectedRecipeIds",
      JSON.stringify(selectedRecipeIds),
    );
  }, [selectedRecipeIds]);

  const [hasClickedGetRecipes, setHasClickedGetRecipes] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("recipeCollection", JSON.stringify(recipeCollection));
  // }, [recipeCollection]);

  return (
    <div className={"flex flex-col items-center px-[4vw] relative"}>
      <h1 className={"mt-16 text-6xl font-semibold"}>
        Add recipes to your plan.
      </h1>
      <p className={"mt-3 text-lg text-muted-foreground"}>
        Choose any dietaries and your preferred supermarkets, then pick your
        favourite recipes for your meal plan!
      </p>
      <PreferenceSelectorBar
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        supermarketPreferences={supermarketPreferences}
        setSupermarketPreferences={setSupermarketPreferences}
      />
      <SelectorActionButtonPair
        setRecipeCollection={setRecipeCollection}
        dietaryPreferences={dietaryPreferences}
        selectedRecipeIds={selectedRecipeIds}
        setIsLoading={setIsLoading}
        setSelectedRecipeIds={setSelectedRecipeIds}
        setUserMealPlan={setUserMealPlan}
        setHasClickedGetRecipes={setHasClickedGetRecipes}
      />
      {!!recipeCollection ? (
        <RecipeGallery
          selectedRecipeIds={selectedRecipeIds}
          setSelectedRecipeIds={setSelectedRecipeIds}
          recipeCollection={recipeCollection}
          supermarketPreferences={supermarketPreferences}
          isLoading={isLoading}
          hasClickedGetRecipes={hasClickedGetRecipes}
        />
      ) : (
        <>
          <Separator />
          <p className={"mt-10 text-lg text-muted-foreground"}>
            Your recipes will appear here!
          </p>
        </>
      )}
    </div>
  );
}
