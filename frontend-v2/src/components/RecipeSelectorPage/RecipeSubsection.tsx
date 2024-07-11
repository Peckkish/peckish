import RecipePreviewTile from "@/components/RecipeSelectorPage/RecipePreviewTile.tsx";
import { Recipe, SupermarketPreferences } from "@/utility/types.ts";
import { cn } from "@/utility/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Dispatch, SetStateAction } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RecipeSubsectionProps {
  headerIcon?: React.ReactNode;
  recipes: Recipe[];
  label: string;
  className?: string;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  supermarketPreferences: SupermarketPreferences;
}

export default function RecipeSubsection({
  headerIcon,
  recipes,
  label,
  className,
  selectedRecipeIds,
  setSelectedRecipeIds,
  supermarketPreferences,
}: RecipeSubsectionProps) {
  console.log({ recipes });

  let filteredRecipes = [...recipes];
  if (!supermarketPreferences.wooliesEnabled) {
    filteredRecipes = [...filteredRecipes].filter(
      (recipe) => recipe.supermarket !== "Woolies",
    );
  }
  if (!supermarketPreferences.colesEnabled) {
    filteredRecipes = [...filteredRecipes].filter(
      (recipe) => recipe.supermarket !== "Coles",
    );
  }

  if (label === "Breakfast")
    console.log({ filteredRecipesBreakfast: filteredRecipes });

  return (
    <div className={cn("mb-12 rounded-lg", className)}>
      <div className={"flex flex-row items-center gap-2"}>
        {headerIcon && headerIcon}
        <h1 className={"text-3xl font-semibold"}>{label}</h1>
      </div>
      <Separator className={"w-full h-[1px] mb-8 mt-3"} />
      <ScrollArea className={"side-scrolling-container max-w-[95vw]"}>
        {/*<div*/}
        {/*  className={cn(*/}
        {/*    "grid place-items-center gap-12",*/}
        {/*    "grid-cols-6 max-[2140px]:grid-cols-5 max-[1640px]:grid-cols-4 max-[1130px]:grid-cols-3 max-[950px]:grid-cols-2 max-[550px]:grid-cols-1",*/}
        {/*  )}*/}
        {/*>*/}
        <div
          className={
            "flex flex-row justify-start items-center gap-12 whitespace-nowrap pb-10 pr-16"
          }
        >
          {!!filteredRecipes && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div key={index}>
                <RecipePreviewTile
                  recipe={recipe}
                  isSelected={selectedRecipeIds.includes(recipe.recipeId)}
                  setSelectedRecipeIds={setSelectedRecipeIds}
                />
              </div>
            ))
          ) : (
            <p className={"font-light text-black text-sm"}>
              It looks like we couldn't find any {label.toLowerCase()} recipes
              that align with your preferences.
            </p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    // <ScrollArea>
    //   <div
    //     className={
    //       "h-96 w-[95vw] bg-red-500 flex flex-row gap-4 whitespace-nowrap"
    //     }
    //   >
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //     <div className={"size-64 bg-cyan-400 flex-shrink-0"}></div>
    //   </div>
    //   <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );
}
