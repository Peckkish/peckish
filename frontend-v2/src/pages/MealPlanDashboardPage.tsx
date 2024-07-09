import AppHeader from "@/components/shared/AppHeader.tsx";
import { useState } from "react";
import UpdateMealPlanNameForm from "@/components/MealPlanDashboardPage/UpdateMealPlanNameForm.tsx";
import InteractiveMealPlan from "@/components/MealPlanDashboardPage/InteractiveMealPlan.tsx";

interface MealPlanDashboardPageProps {}

export default function MealPlanDashboardPage({}: MealPlanDashboardPageProps) {
  const [mealPlanName, setMealPlanName] = useState("My First Meal Plan");

  return (
    <div className={"min-h-screen"}>
      <AppHeader />
      <div className={"text-center"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>Meal Plan Dashboard</h1>
        <p className={"mt-3 text-xl font-base"}>
          Seamlessly view and edit your shopping list, recipes, and meal plan.
        </p>
      </div>
      <div className={"flex flex-row justify-center gap-20"}>
        <div className={"flex flex-col"}>
          <div>
            <span className={"font-semibold text-xl ml-1 mr-auto"}>
              {mealPlanName}
            </span>
            <UpdateMealPlanNameForm
              mealPlanName={mealPlanName}
              setMealPlanName={setMealPlanName}
            />
          </div>
          <h1 className={"font-bold text-2xl"}>Ingredients</h1>
          <ul className={"list-disc mt-4 font-light"}>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </div>
        <div className={"flex flex-col"}>
          <div className={"mb-8w to g"}>
            <h1 className={"font-bold text-2xl"}>Recipes</h1>
            <div className={"bg-emerald-200 size-56 rounded-2xl"}></div>
            <p className={"font-bold"}>Lorem ipsum dolor sit.</p>
            <p className={"text-xs text-zinc-800"}>
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
          <InteractiveMealPlan />
        </div>
      </div>
    </div>
  );
}
