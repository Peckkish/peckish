import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Recipe } from "@/utility/types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { cn, getFormattedPrice, getFormattedTime } from "@/utility/utils.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getImage } from "@/api/api.tsx";
import "../../css/RecipeGallery.css";
import { Button } from "@/components/ui/button.tsx";

interface RecipePreviewTileProps {
  recipe: Recipe;
  isSelected: boolean;
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function RecipePreviewTile({
  recipe,
  isSelected,
  setSelectedRecipeIds,
}: RecipePreviewTileProps) {
  const [imageURL, setImageURL] = useState<string>("");

  const handleToggleRecipeSelected = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (isSelected) {
      setSelectedRecipeIds((prevRecipeIds) =>
        prevRecipeIds.filter((recipeId) => recipeId !== recipe.recipeId),
      );
    } else {
      setSelectedRecipeIds((prevRecipeIds) => [
        ...prevRecipeIds,
        recipe.recipeId,
      ]);
    }
  };

  useEffect(() => {
    !!recipe.recipeTitle &&
      getImage(recipe.recipeTitle).then((url) => setImageURL(url));
  }, []);

  return (
    <div
      onClick={() => (window.location.href = `/app/recipe/${recipe.recipeId}`)}
      className={"flex flex-col items-start gap-2 hover:cursor-pointer"}
    >
      <div
        className={cn(
          "transition-all",
          isSelected && "border-emerald-900 border-4 rounded-2xl p-2",
        )}
      >
        <div
          className={cn("aspect-square overflow-hidden rounded-2xl shadow-md")}
        >
          {!!imageURL ? (
            <img
              className={
                "min-h-full min-w-full object-cover rounded-2xl transition-all duration-200 ease-out hover:scale-110 -z-20"
              }
              src={imageURL}
              alt="Recipe preview"
            />
          ) : (
            <Skeleton className={"size-72"} />
          )}
        </div>
      </div>

      <p className={"2xl:text-lg text-base font-semibold"}>
        {recipe.recipeTitle}
      </p>
      <p
        className={"text-xs max-w-64 overflow-hidden text-ellipsis text-nowrap"}
      >
        {recipe.recipeDescription}
      </p>
      <div
        className={"flex flex-row justify-start gap-2 items-end -mt-2 w-full"}
      >
        <Badge variant={"secondary"}>Easy</Badge>
        <Badge variant={"default"}>
          {getFormattedTime(recipe.prepTime + recipe.cookTime)}
        </Badge>
        <Badge variant={"destructive"}>
          {getFormattedPrice(recipe.totalCost)}
        </Badge>
        <Button
          variant={isSelected ? "destructive" : "green"}
          onClick={handleToggleRecipeSelected}
          className={"ml-auto"}
        >
          {isSelected ? "Remove" : "Add to Plan"}
        </Button>
      </div>
    </div>
  );
}
