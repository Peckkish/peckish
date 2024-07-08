import { createContext, useEffect, useState } from "react";
import { cn, dummyMealPlan } from "@/utility/utils.ts";
import MainAppPage from "@/pages/MainAppPage.tsx";
import { RecipeCollectionContext } from "@/utility/context.ts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecipePage from "@/pages/RecipePage.tsx";
import { FullRecipeCollection } from "@/utility/types.ts";
import { getRecipeCollection } from "@/api/api.tsx";
import "../../css/global.css";

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
                <MainAppPage setRecipeCollection={setRecipeCollection} />
              }
            />
            <Route path="/app/recipe/:id" element={<RecipePage />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </div>
      </Router>
    </RecipeCollectionContext.Provider>
  );
}
