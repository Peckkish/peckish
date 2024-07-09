import AppHeader from "@/components/shared/AppHeader.tsx";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import UpdateMealPlanNameForm from "@/components/MealPlanDashboardPage/UpdateMealPlanNameForm.tsx";
import InteractiveMealPlan from "@/components/MealPlanDashboardPage/InteractiveMealPlan.tsx";
import {
  decimalToMixedFractionString,
  getRecipeObjectByIdOrNull,
  getTotalShoppingList,
  roundToNearestQuarter,
} from "@/utility/utils.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import RecipePreviewTile from "@/components/RecipePage/RecipePreviewTile.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { FullRecipeCollection, IngredientItem } from "@/utility/types.ts";

interface MealPlanDashboardPageProps {
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function MealPlanDashboardPage({
  selectedRecipeIds,
  setSelectedRecipeIds,
}: MealPlanDashboardPageProps) {
  const [mealPlanName, setMealPlanName] = useState("My First Meal Plan");
  const [totalShoppingList, setTotalShoppingList] = useState<IngredientItem[]>(
    [],
  );
  const recipeCollection = useContext(RecipeCollectionContext);

  const navigate = useNavigate();

  useEffect(() => {
    recipeCollection &&
      setTotalShoppingList(
        getTotalShoppingList(recipeCollection, selectedRecipeIds),
      );
  }, [recipeCollection]);

  const multiplierOnOriginalQty = 1;

  return (
    <div className={"min-h-screen flex flex-col justify-start pb-12"}>
      <AppHeader />
      <div className={"relative"}>
        <Button
          className={"w-fit absolute top-4 left-5"}
          onClick={() => navigate("/app")}
        >
          <CaretLeft weight={"bold"} className={"mr-2"} />
          <span>Go Back</span>
        </Button>
        <div className={"flex flex-col items-center"}>
          <h1 className={"mt-16 text-6xl font-semibold"}>
            Meal Plan Dashboard
          </h1>
          <p className={"mt-2 mb-4 text-lg text-muted-foreground"}>
            Seamlessly view and edit your shopping list, recipes, and meal plan.
          </p>
          <div
            className={
              "flex flex-row items-center bg-accent rounded-3xl px-3 py-1.5"
            }
          >
            <span className={"font-medium text-xl ml-1 mr-1.5"}>
              {mealPlanName}
            </span>
            <UpdateMealPlanNameForm
              mealPlanName={mealPlanName}
              setMealPlanName={setMealPlanName}
            />
          </div>
        </div>

        {/* MAIN PAGE CONTENT - ROW */}
        <div className={"flex flex-row justify-center gap-20 mt-10"}>
          <div className={"flex flex-col"}>
            <h1 className={"font-bold text-2xl"}>Shopping List</h1>
            <ul className={"list-disc mt-4 font-light flex flex-col gap-3"}>
              {totalShoppingList.map((ingredient, index) => {
                return (
                  <li
                    key={index}
                  >{`${decimalToMixedFractionString(roundToNearestQuarter(ingredient.qtyNumber * multiplierOnOriginalQty))} ${ingredient.qtyUnit} ${ingredient.product}`}</li>
                );
              })}
            </ul>
          </div>
          <div className={"flex flex-col"}>
            <div className={"mb-8"}>
              <h1 className={"font-bold text-2xl"}>Recipes</h1>
              {/*<div className={"bg-emerald-200 size-56 rounded-2xl"}></div>*/}
              {/*<p className={"font-bold"}>Lorem ipsum dolor sit.</p>*/}
              {/*<p className={"text-xs text-zinc-800"}>*/}
              {/*  Lorem ipsum dolor sit amet, consectetur*/}
              {/*</p>*/}
              <div className={"flex flex-row items-center gap-3 mt-4"}>
                {recipeCollection &&
                  selectedRecipeIds.map((selectedRecipeId) => {
                    const selectedRecipe = getRecipeObjectByIdOrNull(
                      recipeCollection,
                      selectedRecipeId,
                    );
                    return (
                      <div key={selectedRecipeId}>
                        <RecipePreviewTile
                          recipe={selectedRecipe!}
                          setSelectedRecipeIds={setSelectedRecipeIds}
                          className={"w-64"}
                          hidePlanAddButton
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <InteractiveMealPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
