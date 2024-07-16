import { useQuery } from "@tanstack/react-query";
import { getRecipeCollection } from "@/api/api.ts";
import { DietaryPreferences } from "@/utility/types.ts";

interface useGetRecipeCollectionProps {
  dietaryPreferences: DietaryPreferences;
}

export default function useGetRecipeCollection({
  dietaryPreferences,
}: useGetRecipeCollectionProps) {
  console.log("use query running");
  const { isFetching, data } = useQuery({
    queryKey: ["recipeCollection"],
    queryFn: () => getRecipeCollection(dietaryPreferences),
    initialData: !!localStorage.getItem("recipeCollection")
      ? JSON.parse(localStorage.getItem("recipeCollection")!)
      : {
          breakfastRecipes: [],
          lunchRecipes: [],
          dinnerRecipes: [],
        },
  });
  return { isFetching, data };
}
