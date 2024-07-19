import RecipeGallery from "@/components/RecipeSelectorPage/RecipeGallery.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DietaryPreferences,
  Recipe,
  SupermarketPreferences,
} from "@/utility/types.ts";
import PreferenceSelectorBar from "@/components/RecipeSelectorPage/PreferenceSelectorBar.tsx";
import SelectorActionButtonPair from "@/components/RecipeSelectorPage/SelectorActionButtonPair.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import useScrollToTop from "@/hooks/useScrollToTop.ts";
import useDocumentTitle from "@/hooks/useDocumentTitle.ts";

interface RecipeSelectorPageProps {
  setRecipeCollection: Dispatch<SetStateAction<Recipe[] | null>>;
  recipeCollection: Recipe[] | null;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  setUserMealPlan: Dispatch<SetStateAction<Recipe[]>>;
}

export default function RecipeSelectorPage({
  setRecipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
  setUserMealPlan,
  recipeCollection,
}: RecipeSelectorPageProps) {
  useScrollToTop();
  useDocumentTitle("Recipe Selector | Peckish");
  // const recipeCollection = useContext(RecipeCollectionContext);

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
      isAIP: false,
      isLowCalorie: false,
      isLowFat: false,
      isLowFODMAP: false,
    });

  const [supermarketPreferences, setSupermarketPreferences] =
    useState<SupermarketPreferences>({
      wooliesEnabled: true,
      colesEnabled: true,
    });
  const [isLoading, setIsLoading] = useState(false);
  // const [hasClickedGetRecipes, setHasClickedGetRecipes] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "selectedRecipeIds",
      JSON.stringify(selectedRecipeIds),
    );
  }, [selectedRecipeIds]);

  const handleClearRecipes = () => {
    localStorage.removeItem("recipeCollection");
    // setHasClickedGetRecipes(false);
    setRecipeCollection([]);
  };

  useEffect(() => {
    localStorage.setItem("recipeCollection", JSON.stringify(recipeCollection));
  }, [recipeCollection]);

  return (
    <div
      className={"flex flex-col items-center px-[4vw] relative min-h-[150vh]"}
    >
      {!!recipeCollection && (
        <Button
          variant={"outline"}
          className={"w-fit absolute top-[25px] right-[4vw]"}
          onClick={handleClearRecipes}
        >
          <ArrowCounterClockwise weight={"bold"} className={"mr-2"} />
          <span>Clear Recipes</span>
        </Button>
      )}
      <h1 className={"mt-16 text-6xl font-semibold"}>
        Add recipes to your plan.
      </h1>
      <p className={"mt-3 text-muted-foreground"}>
        Select your dietary preferences and favourite supermarkets, then choose
        your top recipes to craft your ideal meal plan!
      </p>
      <PreferenceSelectorBar
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        supermarketPreferences={supermarketPreferences}
        setSupermarketPreferences={setSupermarketPreferences}
      />
      <p className={"text-green-600 font-semibold text-lg mb-6 text-center"}>
        <p>
          This is a VERY early demo, running on a limited data set - full recipe
          and theme functionality is on the way!
        </p>
        <span>The two supported combos in this demo are </span>
        <span className={"text-black"}>High Protein + Gluten-Free</span>
        <span></span>
        {", and "}
        <span className={"text-black"}>Vegan on its own.</span>
      </p>
      <SelectorActionButtonPair
        setRecipeCollection={setRecipeCollection}
        dietaryPreferences={dietaryPreferences}
        selectedRecipeIds={selectedRecipeIds}
        setIsLoading={setIsLoading}
        setSelectedRecipeIds={setSelectedRecipeIds}
        setUserMealPlan={setUserMealPlan}
        // setHasClickedGetRecipes={setHasClickedGetRecipes}
      />
      {!!recipeCollection ? (
        <RecipeGallery
          selectedRecipeIds={selectedRecipeIds}
          setSelectedRecipeIds={setSelectedRecipeIds}
          recipeCollection={recipeCollection}
          supermarketPreferences={supermarketPreferences}
          isLoading={isLoading}
          // hasClickedGetRecipes={hasClickedGetRecipes}
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
