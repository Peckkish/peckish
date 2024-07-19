// import {
//   dummyMealPlan1,
//   dummyMealPlan2,
//   dummyMealPlan3,
//   dummyMealPlan4,
//   dummyMealPlan5,
//   dummyMealPlan6,
//   dummyMealPlan7,
// } from "@/utility/utils.ts";
import { Recipe } from "@/utility/types.ts";
// import axios from "axios";
import gfhp from "../../../gfhp.json";
import vegan from "../../../vegan.json";

// const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);
//
// export async function getImage(searchQuery: string) {
//   try {
//     const query = searchQuery;
//     const response = (await client.photos.search({
//       query,
//       per_page: 1,
//     })) as PhotosWithTotalResults;
//     // console.log(response);
//     return response.photos[0].src.large2x;
//   } catch (error) {
//     throw new Error("Failed to get image.");
//   }
// }

export async function getRecipeCollection(
  dietaryPreferences = {
    isHighProtein: false,
    isLowCarb: false,
    isVegetarian: false,
    isHalal: false,
    isGlutenFree: false,
    isKeto: false,
    isDairyFree: false,
    isVegan: false,
  },
): Promise<Recipe[]> {
  // const urlPath = dietaryPreferences.isVegan ? "/vegan" : "/gfhp";
  //
  // try {
  //   const response = await axios.get(`http://localhost:8081/api${urlPath}`);
  //   console.log(response.data);
  //   return response.data;
  // } catch (e) {
  //   console.error(e);
  //   return [];
  // }
  console.log(gfhp);
  console.log(vegan);

  return dietaryPreferences.isVegan
    ? ([...vegan] as Recipe[])
    : dietaryPreferences.isGlutenFree && dietaryPreferences.isHighProtein
      ? ([...gfhp] as Recipe[])
      : [];

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
  // // }
  //
  // if (!fetchEnabled) {
  //   return {
  //     breakfastRecipes: [],
  //     lunchRecipes: [],
  //     dinnerRecipes: [],
  //   };
  // }

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(
  //       [
  //         [
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan7,
  //         ],
  //         [
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan5,
  //         ],
  //         [
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan6,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan7,
  //           ...dummyMealPlan5,
  //           ...dummyMealPlan7,
  //         ],
  //       ][Math.floor(Math.random() * 3)],
  //     );
  //   }, 2200);
  // });
}
