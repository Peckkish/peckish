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
