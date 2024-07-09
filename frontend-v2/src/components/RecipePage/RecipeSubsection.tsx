import RecipePreviewTile from "@/components/RecipePage/RecipePreviewTile.tsx";
import { Recipe } from "@/utility/types.ts";
import { cn } from "@/utility/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Dispatch, SetStateAction } from "react";

interface RecipeSubsectionProps {
  headerIcon?: React.ReactNode;
  recipes: Recipe[];
  label: string;
  className?: string;
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function RecipeSubsection({
  headerIcon,
  recipes,
  label,
  className,
  selectedRecipeIds,
  setSelectedRecipeIds,
}: RecipeSubsectionProps) {
  return (
    <div className={cn("mb-12 rounded-lg", className)}>
      <div className={"flex flex-row items-center gap-2"}>
        {headerIcon && headerIcon}
        <h1 className={"text-4xl font-semibold"}>{label}</h1>
      </div>
      <Separator className={"w-full h-[1px] mb-8 mt-3"} />
      <div
        className={cn(
          "grid place-items-center gap-12",
          "grid-cols-6 max-[1880px]:grid-cols-5 max-[1640px]:grid-cols-4 max-[1130px]:grid-cols-3 max-[950px]:grid-cols-2 max-[550px]:grid-cols-1",
        )}
      >
        {recipes.map((recipe, index) => (
          <div key={index}>
            <RecipePreviewTile
              recipe={recipe}
              isSelected={selectedRecipeIds.includes(recipe.recipeId)}
              setSelectedRecipeIds={setSelectedRecipeIds}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
