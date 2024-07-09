import { useEffect, useState } from "react";
import RecipeSelectorPage from "@/pages/RecipeSelectorPage.tsx";
import { RecipeCollectionContext } from "@/utility/context.ts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecipeDetailsPage from "@/pages/RecipeDetailsPage.tsx";
import { FullRecipeCollection } from "@/utility/types.ts";
import { getRecipeCollection } from "@/api/api.tsx";
import "../../css/global.css";
import MealPlanDashboardPage from "@/pages/MealPlanDashboardPage.tsx";

export default function App() {
  const [recipeCollection, setRecipeCollection] =
    useState<null | FullRecipeCollection>(null);

  useEffect(() => {
    getRecipeCollection().then((result) => setRecipeCollection(result));
  }, []);

  return (
    <RecipeCollectionContext.Provider value={recipeCollection}>
      <Router>
        <div>
          <Routes>
            <Route
              path="/app"
              element={
                <RecipeSelectorPage setRecipeCollection={setRecipeCollection} />
              }
            />
            <Route path="/app/recipe/:id" element={<RecipeDetailsPage />} />
            <Route
              path="/app/plans/myMealPlan"
              element={<MealPlanDashboardPage />}
            />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </div>
      </Router>
    </RecipeCollectionContext.Provider>
  );
}
