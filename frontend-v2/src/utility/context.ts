import { createContext } from "react";
import { WeeklyMealPlanDay } from "@/utility/types.ts";

export const MealPlanContext = createContext<null | WeeklyMealPlanDay[]>(null);
