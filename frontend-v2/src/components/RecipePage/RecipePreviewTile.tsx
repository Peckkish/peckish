import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Difficulty, Recipe } from "@/utility/types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { cn, getFormattedTime } from "@/utility/utils.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getImage } from "@/api/api.ts";
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
  showRemoveFromPlanButton?: boolean;
  setUserMealPlan?: Dispatch<SetStateAction<Recipe[]>>;
  className?: string;
}

export default function RecipePreviewTile({
  recipe,
  isSelected = false,
  setSelectedRecipeIds,
  hideTimeTaken = false,
  hideRecipePrice = false,
  hidePlanAddButton = false,
  showRemoveFromPlanButton = false,
  setUserMealPlan,
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

  const removeRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setUserMealPlan &&
      setUserMealPlan((prevMealPlan) =>
        prevMealPlan.filter(
          (mealPlanRecipe) => mealPlanRecipe.recipeId !== recipe.recipeId,
        ),
      );
  };

  useEffect(() => {
    !!recipe.recipeTitle &&
      getImage(recipe.recipeTitle).then((url) => setImageURL(url));
  }, []);

  const pricePerServing = (recipe.totalCost / recipe.numServings).toFixed(2);

  const randomDifficultyString: Difficulty =
    recipe.recipeTitle[0] < "J" ? "Easy" : "Medium";

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
          isSelected && "border-[#33E14D] border-4 p-2",
        )}
      >
        <div
          className={cn(
            "aspect-square overflow-hidden rounded-2xl shadow-md preview-image relative w-full bg-zinc-200",
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
            <Skeleton className="size-80" />
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
          <Badge
            variant={"secondary"}
            className={cn(
              randomDifficultyString === "Easy" && "bg-green-500",
              randomDifficultyString === "Medium" && "bg-orange-500",
              randomDifficultyString === "Challenging" && "bg-rose-500",
            )}
          >
            {randomDifficultyString}
          </Badge>
          {!hideTimeTaken && (
            <Badge variant={"default"}>
              {getFormattedTime(recipe.prepTime + recipe.cookTime)}
            </Badge>
          )}
          {!hidePlanAddButton && (
            <Button
              variant={isSelected ? "destructive" : "green"}
              onClick={handleToggleRecipeSelected}
              className={"ml-auto"}
            >
              <div className={"flex flex-row items-centerl gap-1"}>
                {isSelected ? (
                  <>
                    <MinusCircle weight={"bold"} size={"1.6em"} />
                    <p className={"font-bold mt-[0.175em]"}>Deselect</p>
                  </>
                ) : (
                  <>
                    <PlusCircle weight={"bold"} size={"1.6em"} />
                    <p className={"font-bold mt-[0.175em]"}>Select</p>
                  </>
                )}
              </div>
            </Button>
          )}
          {showRemoveFromPlanButton && (
            <Button
              variant={isSelected ? "destructive" : "green"}
              onClick={removeRecipe}
              className={"ml-auto"}
            >
              <div className={"flex flex-row items-center gap-1"}>X Remove</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
