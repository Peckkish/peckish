import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Recipe } from "@/utility/types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { getFormattedPrice, getFormattedTime } from "@/utility/utils.ts";
import { useEffect, useState } from "react";
import { getImage } from "@/api/api.tsx";
import { ErrorResponse, PhotosWithTotalResults } from "pexels";

interface RecipePreviewTileProps {
  recipe: Recipe;
}

export default function RecipePreviewTile({ recipe }: RecipePreviewTileProps) {
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    !!recipe.recipeTitle &&
      getImage(recipe.recipeTitle).then((url) => setImageURL(url));
  }, []);

  return (
    <div
      onClick={() => (window.location.href = `/app/recipe/${recipe.recipeId}`)}
      className={"flex flex-col items-start gap-2 hover:cursor-pointer"}
    >
      <div className={"size-64 aspect-square overflow-hidden rounded-2xl"}>
        {!!imageURL ? (
          <img
            className={"min-h-full min-w-full object-cover"}
            src={imageURL}
            alt="Recipe preview"
          />
        ) : (
          <Skeleton className={"size-64"} />
        )}
      </div>

      <p className={"text-lg font-semibold"}>{recipe.recipeTitle}</p>
      <p
        className={"text-xs max-w-64 overflow-hidden text-ellipsis text-nowrap"}
      >
        {recipe.recipeDescription}
      </p>
      <div className={"flex flex-row justify-start gap-2 items-center"}>
        <Badge variant={"secondary"}>Easy</Badge>
        <Badge variant={"default"}>{getFormattedTime(recipe.timeTaken)}</Badge>
        <Badge variant={"destructive"}>
          {getFormattedPrice(recipe.totalCost)}
        </Badge>
      </div>
    </div>
  );
}
