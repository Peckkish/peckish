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
import "../../css/global.css";
import MealPlanDashboardPage from "@/pages/MealPlanDashboardPage.tsx";

export default function App() {
  const [recipeCollection, setRecipeCollection] =
    useState<null | FullRecipeCollection>(null);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);

  useEffect(() => {
    // getRecipeCollection().then((result) => setRecipeCollection(result));
  }, []);

  return (
    <RecipeCollectionContext.Provider value={recipeCollection}>
      <Router>
        <div>
          <Routes>
            <Route
              path="/app"
              element={
                <RecipeSelectorPage
                  setRecipeCollection={setRecipeCollection}
                  selectedRecipeIds={selectedRecipeIds}
                  setSelectedRecipeIds={setSelectedRecipeIds}
                />
              }
            />
            <Route path="/app/recipe/:id" element={<RecipeDetailsPage />} />
            <Route
              path="/app/plans/myMealPlan"
              element={
                <MealPlanDashboardPage
                  selectedRecipeIds={selectedRecipeIds}
                  setSelectedRecipeIds={setSelectedRecipeIds}
                />
              }
            />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </div>
      </Router>
    </RecipeCollectionContext.Provider>
  );
}
