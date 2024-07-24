import { useEffect, useState } from 'react'
import RecipeSelectorPage from '@/pages/RecipeSelectorPage.tsx'
import { RecipeCollectionContext } from '@/utility/context.ts'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import RecipeDetailsPage from '@/pages/RecipeDetailsPage.tsx'
import { Recipe } from '@/utility/types.ts'
import '../css/global.css'
import MealPlanDashboardPage from '@/pages/MealPlanDashboardPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Layout from '@/root/Layout.tsx'
import { getRecipeCollection } from '@/api/api.ts'

export default function App() {
  // const initialRecipeCollection = !!localStorage.getItem('recipeCollection')
  //   ? JSON.parse(localStorage.getItem('recipeCollection')!)
  //   : null

  const initialUserMealPlan = !!localStorage.getItem('userMealPlan')
    ? JSON.parse(localStorage.getItem('userMealPlan')!)
    : []

  // const initialSelectedRecipeIds = !!localStorage.getItem("selectedRecipeIds")
  //   ? JSON.parse(localStorage.getItem("selectedRecipeIds")!)
  //   : [];

  const [recipeCollection, setRecipeCollection] = useState<null | Recipe[]>([])
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([])
  const [userMealPlan, setUserMealPlan] =
    useState<Recipe[]>(initialUserMealPlan)

  useEffect(() => {
    getRecipeCollection().then(result => setRecipeCollection(result))
  }, [])

  const queryClient = new QueryClient()

  const [animationParent] = useAutoAnimate()

  useEffect(() => {
    localStorage.setItem('userMealPlan', JSON.stringify(userMealPlan))
  }, [userMealPlan])

  return (
    <QueryClientProvider client={queryClient}>
      {/*<ReactQueryDevtools initialIsOpen={true} />*/}
      <RecipeCollectionContext.Provider value={recipeCollection}>
        <Router>
          <div ref={animationParent}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/app/recipe-selector" replace />}
              />
              <Route path="/app" element={<Layout />}>
                <Route
                  index
                  element={<Navigate to="recipe-selector" replace />}
                />
                <Route
                  path="recipe-selector"
                  element={
                    <RecipeSelectorPage
                      recipeCollection={recipeCollection}
                      setRecipeCollection={setRecipeCollection}
                      selectedRecipeIds={selectedRecipeIds}
                      setSelectedRecipeIds={setSelectedRecipeIds}
                      setUserMealPlan={setUserMealPlan}
                    />
                  }
                />
                <Route
                  path="recipe/:id"
                  element={
                    <RecipeDetailsPage recipeCollection={recipeCollection} />
                  }
                />
                <Route
                  path="plans/myMealPlan"
                  element={
                    <MealPlanDashboardPage
                      userMealPlan={userMealPlan}
                      setUserMealPlan={setUserMealPlan}
                      setSelectedRecipeIds={setSelectedRecipeIds}
                    />
                  }
                />
              </Route>
              <Route
                path="*"
                element={<Navigate to="/app/recipe-selector" replace />}
              />
            </Routes>
          </div>
        </Router>
      </RecipeCollectionContext.Provider>
    </QueryClientProvider>
  )
}
