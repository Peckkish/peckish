import { DayOfWeek, WeeklyMealPlanDay } from "@/utility/types.ts";
import RecipePreviewTile from "@/components/subcomponents/RecipePreviewTile.tsx";

interface OneFullDayMealPlanProps {
  mealPlan: null | WeeklyMealPlanDay[];
  activeDayOfWeek: DayOfWeek;
}
export default function OneFullDayMealPlan({
  mealPlan,
  activeDayOfWeek,
}: OneFullDayMealPlanProps) {
  return (
    <div className={"w-full min-h-screen px-4 py-12 bg-orange-300"}>
      {!!mealPlan &&
        mealPlan
          .filter((mealPlanDay) => mealPlanDay.day === activeDayOfWeek)
          .map((mealPlanDay) => (
            <div
              className={"flex flex-col justify-start items-start gap-8"}
              key={mealPlanDay.day}
            >
              {mealPlanDay.allRecipes.map((mealRecipeCollection) => (
                <div key={mealRecipeCollection.mealOfDay}>
                  <p className={"text-4xl font-bold mb-4"}>
                    {mealRecipeCollection.mealOfDay}
                  </p>
                  <div className={"flex flex-row gap-4"}>
                    {mealRecipeCollection.recipeOptions.map(
                      (recipe, recipeIndex) => (
                        <div key={recipeIndex}>
                          <RecipePreviewTile recipe={recipe} />

                          {/*<ol>*/}
                          {/*  {recipe.recipeSteps.map((recipeStep, stepIndex) => (*/}
                          {/*    <li key={stepIndex}>{recipeStep}</li>*/}
                          {/*  ))}*/}
                          {/*</ol>*/}
                          {/*<ol>*/}
                          {/*  {recipe.recipeIngredients.map(*/}
                          {/*    (ingredientItem, ingredientIndex) => (*/}
                          {/*      <li*/}
                          {/*        key={ingredientIndex}*/}
                          {/*      >{`${ingredientItem.product} ${ingredientItem.amount}`}</li>*/}
                          {/*    ),*/}
                          {/*  )}*/}
                          {/*</ol>*/}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
}
