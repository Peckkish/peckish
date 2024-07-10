import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Recipe } from "@/utility/types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { cn, getFormattedPrice, getFormattedTime } from "@/utility/utils.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getImage } from "@/api/api.tsx";
import "../../css/RecipeGallery.css";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import RatingDisplay from "@/components/shared/RatingDisplay.tsx";

interface RecipePreviewTileProps {
  recipe: Recipe;
  isSelected?: boolean;
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  hideTimeTaken?: boolean;
  hideRecipePrice?: boolean;
  hidePlanAddButton?: boolean;
  className?: string;
}

export default function RecipePreviewTile({
  recipe,
  isSelected = false,
  setSelectedRecipeIds,
  hideTimeTaken = false,
  hideRecipePrice = false,
  hidePlanAddButton = false,
  className,
}: RecipePreviewTileProps) {
  const [imageURL, setImageURL] = useState<string>("");
  const navigate = useNavigate();

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

  const pricePerServing = (recipe.totalCost / recipe.numServings).toFixed(2);

  const randomDifficultyString = ["Easy", "Medium"][Math.round(Math.random())];

  return (
    <div
      onClick={() => navigate(`/app/recipe/${recipe.recipeId}`)}
      className={cn(
        "flex flex-col items-start hover:cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "transition-all rounded-2xl",
          isSelected && "border-emerald-900 border-4 p-2",
        )}
      >
        <div
          className={cn(
            "aspect-square overflow-hidden rounded-2xl shadow-md preview-image",
          )}
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

      <div className={"mt-1 pl-2 w-full"}>
        <p className={"2xl:text-lg text-base font-semibold"}>
          {recipe.recipeTitle}
        </p>
        <p
          className={
            "text-xs max-w-64 overflow-hidden text-ellipsis text-nowrap -mb-1"
          }
        >
          {recipe.recipeDescription}
        </p>
        <RatingDisplay
          recipeRating={recipe.recipeRating}
          numRatings={recipe.numRatings}
          small
        />
        <div className={"mt-2 flex flex-row items-end gap-1"}>
          {!hideRecipePrice && (
            <>
              <p
                className={"text-2xl font-semibold"}
              >{`$${pricePerServing}`}</p>
              <p className={"text-xs text-zinc-600 mb-1"}>per serving</p>
            </>
          )}
        </div>
        <div className={"flex flex-row justify-start gap-2 items-end w-full"}>
          <Badge variant={"secondary"}>{randomDifficultyString}</Badge>
          {!hideTimeTaken && (
            <Badge variant={"default"}>
              {getFormattedTime(recipe.prepTime + recipe.cookTime)}
            </Badge>
          )}
          {!hidePlanAddButton && (
            <Button
              variant={isSelected ? "destructive" : "green"}
              onClick={handleToggleRecipeSelected}
              className={"ml-auto px-2 rounded-[50%]"}
            >
              {isSelected ? (
                <MinusCircle weight={"bold"} size={20} />
              ) : (
                <PlusCircle weight={"bold"} size={20} />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
