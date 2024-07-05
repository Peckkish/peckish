import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DayOfWeek, WeeklyMealPlanDay } from "@/utility/types.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedTime(numMinutes: number) {
  const quotient = Math.floor(numMinutes / 60);
  const remainder = numMinutes % 60;
  return quotient > 0 ? `${quotient} Hr ${remainder} Min` : `${remainder} Min`;
}

export function getFormattedPrice(dollars: number) {
  return (
    "$" +
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(dollars)
  );
}

export function getRecipeObjectByIdOrNull(
  mealPlan: WeeklyMealPlanDay[] | null,
  targetRecipeId: string,
) {
  if (mealPlan === null) {
    console.error("Meal plan is null.");
    return null;
  }
  for (const day of mealPlan) {
    for (const recipeCollection of day.allRecipes) {
      for (const recipe of recipeCollection.recipeOptions) {
        if (recipe.recipeId === targetRecipeId) {
          console.log("LOCATED");
          console.log(recipe);
          return recipe;
        }
      }
    }
  }
  console.error("No recipe matching id was found.");
  return null;
}

export const daysOfTheWeekArray: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const exampleWeekMealPlan: WeeklyMealPlanDay[] = [
  {
    day: "Monday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "c9b1d9f0-8cb7-4c9e-9a15-2f80c9a57d9e",
            recipeTitle: "Oatmeal Pancakes",
            recipeDescription: "Fluffy pancakes made from whole oatmeal",
            totalCost: 10.0,
            timeTaken: 20,
            recipeIngredients: [
              { product: "Whole oatmeal", amount: "1 cup" },
              { product: "Milk", amount: "1 cup" },
              { product: "Egg", amount: "1" },
            ],
            recipeSteps: [
              "Mix ingredients.",
              "Pour batter on hot pan.",
              "Flip pancakes.",
            ],
            recipeImageURL: "imageURLForPancakes",
          },
          {
            recipeId: "81b624c3-1c9f-46c7-937b-4a2e9c376b28",
            recipeTitle: "Blueberry Pancakes",
            recipeDescription: "Fluffy pancakes made from whole oatmeal",
            totalCost: 10.0,
            timeTaken: 20,
            recipeIngredients: [
              { product: "Whole oatmeal", amount: "1 cup" },
              { product: "Milk", amount: "1 cup" },
              { product: "Egg", amount: "1" },
            ],
            recipeSteps: [
              "Mix ingredients.",
              "Pour batter on hot pan.",
              "Flip pancakes.",
            ],
            recipeImageURL: "imageURLForPancakes",
          },
          {
            recipeId: "6a3c0b9e-2e84-4d29-9c27-2e556b9d383b",
            recipeTitle: "Raspberry Pancakes",
            recipeDescription: "Fluffy pancakes made from whole oatmeal",
            totalCost: 10.0,
            timeTaken: 20,
            recipeIngredients: [
              { product: "Whole oatmeal", amount: "1 cup" },
              { product: "Milk", amount: "1 cup" },
              { product: "Egg", amount: "1" },
            ],
            recipeSteps: [
              "Mix ingredients.",
              "Pour batter on hot pan.",
              "Flip pancakes.",
            ],
            recipeImageURL: "imageURLForPancakes",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "4bfb5e4e-cf4f-4a75-a55f-45c9b6c3db5d",
            recipeTitle: "Turkey Sandwich",
            recipeDescription:
              "A hearty sandwich with turkey and fresh vegetables",
            totalCost: 15.0,
            timeTaken: 10,
            recipeIngredients: [
              { product: "Bread slices", amount: "2" },
              { product: "Turkey slices", amount: "100g" },
              { product: "Lettuce", amount: "1 leaf" },
              { product: "Tomato", amount: "1 sliced" },
            ],
            recipeSteps: [
              "Assemble the bread",
              "Layer with turkey and veggies",
              "Add sauce",
            ],
            recipeImageURL: "imageURLForSandwich",
          },
          {
            recipeId: "4f7b62ae-9189-4114-a2a2-5bde147f3fbe",
            recipeTitle: "Double Turkey Sandwich",
            recipeDescription:
              "A hearty sandwich with turkey and fresh vegetables",
            totalCost: 15.0,
            timeTaken: 10,
            recipeIngredients: [
              { product: "Bread slices", amount: "2" },
              { product: "Turkey slices", amount: "100g" },
              { product: "Lettuce", amount: "1 leaf" },
              { product: "Tomato", amount: "1 sliced" },
            ],
            recipeSteps: [
              "Assemble the bread",
              "Layer with turkey and veggies",
              "Add sauce",
            ],
            recipeImageURL: "imageURLForSandwich",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "df52488d-313f-4c76-812f-1915b7dbfd7f",
            recipeTitle: "Grilled Salmon",
            recipeDescription:
              "Perfectly grilled salmon with a side of asparagus",
            totalCost: 25.0,
            timeTaken: 30,
            recipeIngredients: [
              { product: "Salmon fillet", amount: "200g" },
              { product: "Asparagus", amount: "100g" },
              { product: "Olive oil", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Season salmon",
              "Grill on medium heat",
              "Serve with asparagus",
            ],
            recipeImageURL: "imageURLForSalmon",
          },
          {
            recipeId: "6d6fb9c8-85c8-4ff5-80e3-ea8b57b03490",
            recipeTitle: "Smoked Salmon",
            recipeDescription:
              "Perfectly grilled salmon with a side of asparagus",
            totalCost: 25.0,
            timeTaken: 30,
            recipeIngredients: [
              { product: "Salmon fillet", amount: "200g" },
              { product: "Asparagus", amount: "100g" },
              { product: "Olive oil", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Season salmon",
              "Grill on medium heat",
              "Serve with asparagus",
            ],
            recipeImageURL: "imageURLForSalmon",
          },
        ],
      },
    ],
  },
  {
    day: "Tuesday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "ae5c4f50-84d3-4fc4-8a7c-412473fc46d1",
            recipeTitle: "Greek Yogurt with Honey",
            recipeDescription:
              "Creamy Greek yogurt drizzled with organic honey and nuts",
            totalCost: 5.0,
            timeTaken: 5,
            recipeIngredients: [
              { product: "Greek yogurt", amount: "1 cup" },
              { product: "Honey", amount: "2 tbsp" },
              { product: "Mixed nuts", amount: "1/4 cup" },
            ],
            recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
            recipeImageURL: "imageURLForYogurt",
          },
          {
            recipeId: "7fcd6bd1-96a5-4c5c-ae4e-3a6dbcc992f2",
            recipeTitle: "Greek Yogurt with Honey",
            recipeDescription:
              "Creamy Greek yogurt drizzled with organic honey and nuts",
            totalCost: 5.0,
            timeTaken: 5,
            recipeIngredients: [
              { product: "Greek yogurt", amount: "1 cup" },
              { product: "Honey", amount: "2 tbsp" },
              { product: "Mixed nuts", amount: "1/4 cup" },
            ],
            recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
            recipeImageURL: "imageURLForYogurt",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "ddf0ff3e-91a8-4c8d-8f69-3a93bda25d1e",
            recipeTitle: "Vegetable Stir-Fry",
            recipeDescription:
              "Quick and nutritious vegetable stir-fry with tofu",
            totalCost: 12.0,
            timeTaken: 15,
            recipeIngredients: [
              { product: "Assorted vegetables", amount: "2 cups (chopped)" },
              { product: "Tofu", amount: "200g (cubed)" },
              { product: "Soy sauce", amount: "2 tbsp" },
              { product: "Sesame oil", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Chop vegetables",
              "Stir-fry with tofu",
              "Season to taste",
            ],
            recipeImageURL: "imageURLForStirFry",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "370e3f22-bab4-4d09-a74b-9a09b0280d3e",
            recipeTitle: "Beef Stew",
            recipeDescription: "Rich and hearty beef stew with root vegetables",
            totalCost: 30.0,
            timeTaken: 60,
            recipeIngredients: [
              { product: "Beef chunks", amount: "500g" },
              { product: "Carrots", amount: "2 (chopped)" },
              { product: "Potatoes", amount: "3 (cubed)" },
              { product: "Onion", amount: "1 (chopped)" },
              { product: "Beef broth", amount: "500ml" },
            ],
            recipeSteps: [
              "Brown the beef",
              "Simmer with vegetables",
              "Serve hot",
            ],
            recipeImageURL: "imageURLForStew",
          },
        ],
      },
    ],
  },
  {
    day: "Wednesday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "128b8e24-f933-4e02-99d4-acec734cb740",
            recipeTitle: "Banana Smoothie",
            recipeDescription:
              "A refreshing smoothie with bananas and almond milk",
            totalCost: 7.0,
            timeTaken: 10,
            recipeIngredients: [
              { product: "Bananas", amount: "2" },
              { product: "Almond milk", amount: "1 cup" },
              { product: "Ice cubes", amount: "1 cup" },
            ],
            recipeSteps: [
              "Blend bananas",
              "Add almond milk and ice",
              "Blend until smooth",
            ],
            recipeImageURL: "imageURLForSmoothie",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "2c2fbd32-32ab-46ea-9612-88ecb42de014",
            recipeTitle: "Caprese Salad",
            recipeDescription:
              "Classic Italian salad with fresh tomatoes, mozzarella, and basil",
            totalCost: 20.0,
            timeTaken: 10,
            recipeIngredients: [
              { product: "Tomatoes", amount: "3" },
              { product: "Mozzarella cheese", amount: "200g" },
              { product: "Fresh basil leaves", amount: "10 leaves" },
              { product: "Balsamic vinegar", amount: "2 tbsp" },
            ],
            recipeSteps: [
              "Slice tomatoes",
              "Layer with mozzarella",
              "Garnish with basil and balsamic",
            ],
            recipeImageURL: "imageURLForCaprese",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "5d4ad13d-5061-4cb4-89e1-73ed0c2eeb76",
            recipeTitle: "Chicken Curry",
            recipeDescription: "Aromatic chicken curry with a blend of spices",
            totalCost: 22.0,
            timeTaken: 45,
            recipeIngredients: [
              { product: "Chicken breast", amount: "500g" },
              { product: "Onions", amount: "2" },
              { product: "Garlic cloves", amount: "4 minced" },
              { product: "Curry powder", amount: "2 tbsp" },
              { product: "Coconut milk", amount: "400 ml" },
            ],
            recipeSteps: [
              "Sauté onions and garlic",
              "Add chicken and spices",
              "Simmer with coconut milk",
            ],
            recipeImageURL: "imageURLForCurry",
          },
        ],
      },
    ],
  },
  {
    day: "Thursday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "6483ad39-120f-49b3-8e3e-7859b345a530",
            recipeTitle: "Avocado Toast",
            recipeDescription:
              "Simple and healthy avocado toast with poached eggs",
            totalCost: 12.0,
            timeTaken: 15,
            recipeIngredients: [
              { product: "Bread", amount: "2 slices" },
              { product: "Avocado", amount: "1" },
              { product: "Eggs", amount: "2" },
            ],
            recipeSteps: [
              "Toast bread",
              "Mash avocado",
              "Top with poached eggs",
            ],
            recipeImageURL: "imageURLForAvocadoToast",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "f77651f3-c403-470d-b569-2c7b8e8d1603",
            recipeTitle: "Quinoa Salad",
            recipeDescription: "Light quinoa salad with cucumbers and tomatoes",
            totalCost: 13.0,
            timeTaken: 20,
            recipeIngredients: [
              { product: "Quinoa", amount: "1 cup" },
              { product: "Cucumbers", amount: "1 (diced)" },
              { product: "Tomatoes", amount: "2 (diced)" },
              { product: "Lemon juice", amount: "2 tbsp" },
              { product: "Olive oil", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Cook quinoa",
              "Mix with veggies",
              "Dress with lemon and olive oil",
            ],
            recipeImageURL: "imageURLForQuinoaSalad",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "3f9e7e83-9787-4218-b540-9b303a4d81c0",
            recipeTitle: "Pasta Carbonara",
            recipeDescription: "Classic creamy pasta with eggs and pancetta",
            totalCost: 18.0,
            timeTaken: 25,
            recipeIngredients: [
              { product: "Pasta", amount: "400g" },
              { product: "Pancetta", amount: "150g" },
              { product: "Eggs", amount: "4" },
              { product: "Parmesan cheese", amount: "100g (grated)" },
            ],
            recipeSteps: [
              "Cook pasta",
              "Fry pancetta",
              "Mix with eggs and cheese",
            ],
            recipeImageURL: "imageURLForCarbonara",
          },
        ],
      },
    ],
  },
  {
    day: "Friday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "df6f52a3-8e9e-4915-85c8-f09ef885a934",
            recipeTitle: "French Toast",
            recipeDescription: "Sweet French toast with maple syrup",
            totalCost: 8.0,
            timeTaken: 15,
            recipeIngredients: [
              { product: "Bread", amount: "4 slices" },
              { product: "Eggs", amount: "2" },
              { product: "Milk", amount: "1/2 cup" },
              { product: "Maple syrup", amount: "to serve" },
            ],
            recipeSteps: [
              "Dip bread in egg mixture",
              "Fry until golden",
              "Serve with syrup",
            ],
            recipeImageURL: "imageURLForFrenchToast",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "8059a23d-e232-4073-93cb-ecff8c3d1ff8",
            recipeTitle: "Ham and Cheese Sandwich",
            recipeDescription:
              "Classic sandwich with ham, cheese, and a touch of mustard",
            totalCost: 6.5,
            timeTaken: 5,
            recipeIngredients: [
              { product: "Bread slices", amount: "2" },
              { product: "Ham", amount: "4 slices" },
              { product: "Cheese", amount: "2 slices" },
              { product: "Mustard", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Assemble sandwich",
              "Add mustard",
              "Toast if desired",
            ],
            recipeImageURL: "imageURLForHamCheese",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "1b9b41ab-bd67-498a-bdb8-77ef6d4a05f1",
            recipeTitle: "Pizza Margherita",
            recipeDescription:
              "Homemade pizza with fresh tomatoes, mozzarella, and basil",
            totalCost: 20.0,
            timeTaken: 30,
            recipeIngredients: [
              { product: "Pizza dough", amount: "1 base" },
              { product: "Tomatoes", amount: "3 (sliced)" },
              { product: "Mozzarella", amount: "200g (sliced)" },
              { product: "Fresh basil", amount: "A handful" },
            ],
            recipeSteps: [
              "Prepare dough",
              "Top with ingredients",
              "Bake in oven",
            ],
            recipeImageURL: "imageURLForPizza",
          },
        ],
      },
    ],
  },
  {
    day: "Saturday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "728376d4-3787-4e27-9946-690d64d5b104",
            recipeTitle: "Berry Parfait",
            recipeDescription:
              "Layered parfait with berries, yogurt, and granola",
            totalCost: 6.0,
            timeTaken: 5,
            recipeIngredients: [
              { product: "Yogurt", amount: "1 cup" },
              { product: "Mixed berries", amount: "1/2 cup" },
              { product: "Granola", amount: "1/4 cup" },
            ],
            recipeSteps: [
              "Layer yogurt",
              "Add berries and granola",
              "Repeat layers",
            ],
            recipeImageURL: "imageURLForParfait",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "caa8b4ab-9295-4c2a-99e3-e727dd64ae0e",
            recipeTitle: "Fish Tacos",
            recipeDescription: "Tacos with grilled fish and fresh salsa",
            totalCost: 15.0,
            timeTaken: 20,
            recipeIngredients: [
              { product: "Fish fillets", amount: "200g" },
              { product: "Tortillas", amount: "4" },
              { product: "Salsa", amount: "1 cup" },
            ],
            recipeSteps: ["Grill fish", "Prepare salsa", "Assemble tacos"],
            recipeImageURL: "imageURLForFishTacos",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "6afad2c4-d59e-4f68-9c48-3ff7277d7b94",
            recipeTitle: "Lamb Chops",
            recipeDescription: "Seared lamb chops with a mint sauce",
            totalCost: 35.0,
            timeTaken: 40,
            recipeIngredients: [
              { product: "Lamb chops", amount: "4 pieces" },
              { product: "Mint", amount: "1 bunch" },
              { product: "Sugar", amount: "1 tsp" },
              { product: "Vinegar", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Season lamb",
              "Sear on high heat",
              "Serve with mint sauce",
            ],
            recipeImageURL: "imageURLForLambChops",
          },
        ],
      },
    ],
  },
  {
    day: "Sunday",
    allRecipes: [
      {
        mealOfDay: "Breakfast",
        recipeOptions: [
          {
            recipeId: "6fd6e833-9fa8-4556-8d5c-62c148b2a8c7",
            recipeTitle: "Bagel and Lox",
            recipeDescription:
              "A New York style bagel with cream cheese, smoked salmon, and capers",
            totalCost: 15.0,
            timeTaken: 10,
            recipeIngredients: [
              { product: "Bagel", amount: "1" },
              { product: "Cream cheese", amount: "50g" },
              { product: "Smoked salmon", amount: "100g" },
              { product: "Capers", amount: "1 tbsp" },
            ],
            recipeSteps: [
              "Toast bagel",
              "Spread cream cheese",
              "Add salmon and capers",
            ],
            recipeImageURL: "imageURLForBagelLox",
          },
        ],
      },
      {
        mealOfDay: "Lunch",
        recipeOptions: [
          {
            recipeId: "0df25c12-d2e8-4260-9246-8e4fe2eb8cc5",
            recipeTitle: "Sushi Rolls",
            recipeDescription: "Homemade sushi rolls with various fillings",
            totalCost: 22.0,
            timeTaken: 45,
            recipeIngredients: [
              { product: "Sushi rice", amount: "1 cup" },
              { product: "Nori sheets", amount: "2" },
              { product: "Fish", amount: "100g" },
              { product: "Vegetables", amount: "1 cup (sliced)" },
            ],
            recipeSteps: [
              "Prepare sushi rice",
              "Assemble rolls with fillings",
              "Slice into pieces",
            ],
            recipeImageURL: "imageURLForSushi",
          },
        ],
      },
      {
        mealOfDay: "Dinner",
        recipeOptions: [
          {
            recipeId: "c0a61690-958e-47a3-8b0b-fdb5e479a8f3",
            recipeTitle: "Roast Chicken",
            recipeDescription: "Oven-roasted chicken with herbs and vegetables",
            totalCost: 25.0,
            timeTaken: 90,
            recipeIngredients: [
              { product: "Whole chicken", amount: "1.5 kg" },
              { product: "Herbs", amount: "1 tbsp (mixed)" },
              { product: "Vegetables", amount: "500g (assorted)" },
            ],
            recipeSteps: ["Prep chicken", "Season well", "Roast with veggies"],
            recipeImageURL: "imageURLForRoastChicken",
          },
        ],
      },
    ],
  },
];
