import { createClient, PhotosWithTotalResults } from "pexels";
import { dummyMealPlan } from "@/utility/utils.ts";
import { FullRecipeCollection } from "@/utility/types.ts";

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export async function getImage(searchQuery: string) {
  try {
    const query = searchQuery;
    const response = (await client.photos.search({
      query,
      per_page: 1,
    })) as PhotosWithTotalResults;
    console.log(response);
    return response.photos[0].src.large2x;
  } catch (error) {
    throw new Error("Failed to get image.");
  }
}

export async function getRecipeCollection(
  dietaryPreferences = {
    isHighProtein: false,
    isLowCarb: false,
    isVegetarian: false,
    isHalal: false,
  },
): Promise<FullRecipeCollection> {
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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyMealPlan);
    }, 800);
  });
}
