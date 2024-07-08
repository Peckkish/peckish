export interface IngredientItem {
  product: string;
  qtyNumber: number;
  qtyUnit: string;
  productURL: string;
}

export interface Recipe {
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
