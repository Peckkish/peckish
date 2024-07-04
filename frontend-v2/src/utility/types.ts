export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface IngredientItem {
  product: string;
  amount: string;
}

export interface Recipe {
  recipeTitle: string;
  recipeDescription: string;
  totalCost: number;
  timeTaken: number;
  recipeIngredients: IngredientItem[];
  recipeSteps: string[];
  recipeImageURL: string;
}

export type mealOfDay = "Breakfast" | "Lunch" | "Dinner";

export interface MealRecipeCollection {
  mealOfDay: mealOfDay;
  recipeOptions: Recipe[];
}

export interface WeeklyMealPlanDay {
  day: DayOfWeek;
  allRecipes: MealRecipeCollection[];
}
