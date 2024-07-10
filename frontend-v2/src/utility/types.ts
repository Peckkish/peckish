import { daysOfWeek } from "@/utility/utils.ts";

export interface IngredientItem {
  product: string;
  qtyNumber: number;
  qtyUnit: string;
  productURL: string;
}

export type Supermarket = "Woolies" | "Coles";

export interface Recipe {
  BLD: string;
  supermarket: Supermarket;
  recipeTitle: string;
  recipeId: string;
  recipeDescription: string;
  recipeLongIntro: string;
  totalCost: number;
  prepTime: number;
  cookTime: number;
  recipeIngredients: IngredientItem[];
  recipeSteps: string[];
  recipeImageURL: string;
  recipeRating: number;
  numRatings: number;
  numServings: number;
}

export interface FullRecipeCollection {
  breakfastRecipes: Recipe[];
  lunchRecipes: Recipe[];
  dinnerRecipes: Recipe[];
}

// Full data structure to receive from backend is of type FullRecipeCollection

export interface DietaryPreferences {
  isHighProtein: boolean;
  isLowCarb: boolean;
  isVegetarian: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;
  isKeto: boolean;
  isDairyFree: boolean;
  isVegan: boolean;
}

export type Difficulty = "Easy" | "Medium" | "Challenging";
export type PortionSize = "Standard" | "Large" | "XLarge";
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface ServingsInfo {
  portionSize: PortionSize;
  peopleServedPerMeal: number;
  numberOfDays: number;
  startEatingOn: DayOfWeek;
}
