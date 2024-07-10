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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function App() {
  const initialRecipeCollection = !!localStorage.getItem("recipeCollection")
    ? JSON.parse(localStorage.getItem("recipeCollection")!)
    : null;

  // const initialSelectedRecipeIds = !!localStorage.getItem("selectedRecipeIds")
  //   ? JSON.parse(localStorage.getItem("selectedRecipeIds")!)
  //   : [];

  const [recipeCollection, setRecipeCollection] =
    useState<null | FullRecipeCollection>(initialRecipeCollection);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);

  useEffect(() => {
    // getRecipeCollection().then((result) => setRecipeCollection(result));
  }, []);

  const queryClient = new QueryClient();

  const [animationParent] = useAutoAnimate();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RecipeCollectionContext.Provider value={recipeCollection}>
        <Router>
          <div ref={animationParent}>
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
    </QueryClientProvider>
  );
}
