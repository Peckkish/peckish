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
  updateMultiplierMapState,
} from "@/utility/utils.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import RecipePreviewTile from "@/components/RecipePage/RecipePreviewTile.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import {
  DayOfWeek,
  IngredientItem,
  PortionSize,
  Recipe,
  ServingsInfo,
} from "@/utility/types.ts";
import { Trash } from "lucide-react";
import MealPlanParametersForm from "@/components/MealPlanDashboardPage/MealPlanParametersForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface MealPlanDashboardPageProps {
  userMealPlan: Recipe[];
  setUserMealPlan: Dispatch<SetStateAction<Recipe[]>>;
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function MealPlanDashboardPage({
  userMealPlan,
  setUserMealPlan,
  setSelectedRecipeIds,
}: MealPlanDashboardPageProps) {
  const [mealPlanName, setMealPlanName] = useState("My First Meal Plan");
  const [totalShoppingList, setTotalShoppingList] = useState<IngredientItem[]>(
    [],
  );
  const [recipeIdToMultiplierMap, setRecipeIdToMultiplierMap] = useState<
    Map<string, number>
  >(new Map([]));
  const [recipeIdToServingsInfoMap, setRecipeIdToServingsInfoMap] = useState<
    Map<string, ServingsInfo>
  >(new Map([]));

  const navigate = useNavigate();

  useEffect(() => {
    userMealPlan &&
      setTotalShoppingList(
        getTotalShoppingList(userMealPlan, recipeIdToMultiplierMap),
      );
  }, [recipeIdToMultiplierMap]);

  useEffect(() => {
    // console.log(recipeIdToServingsInfoMap);
  }, [recipeIdToServingsInfoMap]);

  return (
    <div className={"relative pb-12"}>
      <Button
        className={"w-fit absolute top-4 left-5"}
        onClick={() => navigate("/app")}
      >
        <CaretLeft weight={"bold"} className={"mr-2"} />
        <span>Go Back</span>
      </Button>
      <Button
        className={"w-fit absolute top-4 right-5"}
        variant={"destructive"}
        onClick={() => {
          localStorage.removeItem("userMealPlan");
          setUserMealPlan([]);
          navigate("/app");
        }}
      >
        <Trash className={"mr-2"} />
        <span>Delete Meal Plan</span>
      </Button>
      <div className={"flex flex-col items-center"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>Meal Plan Dashboard</h1>
        <p className={"mt-2 mb-4 text-lg text-muted-foreground"}>
          Seamlessly view and edit your shopping list, recipes, and meal plan.
        </p>
        <div
          className={
            "flex flex-row items-center bg-zinc-200/80 rounded-3xl px-3 py-1.5"
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
      <div className={"grid grid-cols-[1fr_5fr] gap-20 mt-10 xl:px-28 px-20"}>
        <div className={"flex flex-col"}>
          <h1 className={"font-bold text-2xl"}>Shopping List</h1>
          <Separator className={"my-3"} />
          <ul className={"list-disc mt-4 font-light flex flex-col gap-3"}>
            {totalShoppingList.map((ingredient, index) => {
              return (
                <li key={index}>
                  <span>
                    {`${decimalToMixedFractionString(roundToNearestQuarter(ingredient.qtyNumber))} ${ingredient.qtyUnit}`}{" "}
                  </span>
                  <a
                    href="https://woolworths.com.au"
                    className={
                      "underline underline-offset-2 text-green-500 font-medium"
                    }
                  >
                    {ingredient.product}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={"flex flex-col"}>
          <div className={"mb-8"}>
            <h1 className={"font-bold text-2xl"}>Recipes</h1>
            <Separator className={"my-3"} />
            <div className={"flex flex-row items-center gap-3 mt-4"}>
              {userMealPlan &&
                userMealPlan.map((recipe) => {
                  return (
                    <div
                      className={"flex flex-col items-start gap-3"}
                      key={recipe.recipeId}
                    >
                      <RecipePreviewTile
                        recipe={recipe}
                        setSelectedRecipeIds={setSelectedRecipeIds}
                        className={"w-64"}
                        hidePlanAddButton
                        showRemoveFromPlanButton
                        setUserMealPlan={setUserMealPlan}
                      />
                      <Separator className={"w-[65%] mx-auto my-2"} />
                      <MealPlanParametersForm
                        recipe={recipe}
                        setRecipeIdToMultiplierMap={setRecipeIdToMultiplierMap}
                        setRecipeIdToServingsInfoMap={
                          setRecipeIdToServingsInfoMap
                        }
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <InteractiveMealPlan
            userMealPlan={userMealPlan}
            recipeIdToServingsInfoMap={recipeIdToServingsInfoMap}
          />
        </div>
      </div>
    </div>
  );
}
