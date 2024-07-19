export interface IngredientItem {
  product: string;
  qtyNumber: number;
  qtyUnit: string;
  productURL: string;
}

export type Supermarket = "Woolies" | "Coles";
export type BLD = "Breakfast" | "Lunch" | "Dinner";

export interface Recipe {
  BLD: BLD;
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

// Full data structure to receive from backend is of type Recipe[]

export interface DietaryPreferences {
  isHighProtein: boolean;
  isLowCarb: boolean;
  isVegetarian: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;
  isKeto: boolean;
  isDairyFree: boolean;
  isVegan: boolean;
  isLowFat: boolean;
  isLowFODMAP: boolean;
  isAIP: boolean;
  isLowCalorie: boolean;
}

export type Difficulty = "Easy" | "Medium" | "Challenging";
export type PortionSize = "Regular" | "Large" | "XLarge";
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

export interface SupermarketPreferences {
  wooliesEnabled: boolean;
  colesEnabled: boolean;
}
