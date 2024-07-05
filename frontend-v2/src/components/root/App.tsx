import { createContext, useEffect, useState } from "react";
import {
  cn,
  daysOfTheWeekArray,
  exampleWeekMealPlan,
} from "@/utility/utils.ts";
import { DayOfWeek, WeeklyMealPlanDay } from "@/utility/types.ts";
import { List } from "@phosphor-icons/react";
import OneFullDayMealPlan from "../OneFullDayMealPlan.tsx";
import axios from "axios";
import MainAppPage from "@/pages/MainAppPage.tsx";
import { MealPlanContext } from "@/utility/context.ts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import RecipePage from "@/pages/RecipePage.tsx";

export default function App() {
  const [mealPlan, setMealPlan] = useState<null | WeeklyMealPlanDay[]>(null);

  const handleGetMealPlan = async () => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_input: "Make me a meal plan with lots of protein.",
    //   }),
    // };
    //
    // try {
    //   const res = await fetch(
    //     "http://localhost:8081/meal-plan",
    //     requestOptions,
    //   );
    //   const text = await res.text(); // Read the response as text
    //
    //   console.log(text); // Log the response text
    // } catch (error) {
    //   console.error(error);
    // }

    // try {
    //   const response = await axios.post("http://localhost:8081/meal-plan", {
    //     user_input: "Give me a high protein, keto friendly meal plan.",
    //   });
    //   console.log(response.data);
    //   console.log(JSON.parse(response.data));
    //   setMealPlan(JSON.parse(response.data));
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    // }

    // try {
    //   const response = await axios.get("http://localhost:8081/getStrategy", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    setTimeout(() => {
      const exampleData = exampleWeekMealPlan;
      setMealPlan(exampleData);
      return exampleData;
    }, 800);
  };

  useEffect(() => {
    handleGetMealPlan();
  }, []);

  return (
    <MealPlanContext.Provider value={mealPlan}>
      <Router>
        <div>
          <Routes>
            <Route path="/app" element={<MainAppPage />} />
            <Route path="/app/recipe/:id" element={<RecipePage />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </div>
      </Router>
    </MealPlanContext.Provider>
  );
}
