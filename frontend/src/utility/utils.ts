import { type ClassValue, clsx } from 'clsx'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { twMerge } from 'tailwind-merge'
import {
  DayOfWeek,
  IngredientItem,
  Recipe,
  ServingsInfo,
} from '@/utility/types.ts'
import { Dispatch, SetStateAction } from 'react'

export function getFormattedTime(numMinutes: number) {
  const quotient = Math.floor(numMinutes / 60)
  const remainder = numMinutes % 60
  return quotient > 0 ? `${quotient} Hr ${remainder} Min` : `${remainder} Min`
}

export function getFormattedPrice(dollars: number) {
  return (
    '$' +
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(dollars)
  )
}

export function getRecipeObjectByIdOrNull(
  recipeCollection: Recipe[] | null,
  targetRecipeId: string,
) {
  if (!recipeCollection || recipeCollection.length === 0) {
    console.error('Recipe collection empty.')
    return null
  }

  console.log({ searchingIn: recipeCollection })
  console.log({ searchingFor: targetRecipeId })

  const result =
    recipeCollection!.find(recipe => recipe.recipeId === targetRecipeId) ?? null

  console.log(result)

  return result
}

export const getTotalShoppingList = (
  recipes: Recipe[],
  recipeIdToMultiplierMap: Map<string, number>,
) => {
  let totalShoppingList: IngredientItem[] = []
  for (const recipe of recipes) {
    const multiplier = recipeIdToMultiplierMap.get(recipe.recipeId) ?? 1
    const multipliedIngredientList = recipe.recipeIngredients.map(
      ingredient => ({
        ...ingredient,
        qtyNumber: ingredient.qtyNumber * multiplier,
      }),
    )
    totalShoppingList = [...totalShoppingList, ...multipliedIngredientList]
  }
  return totalShoppingList
}

export function roundToNearestQuarter(num: number): number {
  return Math.round(num * 4) / 4
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    let t = b
    b = a % b
    a = t
  }
  return a
}

function decimalToFraction(decimal: number): string {
  const tolerance = 1.0e-6
  let denominator = 1
  while (
    Math.abs(Math.round(decimal * denominator) / denominator - decimal) >
    tolerance
  ) {
    denominator++
  }
  const numerator = Math.round(decimal * denominator)
  const divisor = gcd(numerator, denominator)
  return `${numerator / divisor}/${denominator / divisor}`
}

export function decimalToMixedFractionString(decimal: number): string {
  const decimalRemainder = decimal % 1
  const quotient = decimal - decimalRemainder
  return `${quotient === 0 ? '' : quotient.toString()}  ${decimalRemainder === 0 ? '' : decimalToFraction(decimalRemainder)}`
}

export function updateMultiplierMapState(
  recipeId: string,
  multiplier: number,
  setRecipeIdToMultiplierMap: Dispatch<SetStateAction<Map<string, number>>>,
) {
  setRecipeIdToMultiplierMap(prevMap => {
    const newMap = new Map(prevMap)
    newMap.set(recipeId, multiplier)
    return newMap
  })
}

export function updateServingsMapState(
  recipeId: string,
  servingsInfo: ServingsInfo,
  setRecipeIdToServingsInfoMap: Dispatch<
    SetStateAction<Map<string, ServingsInfo>>
  >,
) {
  setRecipeIdToServingsInfoMap(prevMap => {
    const newMap = new Map(prevMap)
    newMap.set(recipeId, servingsInfo)
    return newMap
  })
}

export function getDayOfWeekIndex(day: DayOfWeek): number {
  switch (day) {
    case 'Monday':
      return 0
    case 'Tuesday':
      return 1
    case 'Wednesday':
      return 2
    case 'Thursday':
      return 3
    case 'Friday':
      return 4
    case 'Saturday':
      return 5
    case 'Sunday':
      return 6
    default:
      throw new Error('Invalid day of the week')
  }
}

export function parseFractionString(fraction: string): number {
  if (fraction === '') {
    return 0
  }

  // Dictionary of common fraction symbols and their decimal equivalents
  const fractionValues: Record<string, number> = {
    '¼': 0.25,
    '½': 0.5,
    '¾': 0.75,
  }

  // Regular expression to match optional integers followed by a fraction
  const match = fraction.match(/(\d+)?(\D+)?/)

  if (!match) return NaN

  // Extract the integer part and the fraction part from the match
  const integerPart = match[1] ? parseInt(match[1]) : 0
  const fractionPart = match[2] ? fractionValues[match[2]] : 0

  // Return the sum of the integer part and the fraction part
  return integerPart + fractionPart
}

export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const dummyMealPlan5: Recipe[] = [
  {
    BLD: 'Breakfast',
    supermarket: 'Woolies',
    recipeTitle: 'Classic Oatmeal',
    recipeId: 'rec001',
    recipeDescription:
      'A warm, nutritious start to your day with customisable toppings.',
    recipeLongIntro:
      'Start your morning with a hearty bowl of oatmeal, made with rolled oats and served with a variety of toppings like fruits, nuts, and a drizzle of honey.',
    totalCost: 10,
    prepTime: 5,
    cookTime: 10,
    recipeIngredients: [
      {
        product: 'Rolled Oats',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/12345/rolled-oats',
      },
      {
        product: 'Honey',
        qtyNumber: 2,
        qtyUnit: 'tablespoons',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/67890/honey',
      },
    ],
    recipeSteps: [
      'Boil water or milk in a saucepan.',
      'Add oats and reduce heat to a simmer.',
      'Cook until oats are soft.',
      'Serve in a bowl with honey drizzled on top.',
    ],
    recipeImageURL: 'https://example.com/images/oatmeal.jpg',
    recipeRating: 4.5,
    numRatings: 150,
    numServings: 2,
  },
  {
    BLD: 'Breakfast',
    supermarket: 'Coles',
    recipeTitle: 'Avocado Toast',
    recipeId: 'rec002',
    recipeDescription:
      'A quick, delicious, and healthy avocado spread on whole grain bread.',
    recipeLongIntro:
      'Rich in fiber and healthy fats, this simple avocado toast makes a satisfying and nutritious breakfast option.',
    totalCost: 15,
    prepTime: 5,
    cookTime: 0,
    recipeIngredients: [
      {
        product: 'Whole Grain Bread',
        qtyNumber: 2,
        qtyUnit: 'slices',
        productURL:
          'https://www.coles.com.au/shop/productdetails/54321/whole-grain-bread',
      },
      {
        product: 'Ripe Avocado',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL:
          'https://www.coles.com.au/shop/productdetails/98765/ripe-avocado',
      },
    ],
    recipeSteps: [
      'Toast the bread slices to your liking.',
      'Mash the avocado and spread evenly on the toasted bread.',
      'Season with salt, pepper, and optional red pepper flakes.',
    ],
    recipeImageURL: 'https://example.com/images/avocado-toast.jpg',
    recipeRating: 4.7,
    numRatings: 200,
    numServings: 1,
  },
  {
    BLD: 'Breakfast',
    supermarket: 'Woolies',
    recipeTitle: 'Berry Smoothie',
    recipeId: 'rec003',
    recipeDescription: 'A refreshing berry smoothie packed with antioxidants.',
    recipeLongIntro:
      'Blend up a vibrant mix of berries and yogurt for a refreshing smoothie. Perfect for a quick breakfast or a nutritious snack.',
    totalCost: 8,
    prepTime: 5,
    cookTime: 0,
    recipeIngredients: [
      {
        product: 'Mixed Berries',
        qtyNumber: 150,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/22222/mixed-berries',
      },
      {
        product: 'Greek Yogurt',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/33333/greek-yogurt',
      },
    ],
    recipeSteps: [
      'Place all ingredients in a blender.',
      'Blend on high until smooth.',
      'Serve immediately.',
    ],
    recipeImageURL: 'https://example.com/images/berry-smoothie.jpg',
    recipeRating: 4.8,
    numRatings: 180,
    numServings: 1,
  },
]

export const dummyMealPlan6: Recipe[] = [
  {
    BLD: 'Lunch',
    supermarket: 'Coles',
    recipeTitle: 'Chicken Caesar Salad',
    recipeId: 'rec004',
    recipeDescription:
      'A classic Caesar salad topped with grilled chicken, perfect for a light and healthy lunch.',
    recipeLongIntro:
      'Enjoy a fresh and crunchy Caesar salad with Romaine lettuce, Parmesan cheese, croutons, and tender grilled chicken, all tossed in a creamy Caesar dressing.',
    totalCost: 20,
    prepTime: 10,
    cookTime: 15,
    recipeIngredients: [
      {
        product: 'Chicken Breast',
        qtyNumber: 200,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/56789/chicken-breast',
      },
      {
        product: 'Romaine Lettuce',
        qtyNumber: 1,
        qtyUnit: 'head',
        productURL:
          'https://www.coles.com.au/shop/productdetails/10112/romaine-lettuce',
      },
      {
        product: 'Parmesan Cheese',
        qtyNumber: 50,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/14141/parmesan-cheese',
      },
      {
        product: 'Caesar Dressing',
        qtyNumber: 3,
        qtyUnit: 'tablespoons',
        productURL:
          'https://www.coles.com.au/shop/productdetails/16161/caesar-dressing',
      },
      {
        product: 'Croutons',
        qtyNumber: 30,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/17171/croutons',
      },
    ],
    recipeSteps: [
      'Grill the chicken breast until fully cooked and slice it.',
      'Wash and chop the lettuce.',
      'Combine lettuce, sliced chicken, Parmesan cheese, and croutons in a large bowl.',
      'Drizzle with Caesar dressing and toss well.',
    ],
    recipeImageURL: 'https://example.com/images/chicken-caesar-salad.jpg',
    recipeRating: 4.6,
    numRatings: 210,
    numServings: 2,
  },
  {
    BLD: 'Lunch',
    supermarket: 'Woolies',
    recipeTitle: 'Spicy Tuna Roll',
    recipeId: 'rec005',
    recipeDescription:
      'Homemade sushi rolls featuring spicy tuna and crisp vegetables.',
    recipeLongIntro:
      'Craft your own sushi at home with this spicy tuna roll recipe, combining fresh tuna, spicy mayo, and crunchy cucumbers wrapped in seaweed and rice.',
    totalCost: 25,
    prepTime: 30,
    cookTime: 0,
    recipeIngredients: [
      {
        product: 'Sushi Rice',
        qtyNumber: 250,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/25252/sushi-rice',
      },
      {
        product: 'Fresh Tuna',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/26262/fresh-tuna',
      },
      {
        product: 'Spicy Mayo',
        qtyNumber: 2,
        qtyUnit: 'tablespoons',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/27272/spicy-mayo',
      },
      {
        product: 'Cucumber',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/28282/cucumber',
      },
      {
        product: 'Seaweed Sheets',
        qtyNumber: 2,
        qtyUnit: 'sheets',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/29292/seaweed-sheets',
      },
    ],
    recipeSteps: [
      'Cook sushi rice according to package instructions.',
      'Mix diced tuna with spicy mayo.',
      'Place seaweed sheet on a bamboo mat, spread rice evenly, then add the tuna mix and sliced cucumber.',
      'Roll tightly, slice, and serve.',
    ],
    recipeImageURL: 'https://example.com/images/spicy-tuna-roll.jpg',
    recipeRating: 4.8,
    numRatings: 150,
    numServings: 2,
  },
  {
    BLD: 'Lunch',
    supermarket: 'Woolies',
    recipeTitle: 'Veggie Burrito Bowl',
    recipeId: 'rec006',
    recipeDescription:
      'A delectable and filling bowl with rice, beans, and assorted vegetables, topped with avocado.',
    recipeLongIntro:
      'This hearty veggie burrito bowl is packed with flavors and nutrients, featuring a base of brown rice, black beans, and a colorful array of vegetables, perfect for a filling lunch.',
    totalCost: 18,
    prepTime: 15,
    cookTime: 10,
    recipeIngredients: [
      {
        product: 'Brown Rice',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/30303/brown-rice',
      },
      {
        product: 'Black Beans',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/31313/black-beans',
      },
      {
        product: 'Corn',
        qtyNumber: 50,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/32323/corn',
      },
      {
        product: 'Cherry Tomatoes',
        qtyNumber: 50,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/33333/cherry-tomatoes',
      },
      {
        product: 'Avocado',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/34343/avocado',
      },
    ],
    recipeSteps: [
      'Cook brown rice.',
      'Heat black beans with corn.',
      'Assemble the bowl with rice at the base, followed by beans, corn, and sliced cherry tomatoes.',
      'Top with slices of avocado and serve.',
    ],
    recipeImageURL: 'https://example.com/images/veggie-burrito-bowl.jpg',
    recipeRating: 4.9,
    numRatings: 230,
    numServings: 1,
  },
]

export const dummyMealPlan7: Recipe[] = [
  {
    BLD: 'Dinner',
    supermarket: 'Coles',
    recipeTitle: 'Beef Stir-Fry',
    recipeId: 'rec007',
    recipeDescription:
      'A quick and flavorful beef stir-fry with vegetables and soy sauce.',
    recipeLongIntro:
      "This beef stir-fry combines tender slices of beef with a colorful mix of bell peppers and onions, all sautéed in a rich soy sauce blend. It's a perfect quick dinner option that delivers both taste and nutrition.",
    totalCost: 22,
    prepTime: 10,
    cookTime: 15,
    recipeIngredients: [
      {
        product: 'Beef Strips',
        qtyNumber: 300,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/55555/beef-strips',
      },
      {
        product: 'Bell Peppers',
        qtyNumber: 2,
        qtyUnit: 'whole',
        productURL:
          'https://www.coles.com.au/shop/productdetails/66666/bell-peppers',
      },
      {
        product: 'Onion',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL: 'https://www.coles.com.au/shop/productdetails/77777/onion',
      },
      {
        product: 'Soy Sauce',
        qtyNumber: 3,
        qtyUnit: 'tablespoons',
        productURL:
          'https://www.coles.com.au/shop/productdetails/88888/soy-sauce',
      },
    ],
    recipeSteps: [
      'Heat oil in a pan over high heat.',
      'Add beef strips and stir-fry until browned.',
      'Add sliced bell peppers and onion, continue to stir-fry until vegetables are tender.',
      'Pour in soy sauce and stir well to coat.',
      'Serve hot with rice or noodles.',
    ],
    recipeImageURL: 'https://example.com/images/beef-stir-fry.jpg',
    recipeRating: 4.7,
    numRatings: 180,
    numServings: 2,
  },
  {
    BLD: 'Dinner',
    supermarket: 'Woolies',
    recipeTitle: 'Salmon en Papillote',
    recipeId: 'rec008',
    recipeDescription:
      'Salmon fillets baked in parchment paper with lemon, dill, and asparagus.',
    recipeLongIntro:
      'This elegant Salmon en Papillote method locks in flavor and moisture, cooking the salmon with asparagus, lemon, and dill for a delightful and healthy dinner.',
    totalCost: 30,
    prepTime: 10,
    cookTime: 20,
    recipeIngredients: [
      {
        product: 'Salmon Fillet',
        qtyNumber: 200,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/99999/salmon-fillet',
      },
      {
        product: 'Lemon',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/11111/lemon',
      },
      {
        product: 'Fresh Dill',
        qtyNumber: 5,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/22222/fresh-dill',
      },
      {
        product: 'Asparagus',
        qtyNumber: 100,
        qtyUnit: 'grams',
        productURL:
          'https://www.woolworths.com.au/shop/productdetails/33333/asparagus',
      },
    ],
    recipeSteps: [
      'Preheat oven to 200°C.',
      'Place each salmon fillet on a piece of parchment paper.',
      'Top with sliced lemon, asparagus, and sprinkle with dill.',
      'Fold the parchment paper over the salmon, sealing the edges to create a packet.',
      'Bake for 20 minutes or until salmon is cooked through.',
    ],
    recipeImageURL: 'https://example.com/images/salmon-en-papillote.jpg',
    recipeRating: 4.9,
    numRatings: 200,
    numServings: 1,
  },
  {
    BLD: 'Dinner',
    supermarket: 'Coles',
    recipeTitle: 'Vegetarian Lasagna',
    recipeId: 'rec009',
    recipeDescription:
      'A hearty and delicious lasagna made with layers of roasted vegetables and ricotta cheese.',
    recipeLongIntro:
      'This vegetarian lasagna features multiple layers of roasted zucchini, bell peppers, and mushrooms, interlaced with ricotta and a rich tomato sauce, baked to perfection.',
    totalCost: 25,
    prepTime: 30,
    cookTime: 45,
    recipeIngredients: [
      {
        product: 'Zucchini',
        qtyNumber: 2,
        qtyUnit: 'whole',
        productURL:
          'https://www.coles.com.au/shop/productdetails/44444/zucchini',
      },
      {
        product: 'Bell Pepper',
        qtyNumber: 1,
        qtyUnit: 'whole',
        productURL:
          'https://www.coles.com.au/shop/productdetails/55555/bell-pepper',
      },
      {
        product: 'Mushrooms',
        qtyNumber: 150,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/66666/mushrooms',
      },
      {
        product: 'Ricotta Cheese',
        qtyNumber: 250,
        qtyUnit: 'grams',
        productURL:
          'https://www.coles.com.au/shop/productdetails/77777/ricotta-cheese',
      },
      {
        product: 'Tomato Sauce',
        qtyNumber: 500,
        qtyUnit: 'ml',
        productURL:
          'https://www.coles.com.au/shop/productdetails/88888/tomato-sauce',
      },
    ],
    recipeSteps: [
      'Preheat oven to 180°C.',
      'Slice vegetables and roast until tender.',
      'Layer a baking dish with tomato sauce, roasted vegetables, ricotta, and repeat.',
      'Top with a final layer of tomato sauce and bake for 45 minutes.',
    ],
    recipeImageURL: 'https://example.com/images/vegetarian-lasagna.jpg',
    recipeRating: 4.8,
    numRatings: 220,
    numServings: 4,
  },
]

// export const dummyMealPlan1: Recipe[] =
// [
//     {
//       recipeId: "ae5c4f50-84d3-4fc4-8a7c-412473fc46d1",
//       recipeTitle: "Greek Yogurt with Honey",
//       recipeDescription: "With Greek yogurt and mixed nuts",
//       recipeLongIntro:
//         "Start your day with a balanced meal of protein-rich Greek yogurt, complemented by the natural sweetness of honey and the crunch of mixed nuts.",
//       totalCost: 5.0,
//       prepTime: 5,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Greek yogurt",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Honey",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Mixed nuts",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
//       recipeImageURL: "imageURLForYogurt",
//       recipeRating: 4.5,
//       numRatings: 150,
//       numServings: 1,
//     },
//     {
//       recipeId: "128b8e24-f933-4e02-99d4-acec734cb740",
//       recipeTitle: "Banana Smoothie",
//       recipeDescription: "With bananas and almond milk",
//       recipeLongIntro:
//         "Blend up a quick, energizing banana smoothie using ripe bananas and creamy almond milk for a healthy start to your day.",
//       totalCost: 7.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bananas",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Almond milk",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Ice cubes",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: [
//         "Blend bananas",
//         "Add almond milk and ice",
//         "Blend until smooth",
//       ],
//       recipeImageURL: "imageURLForSmoothie",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 2,
//     },
//     {
//       recipeId: "6483ad39-120f-49b3-8e3e-7859b345a530",
//       recipeTitle: "Avocado Toast",
//       recipeDescription: "With avocado and poached eggs",
//       recipeLongIntro:
//         "This avocado toast offers a wholesome experience with creamy avocados and perfectly poached eggs atop freshly toasted bread.",
//       totalCost: 12.0,
//       prepTime: 15,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 2,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: ["Toast bread", "Mash avocado", "Top with poached eggs"],
//       recipeImageURL: "imageURLForAvocadoToast",
//       recipeRating: 4.8,
//       numRatings: 300,
//       numServings: 1,
//     },
//     {
//       recipeId: "c1d3a682-8bf1-4f1c-b9e7-e5d3b8756650",
//       recipeTitle: "Blueberry Pancakes",
//       recipeDescription: "With blueberries and all-purpose flour",
//       recipeLongIntro:
//         "Enjoy these light and fluffy pancakes bursting with fresh blueberries, perfect for a sweet start to your morning.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "All-purpose flour",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Blueberries",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 1.5,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Egg",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Mix ingredients",
//         "Fold in blueberries",
//         "Cook on griddle",
//       ],
//       recipeImageURL: "imageURLForPancakes",
//       recipeRating: 4.7,
//       numRatings: 120,
//       numServings: 4,
//     },
//     {
//       recipeId: "3b2e98ab-2fc3-4459-a3a9-77a2e2b6f73c",
//       recipeTitle: "Spinach and Feta Omelette",
//       recipeDescription: "With tomatoes and feta cheese",
//       recipeLongIntro:
//         "This omelette combines fresh spinach, creamy feta, and ripe tomatoes for a fulfilling and nutritious breakfast.",
//       totalCost: 10.0,
//       prepTime: 5,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Eggs",
//           qtyNumber: 3,
//           qtyUnit: "",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Whisk eggs", "Add fillings", "Cook until set"],
//       recipeImageURL: "imageURLForOmelette",
//       recipeRating: 4.6,
//       numRatings: 100,
//       numServings: 1,
//     },
//     {
//       recipeId: "7e91a3d3-7691-4b15-97b7-5fa2f9f8b08c",
//       recipeTitle: "Classic French Toast",
//       recipeDescription: "With bread and eggs",
//       recipeLongIntro:
//         "This classic French toast recipe offers a decadent start to your day with its rich, vanilla-infused custard soaked bread, pan-fried to golden perfection.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 5,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 4,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Vanilla extract",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//         },
//       ],
//       recipeSteps: [
//         "Beat eggs with milk and vanilla",
//         "Soak bread",
//         "Cook on skillet",
//       ],
//       recipeImageURL: "imageURLForFrenchToast",
//       recipeRating: 4.9,
//       numRatings: 160,
//       numServings: 2,
//     },
//   ],
//   lunchRecipes: [
//     {
//       recipeId: "4bfb5e4e-cf4f-4a75-a55f-45c9b6c3db5d",
//       recipeTitle: "Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Enjoy a classic turkey sandwich packed with crisp lettuce and ripe tomatoes, ideal for a quick and satisfying meal.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 100,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.5,
//       numRatings: 80,
//       numServings: 1,
//     },
//     {
//       recipeId: "4f7b62ae-9189-4114-a2a2-5bde147f3fbe",
//       recipeTitle: "Double Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Double the turkey, double the flavour. This sandwich is a meat lover's dream, perfect for a filling lunch.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with double turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.7,
//       numRatings: 90,
//       numServings: 1,
//     },
//     {
//       recipeId: "8f5c921b-6831-47f0-b8f0-168a8433f59f",
//       recipeTitle: "Chicken Caesar Wrap",
//       recipeDescription: "With chicken breast and Caesar dressing",
//       recipeLongIntro:
//         "Savour the classic taste of Caesar salad mixed with grilled chicken strips, wrapped in a soft tortilla for a quick and satisfying lunch.",
//       totalCost: 12.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Chicken breast",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Romaine lettuce",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Parmesan cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Caesar dressing",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Tortilla wraps",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Grill chicken",
//         "Chop lettuce and mix with dressing",
//         "Assemble wrap",
//       ],
//       recipeImageURL: "imageURLForChickenWrap",
//       recipeRating: 4.6,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "c03f6b0e-ec4f-41aa-93fa-614838ec9b4a",
//       recipeTitle: "Quinoa Salad Bowl",
//       recipeDescription: "With quinoa and cucumber",
//       recipeLongIntro:
//         "This nutrient-packed quinoa salad bowl is filled with a variety of vegetables and a lemon vinaigrette, offering a light yet filling lunch.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Quinoa",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumber",
//           qtyNumber: 0.5,
//           qtyUnit: "sliced",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cherry tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook quinoa",
//         "Chop and mix vegetables",
//         "Toss with lemon juice",
//       ],
//       recipeImageURL: "imageURLForQuinoaSalad",
//       recipeRating: 4.7,
//       numRatings: 140,
//       numServings: 2,
//     },
//     {
//       recipeId: "a99c9d43-80a9-4d57-a740-18e50fa1e6ce",
//       recipeTitle: "Spicy Tofu Stir-Fry",
//       recipeDescription: "With tofu and bell peppers",
//       recipeLongIntro:
//         "Heat up your lunchtime with this spicy tofu stir-fry, featuring a colorful mix of bell peppers and a tangy sauce.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Tofu",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Chili flakes",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Press and cube tofu",
//         "Sauté vegetables",
//         "Add tofu and sauce",
//       ],
//       recipeImageURL: "imageURLForTofuStirFry",
//       recipeRating: 4.8,
//       numRatings: 110,
//       numServings: 2,
//     },
//     {
//       recipeId: "b99f8348-db51-4b9a-a693-21deef8a5f1b",
//       recipeTitle: "Mediterranean Pasta Salad",
//       recipeDescription: "With pasta and feta cheese",
//       recipeLongIntro:
//         "This refreshing Mediterranean pasta salad combines tangy feta, crisp cucumbers, and kalamata olives, dressed in a herby vinaigrette.",
//       totalCost: 9.0,
//       prepTime: 20,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Pasta",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumbers",
//           qtyNumber: 0.5,
//           qtyUnit: "chopped",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Kalamata olives",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook pasta",
//         "Chop veggies and mix",
//         "Toss everything with dressing",
//       ],
//       recipeImageURL: "imageURLForPastaSalad",
//       recipeRating: 4.5,
//       numRatings: 130,
//       numServings: 3,
//     },
//   ],
//   dinnerRecipes: [
//     {
//       recipeId: "df52488d-313f-4c76-812f-1915b7dbfd7f",
//       recipeTitle: "Grilled Salmon",
//       recipeDescription: "With salmon fillet and asparagus",
//       recipeLongIntro:
//         "This main course features succulent grilled salmon fillets, accompanied by lightly seasoned asparagus, ideal for a nutritious dinner.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season salmon",
//         "Grill on medium heat",
//         "Serve with asparagus",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.8,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "6d6fb9c8-85c8-4ff5-80e3-ea8b57b03490",
//       recipeTitle: "Smoked Salmon",
//       recipeDescription: "ith salmon fillet and fresh herbs",
//       recipeLongIntro:
//         "Enjoy the rich, smoky flavor of perfectly cooked salmon that melts in your mouth, paired with a side of crisp greens.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Prepare the salmon",
//         "Smoke until tender",
//         "Serve with a garnish of fresh herbs",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.9,
//       numRatings: 130,
//       numServings: 2,
//     },
//     {
//       recipeId: "ea320d44-ec90-4c97-b09d-daf6f5b04988",
//       recipeTitle: "Beef Stir-Fry",
//       recipeDescription: "With beef strips and onion",
//       recipeLongIntro:
//         "This beef stir-fry is quick to prepare and packed with flavors, featuring tender beef strips and fresh vegetables tossed in a rich soy sauce.",
//       totalCost: 20.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Beef strips",
//           qtyNumber: 300,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Onion",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 2,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Sauté garlic and onion",
//         "Add beef and cook until brown",
//         "Toss with vegetables and soy sauce",
//       ],
//       recipeImageURL: "imageURLForBeefStirFry",
//       recipeRating: 4.8,
//       numRatings: 180,
//       numServings: 3,
//     },
//     {
//       recipeId: "32cc34c1-a256-46a2-9b73-45fba8baf5cc",
//       recipeTitle: "Herb-Crusted Rack of Lamb",
//       recipeDescription: "With rack of lamb and rosemary",
//       recipeLongIntro:
//         "Indulge in this elegant dish of rack of lamb encrusted with rosemary, thyme, and garlic, roasted to bring out its succulent flavors.",
//       totalCost: 35.0,
//       prepTime: 20,
//       cookTime: 25,
//       recipeIngredients: [
//         {
//           product: "Rack of lamb",
//           qtyNumber: 1,
//           qtyUnit: "kg",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Rosemary",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Thyme",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 3,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Rub lamb with garlic and herbs",
//         "Roast in oven",
//         "Let rest before slicing",
//       ],
//       recipeImageURL: "imageURLForLamb",
//       recipeRating: 4.9,
//       numRatings: 150,
//       numServings: 4,
//     },
//     {
//       recipeId: "4a9c308f-8e0e-4d67-9f25-7c2d65a5b242",
//       recipeTitle: "Lemon Butter Fish",
//       recipeDescription: "With fish fillets and butter sauce",
//       recipeLongIntro:
//         "This simple yet delicious dish features tender fish fillets cooked in a zesty lemon butter sauce, perfect for a light dinner.",
//       totalCost: 18.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "White fish fillets",
//           qtyNumber: 4,
//           qtyUnit: "pieces",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Butter",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Parsley",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season fish",
//         "Pan-sear in butter",
//         "Finish with lemon juice and parsley",
//       ],
//       recipeImageURL: "imageURLForFish",
//       recipeRating: 4.8,
//       numRatings: 160,
//       numServings: 4,
//     },
//     {
//       recipeId: "9ac01dec-1d23-4e5d-9988-f2e0f803a4f7",
//       recipeTitle: "Vegetarian Lasagna",
//       recipeDescription: "With ricotta and seasonal vegetables",
//       recipeLongIntro:
//         "This hearty vegetarian lasagna is layered with creamy ricotta, a variety of seasonal vegetables, and topped with a rich tomato sauce.",
//       totalCost: 22.0,
//       prepTime: 30,
//       cookTime: 45,
//       recipeIngredients: [
//         {
//           product: "Lasagna noodles",
//           qtyNumber: 12,
//           qtyUnit: "sheets",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Ricotta cheese",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Zucchini",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Tomato sauce",
//           qtyNumber: 3,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook noodles",
//         "Layer with cheese and vegetables",
//         "Bake until golden",
//       ],
//       recipeImageURL: "imageURLForLasagna",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 6,
//     },
//   ],
// };
//
// export const dummyMealPlan2: FullRecipeCollection = {
//   breakfastRecipes: [
//     {
//       recipeId: "ae5c4f50-84d3-4fc4-8a7c-412473fc46d1",
//       recipeTitle: "Greek-Style Yogurt with Honey",
//       recipeDescription: "With Greek yogurt and mixed nuts",
//       recipeLongIntro:
//         "Start your day with a balanced meal of protein-rich Greek yogurt, complemented by the natural sweetness of honey and the crunch of mixed nuts.",
//       totalCost: 5.0,
//       prepTime: 5,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Greek yogurt",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Honey",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Mixed nuts",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
//       recipeImageURL: "imageURLForYogurt",
//       recipeRating: 4.5,
//       numRatings: 150,
//       numServings: 1,
//     },
//     {
//       recipeId: "128b8e24-f933-4e02-99d4-acec734cb740",
//       recipeTitle: "Banana Smoothie",
//       recipeDescription: "With bananas and almond milk",
//       recipeLongIntro:
//         "Blend up a quick, energizing banana smoothie using ripe bananas and creamy almond milk for a healthy start to your day.",
//       totalCost: 7.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bananas",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Almond milk",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Ice cubes",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: [
//         "Blend bananas",
//         "Add almond milk and ice",
//         "Blend until smooth",
//       ],
//       recipeImageURL: "imageURLForSmoothie",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 2,
//     },
//     {
//       recipeId: "6483ad39-120f-49b3-8e3e-7859b345a530",
//       recipeTitle: "Avocado Toast",
//       recipeDescription: "With avocado and poached eggs",
//       recipeLongIntro:
//         "This avocado toast offers a wholesome experience with creamy avocados and perfectly poached eggs atop freshly toasted bread.",
//       totalCost: 12.0,
//       prepTime: 15,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 2,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: ["Toast bread", "Mash avocado", "Top with poached eggs"],
//       recipeImageURL: "imageURLForAvocadoToast",
//       recipeRating: 4.8,
//       numRatings: 300,
//       numServings: 1,
//     },
//     {
//       recipeId: "c1d3a682-8bf1-4f1c-b9e7-e5d3b8756650",
//       recipeTitle: "Blueberry Pancakes",
//       recipeDescription: "With blueberries and all-purpose flour",
//       recipeLongIntro:
//         "Enjoy these light and fluffy pancakes bursting with fresh blueberries, perfect for a sweet start to your morning.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "All-purpose flour",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Blueberries",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 1.5,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Egg",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Mix ingredients",
//         "Fold in blueberries",
//         "Cook on griddle",
//       ],
//       recipeImageURL: "imageURLForPancakes",
//       recipeRating: 4.7,
//       numRatings: 120,
//       numServings: 4,
//     },
//     {
//       recipeId: "3b2e98ab-2fc3-4459-a3a9-77a2e2b6f73c",
//       recipeTitle: "Spinach and Feta Omelette",
//       recipeDescription: "With tomatoes and feta cheese",
//       recipeLongIntro:
//         "This omelette combines fresh spinach, creamy feta, and ripe tomatoes for a fulfilling and nutritious breakfast.",
//       totalCost: 10.0,
//       prepTime: 5,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Eggs",
//           qtyNumber: 3,
//           qtyUnit: "",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Whisk eggs", "Add fillings", "Cook until set"],
//       recipeImageURL: "imageURLForOmelette",
//       recipeRating: 4.6,
//       numRatings: 100,
//       numServings: 1,
//     },
//     {
//       recipeId: "7e91a3d3-7691-4b15-97b7-5fa2f9f8b08c",
//       recipeTitle: "Classic French Toast",
//       recipeDescription: "With bread and eggs",
//       recipeLongIntro:
//         "This classic French toast recipe offers a decadent start to your day with its rich, vanilla-infused custard soaked bread, pan-fried to golden perfection.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 5,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 4,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Vanilla extract",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//         },
//       ],
//       recipeSteps: [
//         "Beat eggs with milk and vanilla",
//         "Soak bread",
//         "Cook on skillet",
//       ],
//       recipeImageURL: "imageURLForFrenchToast",
//       recipeRating: 4.9,
//       numRatings: 160,
//       numServings: 2,
//     },
//   ],
//   lunchRecipes: [
//     {
//       recipeId: "4bfb5e4e-cf4f-4a75-a55f-45c9b6c3db5d",
//       recipeTitle: "Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Enjoy a classic turkey sandwich packed with crisp lettuce and ripe tomatoes, ideal for a quick and satisfying meal.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 100,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.5,
//       numRatings: 80,
//       numServings: 1,
//     },
//     {
//       recipeId: "4f7b62ae-9189-4114-a2a2-5bde147f3fbe",
//       recipeTitle: "Double Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Double the turkey, double the flavour. This sandwich is a meat lover's dream, perfect for a filling lunch.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with double turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.7,
//       numRatings: 90,
//       numServings: 1,
//     },
//     {
//       recipeId: "8f5c921b-6831-47f0-b8f0-168a8433f59f",
//       recipeTitle: "Chicken Caesar Wrap",
//       recipeDescription: "With chicken breast and Caesar dressing",
//       recipeLongIntro:
//         "Savour the classic taste of Caesar salad mixed with grilled chicken strips, wrapped in a soft tortilla for a quick and satisfying lunch.",
//       totalCost: 12.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Chicken breast",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Romaine lettuce",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Parmesan cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Caesar dressing",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Tortilla wraps",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Grill chicken",
//         "Chop lettuce and mix with dressing",
//         "Assemble wrap",
//       ],
//       recipeImageURL: "imageURLForChickenWrap",
//       recipeRating: 4.6,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "c03f6b0e-ec4f-41aa-93fa-614838ec9b4a",
//       recipeTitle: "Quinoa Salad Bowl",
//       recipeDescription: "With quinoa and cucumber",
//       recipeLongIntro:
//         "This nutrient-packed quinoa salad bowl is filled with a variety of vegetables and a lemon vinaigrette, offering a light yet filling lunch.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Quinoa",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumber",
//           qtyNumber: 0.5,
//           qtyUnit: "sliced",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cherry tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook quinoa",
//         "Chop and mix vegetables",
//         "Toss with lemon juice",
//       ],
//       recipeImageURL: "imageURLForQuinoaSalad",
//       recipeRating: 4.7,
//       numRatings: 140,
//       numServings: 2,
//     },
//     {
//       recipeId: "a99c9d43-80a9-4d57-a740-18e50fa1e6ce",
//       recipeTitle: "Spicy Tofu Stir-Fry",
//       recipeDescription: "With tofu and bell peppers",
//       recipeLongIntro:
//         "Heat up your lunchtime with this spicy tofu stir-fry, featuring a colorful mix of bell peppers and a tangy sauce.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Tofu",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Chili flakes",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Press and cube tofu",
//         "Sauté vegetables",
//         "Add tofu and sauce",
//       ],
//       recipeImageURL: "imageURLForTofuStirFry",
//       recipeRating: 4.8,
//       numRatings: 110,
//       numServings: 2,
//     },
//     {
//       recipeId: "b99f8348-db51-4b9a-a693-21deef8a5f1b",
//       recipeTitle: "Mediterranean Pasta Salad",
//       recipeDescription: "With pasta and feta cheese",
//       recipeLongIntro:
//         "This refreshing Mediterranean pasta salad combines tangy feta, crisp cucumbers, and kalamata olives, dressed in a herby vinaigrette.",
//       totalCost: 9.0,
//       prepTime: 20,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Pasta",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumbers",
//           qtyNumber: 0.5,
//           qtyUnit: "chopped",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Kalamata olives",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook pasta",
//         "Chop veggies and mix",
//         "Toss everything with dressing",
//       ],
//       recipeImageURL: "imageURLForPastaSalad",
//       recipeRating: 4.5,
//       numRatings: 130,
//       numServings: 3,
//     },
//   ],
//   dinnerRecipes: [
//     {
//       recipeId: "df52488d-313f-4c76-812f-1915b7dbfd7f",
//       recipeTitle: "Grilled Salmon",
//       recipeDescription: "With salmon fillet and asparagus",
//       recipeLongIntro:
//         "This main course features succulent grilled salmon fillets, accompanied by lightly seasoned asparagus, ideal for a nutritious dinner.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season salmon",
//         "Grill on medium heat",
//         "Serve with asparagus",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.8,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "6d6fb9c8-85c8-4ff5-80e3-ea8b57b03490",
//       recipeTitle: "Smoked Salmon",
//       recipeDescription: "ith salmon fillet and fresh herbs",
//       recipeLongIntro:
//         "Enjoy the rich, smoky flavor of perfectly cooked salmon that melts in your mouth, paired with a side of crisp greens.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Prepare the salmon",
//         "Smoke until tender",
//         "Serve with a garnish of fresh herbs",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.9,
//       numRatings: 130,
//       numServings: 2,
//     },
//     {
//       recipeId: "ea320d44-ec90-4c97-b09d-daf6f5b04988",
//       recipeTitle: "Beef Stir-Fry",
//       recipeDescription: "With beef strips and onion",
//       recipeLongIntro:
//         "This beef stir-fry is quick to prepare and packed with flavors, featuring tender beef strips and fresh vegetables tossed in a rich soy sauce.",
//       totalCost: 20.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Beef strips",
//           qtyNumber: 300,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Onion",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 2,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Sauté garlic and onion",
//         "Add beef and cook until brown",
//         "Toss with vegetables and soy sauce",
//       ],
//       recipeImageURL: "imageURLForBeefStirFry",
//       recipeRating: 4.8,
//       numRatings: 180,
//       numServings: 3,
//     },
//     {
//       recipeId: "32cc34c1-a256-46a2-9b73-45fba8baf5cc",
//       recipeTitle: "Herb-Crusted Rack of Lamb",
//       recipeDescription: "With rack of lamb and rosemary",
//       recipeLongIntro:
//         "Indulge in this elegant dish of rack of lamb encrusted with rosemary, thyme, and garlic, roasted to bring out its succulent flavors.",
//       totalCost: 35.0,
//       prepTime: 20,
//       cookTime: 25,
//       recipeIngredients: [
//         {
//           product: "Rack of lamb",
//           qtyNumber: 1,
//           qtyUnit: "kg",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Rosemary",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Thyme",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 3,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Rub lamb with garlic and herbs",
//         "Roast in oven",
//         "Let rest before slicing",
//       ],
//       recipeImageURL: "imageURLForLamb",
//       recipeRating: 4.9,
//       numRatings: 150,
//       numServings: 4,
//     },
//     {
//       recipeId: "4a9c308f-8e0e-4d67-9f25-7c2d65a5b242",
//       recipeTitle: "Lemon Butter Fish",
//       recipeDescription: "With fish fillets and butter sauce",
//       recipeLongIntro:
//         "This simple yet delicious dish features tender fish fillets cooked in a zesty lemon butter sauce, perfect for a light dinner.",
//       totalCost: 18.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "White fish fillets",
//           qtyNumber: 4,
//           qtyUnit: "pieces",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Butter",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Parsley",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season fish",
//         "Pan-sear in butter",
//         "Finish with lemon juice and parsley",
//       ],
//       recipeImageURL: "imageURLForFish",
//       recipeRating: 4.8,
//       numRatings: 160,
//       numServings: 4,
//     },
//     {
//       recipeId: "9ac01dec-1d23-4e5d-9988-f2e0f803a4f7",
//       recipeTitle: "Vegetarian Lasagna",
//       recipeDescription: "With ricotta and seasonal vegetables",
//       recipeLongIntro:
//         "This hearty vegetarian lasagna is layered with creamy ricotta, a variety of seasonal vegetables, and topped with a rich tomato sauce.",
//       totalCost: 22.0,
//       prepTime: 30,
//       cookTime: 45,
//       recipeIngredients: [
//         {
//           product: "Lasagna noodles",
//           qtyNumber: 12,
//           qtyUnit: "sheets",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Ricotta cheese",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Zucchini",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Tomato sauce",
//           qtyNumber: 3,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook noodles",
//         "Layer with cheese and vegetables",
//         "Bake until golden",
//       ],
//       recipeImageURL: "imageURLForLasagna",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 6,
//     },
//   ],
// };
//
// export const dummyMealPlan3: FullRecipeCollection = {
//   breakfastRecipes: [
//     {
//       recipeId: "ae5c4f50-84d3-4fc4-8a7c-412473fc46d1",
//       recipeTitle: "Greek Yogurt with Nuts",
//       recipeDescription: "With Greek yogurt and mixed nuts",
//       recipeLongIntro:
//         "Start your day with a balanced meal of protein-rich Greek yogurt, complemented by the natural sweetness of honey and the crunch of mixed nuts.",
//       totalCost: 5.0,
//       prepTime: 5,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Greek yogurt",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Honey",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Mixed nuts",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
//       recipeImageURL: "imageURLForYogurt",
//       recipeRating: 4.5,
//       numRatings: 150,
//       numServings: 1,
//     },
//     {
//       recipeId: "128b8e24-f933-4e02-99d4-acec734cb740",
//       recipeTitle: "Banana Smoothie",
//       recipeDescription: "With bananas and almond milk",
//       recipeLongIntro:
//         "Blend up a quick, energizing banana smoothie using ripe bananas and creamy almond milk for a healthy start to your day.",
//       totalCost: 7.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bananas",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Almond milk",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Ice cubes",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: [
//         "Blend bananas",
//         "Add almond milk and ice",
//         "Blend until smooth",
//       ],
//       recipeImageURL: "imageURLForSmoothie",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 2,
//     },
//     {
//       recipeId: "6483ad39-120f-49b3-8e3e-7859b345a530",
//       recipeTitle: "Avocado Toast",
//       recipeDescription: "With avocado and poached eggs",
//       recipeLongIntro:
//         "This avocado toast offers a wholesome experience with creamy avocados and perfectly poached eggs atop freshly toasted bread.",
//       totalCost: 12.0,
//       prepTime: 15,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 2,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: ["Toast bread", "Mash avocado", "Top with poached eggs"],
//       recipeImageURL: "imageURLForAvocadoToast",
//       recipeRating: 4.8,
//       numRatings: 300,
//       numServings: 1,
//     },
//     {
//       recipeId: "c1d3a682-8bf1-4f1c-b9e7-e5d3b8756650",
//       recipeTitle: "Blueberry Pancakes",
//       recipeDescription: "With blueberries and all-purpose flour",
//       recipeLongIntro:
//         "Enjoy these light and fluffy pancakes bursting with fresh blueberries, perfect for a sweet start to your morning.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "All-purpose flour",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Blueberries",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 1.5,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Egg",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Mix ingredients",
//         "Fold in blueberries",
//         "Cook on griddle",
//       ],
//       recipeImageURL: "imageURLForPancakes",
//       recipeRating: 4.7,
//       numRatings: 120,
//       numServings: 4,
//     },
//     {
//       recipeId: "3b2e98ab-2fc3-4459-a3a9-77a2e2b6f73c",
//       recipeTitle: "Spinach and Feta Omelette",
//       recipeDescription: "With tomatoes and feta cheese",
//       recipeLongIntro:
//         "This omelette combines fresh spinach, creamy feta, and ripe tomatoes for a fulfilling and nutritious breakfast.",
//       totalCost: 10.0,
//       prepTime: 5,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Eggs",
//           qtyNumber: 3,
//           qtyUnit: "",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Whisk eggs", "Add fillings", "Cook until set"],
//       recipeImageURL: "imageURLForOmelette",
//       recipeRating: 4.6,
//       numRatings: 100,
//       numServings: 1,
//     },
//     {
//       recipeId: "7e91a3d3-7691-4b15-97b7-5fa2f9f8b08c",
//       recipeTitle: "Classic French Toast",
//       recipeDescription: "With bread and eggs",
//       recipeLongIntro:
//         "This classic French toast recipe offers a decadent start to your day with its rich, vanilla-infused custard soaked bread, pan-fried to golden perfection.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 5,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 4,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Vanilla extract",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//         },
//       ],
//       recipeSteps: [
//         "Beat eggs with milk and vanilla",
//         "Soak bread",
//         "Cook on skillet",
//       ],
//       recipeImageURL: "imageURLForFrenchToast",
//       recipeRating: 4.9,
//       numRatings: 160,
//       numServings: 2,
//     },
//   ],
//   lunchRecipes: [
//     {
//       recipeId: "4bfb5e4e-cf4f-4a75-a55f-45c9b6c3db5d",
//       recipeTitle: "Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Enjoy a classic turkey sandwich packed with crisp lettuce and ripe tomatoes, ideal for a quick and satisfying meal.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 100,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.5,
//       numRatings: 80,
//       numServings: 1,
//     },
//     {
//       recipeId: "4f7b62ae-9189-4114-a2a2-5bde147f3fbe",
//       recipeTitle: "Double Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Double the turkey, double the flavour. This sandwich is a meat lover's dream, perfect for a filling lunch.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with double turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.7,
//       numRatings: 90,
//       numServings: 1,
//     },
//     {
//       recipeId: "8f5c921b-6831-47f0-b8f0-168a8433f59f",
//       recipeTitle: "Chicken Caesar Wrap",
//       recipeDescription: "With chicken breast and Caesar dressing",
//       recipeLongIntro:
//         "Savour the classic taste of Caesar salad mixed with grilled chicken strips, wrapped in a soft tortilla for a quick and satisfying lunch.",
//       totalCost: 12.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Chicken breast",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Romaine lettuce",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Parmesan cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Caesar dressing",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Tortilla wraps",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Grill chicken",
//         "Chop lettuce and mix with dressing",
//         "Assemble wrap",
//       ],
//       recipeImageURL: "imageURLForChickenWrap",
//       recipeRating: 4.6,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "c03f6b0e-ec4f-41aa-93fa-614838ec9b4a",
//       recipeTitle: "Quinoa Salad Bowl",
//       recipeDescription: "With quinoa and cucumber",
//       recipeLongIntro:
//         "This nutrient-packed quinoa salad bowl is filled with a variety of vegetables and a lemon vinaigrette, offering a light yet filling lunch.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Quinoa",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumber",
//           qtyNumber: 0.5,
//           qtyUnit: "sliced",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cherry tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook quinoa",
//         "Chop and mix vegetables",
//         "Toss with lemon juice",
//       ],
//       recipeImageURL: "imageURLForQuinoaSalad",
//       recipeRating: 4.7,
//       numRatings: 140,
//       numServings: 2,
//     },
//     {
//       recipeId: "a99c9d43-80a9-4d57-a740-18e50fa1e6ce",
//       recipeTitle: "Spicy Tofu Stir-Fry",
//       recipeDescription: "With tofu and bell peppers",
//       recipeLongIntro:
//         "Heat up your lunchtime with this spicy tofu stir-fry, featuring a colorful mix of bell peppers and a tangy sauce.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Tofu",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Chili flakes",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Press and cube tofu",
//         "Sauté vegetables",
//         "Add tofu and sauce",
//       ],
//       recipeImageURL: "imageURLForTofuStirFry",
//       recipeRating: 4.8,
//       numRatings: 110,
//       numServings: 2,
//     },
//     {
//       recipeId: "b99f8348-db51-4b9a-a693-21deef8a5f1b",
//       recipeTitle: "Mediterranean Pasta Salad",
//       recipeDescription: "With pasta and feta cheese",
//       recipeLongIntro:
//         "This refreshing Mediterranean pasta salad combines tangy feta, crisp cucumbers, and kalamata olives, dressed in a herby vinaigrette.",
//       totalCost: 9.0,
//       prepTime: 20,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Pasta",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumbers",
//           qtyNumber: 0.5,
//           qtyUnit: "chopped",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Kalamata olives",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook pasta",
//         "Chop veggies and mix",
//         "Toss everything with dressing",
//       ],
//       recipeImageURL: "imageURLForPastaSalad",
//       recipeRating: 4.5,
//       numRatings: 130,
//       numServings: 3,
//     },
//   ],
//   dinnerRecipes: [
//     {
//       recipeId: "df52488d-313f-4c76-812f-1915b7dbfd7f",
//       recipeTitle: "Grilled Salmon",
//       recipeDescription: "With salmon fillet and asparagus",
//       recipeLongIntro:
//         "This main course features succulent grilled salmon fillets, accompanied by lightly seasoned asparagus, ideal for a nutritious dinner.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season salmon",
//         "Grill on medium heat",
//         "Serve with asparagus",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.8,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "6d6fb9c8-85c8-4ff5-80e3-ea8b57b03490",
//       recipeTitle: "Smoked Salmon",
//       recipeDescription: "ith salmon fillet and fresh herbs",
//       recipeLongIntro:
//         "Enjoy the rich, smoky flavor of perfectly cooked salmon that melts in your mouth, paired with a side of crisp greens.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Prepare the salmon",
//         "Smoke until tender",
//         "Serve with a garnish of fresh herbs",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.9,
//       numRatings: 130,
//       numServings: 2,
//     },
//     {
//       recipeId: "ea320d44-ec90-4c97-b09d-daf6f5b04988",
//       recipeTitle: "Beef Stir-Fry",
//       recipeDescription: "With beef strips and onion",
//       recipeLongIntro:
//         "This beef stir-fry is quick to prepare and packed with flavors, featuring tender beef strips and fresh vegetables tossed in a rich soy sauce.",
//       totalCost: 20.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Beef strips",
//           qtyNumber: 300,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Onion",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 2,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Sauté garlic and onion",
//         "Add beef and cook until brown",
//         "Toss with vegetables and soy sauce",
//       ],
//       recipeImageURL: "imageURLForBeefStirFry",
//       recipeRating: 4.8,
//       numRatings: 180,
//       numServings: 3,
//     },
//     {
//       recipeId: "32cc34c1-a256-46a2-9b73-45fba8baf5cc",
//       recipeTitle: "Herb-Crusted Rack of Lamb",
//       recipeDescription: "With rack of lamb and rosemary",
//       recipeLongIntro:
//         "Indulge in this elegant dish of rack of lamb encrusted with rosemary, thyme, and garlic, roasted to bring out its succulent flavors.",
//       totalCost: 35.0,
//       prepTime: 20,
//       cookTime: 25,
//       recipeIngredients: [
//         {
//           product: "Rack of lamb",
//           qtyNumber: 1,
//           qtyUnit: "kg",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Rosemary",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Thyme",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 3,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Rub lamb with garlic and herbs",
//         "Roast in oven",
//         "Let rest before slicing",
//       ],
//       recipeImageURL: "imageURLForLamb",
//       recipeRating: 4.9,
//       numRatings: 150,
//       numServings: 4,
//     },
//     {
//       recipeId: "4a9c308f-8e0e-4d67-9f25-7c2d65a5b242",
//       recipeTitle: "Lemon Butter Fish",
//       recipeDescription: "With fish fillets and butter sauce",
//       recipeLongIntro:
//         "This simple yet delicious dish features tender fish fillets cooked in a zesty lemon butter sauce, perfect for a light dinner.",
//       totalCost: 18.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "White fish fillets",
//           qtyNumber: 4,
//           qtyUnit: "pieces",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Butter",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Parsley",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season fish",
//         "Pan-sear in butter",
//         "Finish with lemon juice and parsley",
//       ],
//       recipeImageURL: "imageURLForFish",
//       recipeRating: 4.8,
//       numRatings: 160,
//       numServings: 4,
//     },
//     {
//       recipeId: "9ac01dec-1d23-4e5d-9988-f2e0f803a4f7",
//       recipeTitle: "Vegetarian Lasagna",
//       recipeDescription: "With ricotta and seasonal vegetables",
//       recipeLongIntro:
//         "This hearty vegetarian lasagna is layered with creamy ricotta, a variety of seasonal vegetables, and topped with a rich tomato sauce.",
//       totalCost: 22.0,
//       prepTime: 30,
//       cookTime: 45,
//       recipeIngredients: [
//         {
//           product: "Lasagna noodles",
//           qtyNumber: 12,
//           qtyUnit: "sheets",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Ricotta cheese",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Zucchini",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Tomato sauce",
//           qtyNumber: 3,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook noodles",
//         "Layer with cheese and vegetables",
//         "Bake until golden",
//       ],
//       recipeImageURL: "imageURLForLasagna",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 6,
//     },
//   ],
// };
//
// export const dummyMealPlan4: FullRecipeCollection = {
//   breakfastRecipes: [
//     {
//       recipeId: "ae5c4f50-84d3-4fc4-8a7c-412473fc46d1",
//       recipeTitle: "Greek Yogurt and Honey",
//       recipeDescription: "With Greek yogurt and mixed nuts",
//       recipeLongIntro:
//         "Start your day with a balanced meal of protein-rich Greek yogurt, complemented by the natural sweetness of honey and the crunch of mixed nuts.",
//       totalCost: 5.0,
//       prepTime: 5,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Greek yogurt",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Honey",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Mixed nuts",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Scoop yogurt", "Drizzle honey", "Top with nuts"],
//       recipeImageURL: "imageURLForYogurt",
//       recipeRating: 4.5,
//       numRatings: 150,
//       numServings: 1,
//     },
//     {
//       recipeId: "128b8e24-f933-4e02-99d4-acec734cb740",
//       recipeTitle: "Banana Smoothie",
//       recipeDescription: "With bananas and almond milk",
//       recipeLongIntro:
//         "Blend up a quick, energizing banana smoothie using ripe bananas and creamy almond milk for a healthy start to your day.",
//       totalCost: 7.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bananas",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Almond milk",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Ice cubes",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: [
//         "Blend bananas",
//         "Add almond milk and ice",
//         "Blend until smooth",
//       ],
//       recipeImageURL: "imageURLForSmoothie",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 2,
//     },
//     {
//       recipeId: "6483ad39-120f-49b3-8e3e-7859b345a530",
//       recipeTitle: "Avocado Toast",
//       recipeDescription: "With avocado and poached eggs",
//       recipeLongIntro:
//         "This avocado toast offers a wholesome experience with creamy avocados and perfectly poached eggs atop freshly toasted bread.",
//       totalCost: 12.0,
//       prepTime: 15,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 2,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: ["Toast bread", "Mash avocado", "Top with poached eggs"],
//       recipeImageURL: "imageURLForAvocadoToast",
//       recipeRating: 4.8,
//       numRatings: 300,
//       numServings: 1,
//     },
//     {
//       recipeId: "c1d3a682-8bf1-4f1c-b9e7-e5d3b8756650",
//       recipeTitle: "Blueberry Pancakes",
//       recipeDescription: "With blueberries and all-purpose flour",
//       recipeLongIntro:
//         "Enjoy these light and fluffy pancakes bursting with fresh blueberries, perfect for a sweet start to your morning.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "All-purpose flour",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Blueberries",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 1.5,
//           qtyUnit: "cups",
//         },
//         {
//           product: "Egg",
//           qtyNumber: 1,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Mix ingredients",
//         "Fold in blueberries",
//         "Cook on griddle",
//       ],
//       recipeImageURL: "imageURLForPancakes",
//       recipeRating: 4.7,
//       numRatings: 120,
//       numServings: 4,
//     },
//     {
//       recipeId: "3b2e98ab-2fc3-4459-a3a9-77a2e2b6f73c",
//       recipeTitle: "Spinach and Feta Omelette",
//       recipeDescription: "With tomatoes and feta cheese",
//       recipeLongIntro:
//         "This omelette combines fresh spinach, creamy feta, and ripe tomatoes for a fulfilling and nutritious breakfast.",
//       totalCost: 10.0,
//       prepTime: 5,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Eggs",
//           qtyNumber: 3,
//           qtyUnit: "",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//       ],
//       recipeSteps: ["Whisk eggs", "Add fillings", "Cook until set"],
//       recipeImageURL: "imageURLForOmelette",
//       recipeRating: 4.6,
//       numRatings: 100,
//       numServings: 1,
//     },
//     {
//       recipeId: "7e91a3d3-7691-4b15-97b7-5fa2f9f8b08c",
//       recipeTitle: "Classic French Toast",
//       recipeDescription: "With bread and eggs",
//       recipeLongIntro:
//         "This classic French toast recipe offers a decadent start to your day with its rich, vanilla-infused custard soaked bread, pan-fried to golden perfection.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 5,
//       recipeIngredients: [
//         {
//           product: "Bread",
//           qtyNumber: 4,
//           qtyUnit: "slices",
//         },
//         {
//           product: "Eggs",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Milk",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Vanilla extract",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//         },
//       ],
//       recipeSteps: [
//         "Beat eggs with milk and vanilla",
//         "Soak bread",
//         "Cook on skillet",
//       ],
//       recipeImageURL: "imageURLForFrenchToast",
//       recipeRating: 4.9,
//       numRatings: 160,
//       numServings: 2,
//     },
//   ],
//   lunchRecipes: [
//     {
//       recipeId: "4bfb5e4e-cf4f-4a75-a55f-45c9b6c3db5d",
//       recipeTitle: "Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Enjoy a classic turkey sandwich packed with crisp lettuce and ripe tomatoes, ideal for a quick and satisfying meal.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 100,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.5,
//       numRatings: 80,
//       numServings: 1,
//     },
//     {
//       recipeId: "4f7b62ae-9189-4114-a2a2-5bde147f3fbe",
//       recipeTitle: "Double Turkey Sandwich",
//       recipeDescription: "With turkey slices and fresh vegetables",
//       recipeLongIntro:
//         "Double the turkey, double the flavour. This sandwich is a meat lover's dream, perfect for a filling lunch.",
//       totalCost: 15.0,
//       prepTime: 10,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Bread slices",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//         {
//           product: "Turkey slices",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Lettuce",
//           qtyNumber: 1,
//           qtyUnit: "leaf",
//         },
//         {
//           product: "Tomato",
//           qtyNumber: 1,
//           qtyUnit: "sliced",
//         },
//       ],
//       recipeSteps: [
//         "Assemble the bread",
//         "Layer with double turkey and veggies",
//         "Add sauce",
//       ],
//       recipeImageURL: "imageURLForSandwich",
//       recipeRating: 4.7,
//       numRatings: 90,
//       numServings: 1,
//     },
//     {
//       recipeId: "8f5c921b-6831-47f0-b8f0-168a8433f59f",
//       recipeTitle: "Chicken Caesar Wrap",
//       recipeDescription: "With chicken breast and Caesar dressing",
//       recipeLongIntro:
//         "Savour the classic taste of Caesar salad mixed with grilled chicken strips, wrapped in a soft tortilla for a quick and satisfying lunch.",
//       totalCost: 12.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Chicken breast",
//           qtyNumber: 200,
//           qtyUnit: "g",
//         },
//         {
//           product: "Romaine lettuce",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Parmesan cheese",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//         },
//         {
//           product: "Caesar dressing",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//         },
//         {
//           product: "Tortilla wraps",
//           qtyNumber: 2,
//           qtyUnit: "",
//         },
//       ],
//       recipeSteps: [
//         "Grill chicken",
//         "Chop lettuce and mix with dressing",
//         "Assemble wrap",
//       ],
//       recipeImageURL: "imageURLForChickenWrap",
//       recipeRating: 4.6,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "c03f6b0e-ec4f-41aa-93fa-614838ec9b4a",
//       recipeTitle: "Quinoa Salad Bowl",
//       recipeDescription: "With quinoa and cucumber",
//       recipeLongIntro:
//         "This nutrient-packed quinoa salad bowl is filled with a variety of vegetables and a lemon vinaigrette, offering a light yet filling lunch.",
//       totalCost: 8.0,
//       prepTime: 15,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Quinoa",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumber",
//           qtyNumber: 0.5,
//           qtyUnit: "sliced",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cherry tomatoes",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Avocado",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook quinoa",
//         "Chop and mix vegetables",
//         "Toss with lemon juice",
//       ],
//       recipeImageURL: "imageURLForQuinoaSalad",
//       recipeRating: 4.7,
//       numRatings: 140,
//       numServings: 2,
//     },
//     {
//       recipeId: "a99c9d43-80a9-4d57-a740-18e50fa1e6ce",
//       recipeTitle: "Spicy Tofu Stir-Fry",
//       recipeDescription: "With tofu and bell peppers",
//       recipeLongIntro:
//         "Heat up your lunchtime with this spicy tofu stir-fry, featuring a colorful mix of bell peppers and a tangy sauce.",
//       totalCost: 10.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Tofu",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Chili flakes",
//           qtyNumber: 1,
//           qtyUnit: "tsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Press and cube tofu",
//         "Sauté vegetables",
//         "Add tofu and sauce",
//       ],
//       recipeImageURL: "imageURLForTofuStirFry",
//       recipeRating: 4.8,
//       numRatings: 110,
//       numServings: 2,
//     },
//     {
//       recipeId: "b99f8348-db51-4b9a-a693-21deef8a5f1b",
//       recipeTitle: "Mediterranean Pasta Salad",
//       recipeDescription: "With pasta and feta cheese",
//       recipeLongIntro:
//         "This refreshing Mediterranean pasta salad combines tangy feta, crisp cucumbers, and kalamata olives, dressed in a herby vinaigrette.",
//       totalCost: 9.0,
//       prepTime: 20,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "Pasta",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Feta cheese",
//           qtyNumber: 0.5,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Cucumbers",
//           qtyNumber: 0.5,
//           qtyUnit: "chopped",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Kalamata olives",
//           qtyNumber: 0.25,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook pasta",
//         "Chop veggies and mix",
//         "Toss everything with dressing",
//       ],
//       recipeImageURL: "imageURLForPastaSalad",
//       recipeRating: 4.5,
//       numRatings: 130,
//       numServings: 3,
//     },
//   ],
//   dinnerRecipes: [
//     {
//       recipeId: "df52488d-313f-4c76-812f-1915b7dbfd7f",
//       recipeTitle: "Grilled Salmon",
//       recipeDescription: "With salmon fillet and asparagus",
//       recipeLongIntro:
//         "This main course features succulent grilled salmon fillets, accompanied by lightly seasoned asparagus, ideal for a nutritious dinner.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season salmon",
//         "Grill on medium heat",
//         "Serve with asparagus",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.8,
//       numRatings: 120,
//       numServings: 2,
//     },
//     {
//       recipeId: "6d6fb9c8-85c8-4ff5-80e3-ea8b57b03490",
//       recipeTitle: "Smoked Salmon",
//       recipeDescription: "ith salmon fillet and fresh herbs",
//       recipeLongIntro:
//         "Enjoy the rich, smoky flavor of perfectly cooked salmon that melts in your mouth, paired with a side of crisp greens.",
//       totalCost: 25.0,
//       prepTime: 30,
//       cookTime: 0,
//       recipeIngredients: [
//         {
//           product: "Salmon fillet",
//           qtyNumber: 200,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Asparagus",
//           qtyNumber: 100,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Olive oil",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Prepare the salmon",
//         "Smoke until tender",
//         "Serve with a garnish of fresh herbs",
//       ],
//       recipeImageURL: "imageURLForSalmon",
//       recipeRating: 4.9,
//       numRatings: 130,
//       numServings: 2,
//     },
//     {
//       recipeId: "ea320d44-ec90-4c97-b09d-daf6f5b04988",
//       recipeTitle: "Beef Stir-Fry",
//       recipeDescription: "With beef strips and onion",
//       recipeLongIntro:
//         "This beef stir-fry is quick to prepare and packed with flavors, featuring tender beef strips and fresh vegetables tossed in a rich soy sauce.",
//       totalCost: 20.0,
//       prepTime: 10,
//       cookTime: 15,
//       recipeIngredients: [
//         {
//           product: "Beef strips",
//           qtyNumber: 300,
//           qtyUnit: "g",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Bell peppers",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Onion",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Soy sauce",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 2,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Sauté garlic and onion",
//         "Add beef and cook until brown",
//         "Toss with vegetables and soy sauce",
//       ],
//       recipeImageURL: "imageURLForBeefStirFry",
//       recipeRating: 4.8,
//       numRatings: 180,
//       numServings: 3,
//     },
//     {
//       recipeId: "32cc34c1-a256-46a2-9b73-45fba8baf5cc",
//       recipeTitle: "Herb-Crusted Rack of Lamb",
//       recipeDescription: "With rack of lamb and rosemary",
//       recipeLongIntro:
//         "Indulge in this elegant dish of rack of lamb encrusted with rosemary, thyme, and garlic, roasted to bring out its succulent flavors.",
//       totalCost: 35.0,
//       prepTime: 20,
//       cookTime: 25,
//       recipeIngredients: [
//         {
//           product: "Rack of lamb",
//           qtyNumber: 1,
//           qtyUnit: "kg",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Rosemary",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Thyme",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Garlic",
//           qtyNumber: 3,
//           qtyUnit: "cloves",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Rub lamb with garlic and herbs",
//         "Roast in oven",
//         "Let rest before slicing",
//       ],
//       recipeImageURL: "imageURLForLamb",
//       recipeRating: 4.9,
//       numRatings: 150,
//       numServings: 4,
//     },
//     {
//       recipeId: "4a9c308f-8e0e-4d67-9f25-7c2d65a5b242",
//       recipeTitle: "Lemon Butter Fish",
//       recipeDescription: "With fish fillets and butter sauce",
//       recipeLongIntro:
//         "This simple yet delicious dish features tender fish fillets cooked in a zesty lemon butter sauce, perfect for a light dinner.",
//       totalCost: 18.0,
//       prepTime: 10,
//       cookTime: 10,
//       recipeIngredients: [
//         {
//           product: "White fish fillets",
//           qtyNumber: 4,
//           qtyUnit: "pieces",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Butter",
//           qtyNumber: 3,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Lemon juice",
//           qtyNumber: 2,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Parsley",
//           qtyNumber: 1,
//           qtyUnit: "tbsp",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Season fish",
//         "Pan-sear in butter",
//         "Finish with lemon juice and parsley",
//       ],
//       recipeImageURL: "imageURLForFish",
//       recipeRating: 4.8,
//       numRatings: 160,
//       numServings: 4,
//     },
//     {
//       recipeId: "9ac01dec-1d23-4e5d-9988-f2e0f803a4f7",
//       recipeTitle: "Vegetarian Lasagna",
//       recipeDescription: "With ricotta and seasonal vegetables",
//       recipeLongIntro:
//         "This hearty vegetarian lasagna is layered with creamy ricotta, a variety of seasonal vegetables, and topped with a rich tomato sauce.",
//       totalCost: 22.0,
//       prepTime: 30,
//       cookTime: 45,
//       recipeIngredients: [
//         {
//           product: "Lasagna noodles",
//           qtyNumber: 12,
//           qtyUnit: "sheets",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Ricotta cheese",
//           qtyNumber: 2,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Spinach",
//           qtyNumber: 1,
//           qtyUnit: "cup",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Zucchini",
//           qtyNumber: 1,
//           qtyUnit: "",
//           productURL: "https://woolworths.com.au",
//         },
//         {
//           product: "Tomato sauce",
//           qtyNumber: 3,
//           qtyUnit: "cups",
//           productURL: "https://woolworths.com.au",
//         },
//       ],
//       recipeSteps: [
//         "Cook noodles",
//         "Layer with cheese and vegetables",
//         "Bake until golden",
//       ],
//       recipeImageURL: "imageURLForLasagna",
//       recipeRating: 4.7,
//       numRatings: 200,
//       numServings: 6,
//     },
//   ],
// };
