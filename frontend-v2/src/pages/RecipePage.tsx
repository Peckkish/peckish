import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getRecipeObjectByIdOrNull } from "@/utility/utils.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import { Recipe } from "@/utility/types.ts";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { Button } from "@/components/ui/button.tsx";
import { getImage } from "@/api/api.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { StarHalfIcon } from "lucide-react";
import { StarHalf } from "@phosphor-icons/react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RecipePageProps {}

export default function RecipePage({}: RecipePageProps) {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const { id } = useParams<{ id: string }>();
  const mealPlan = useContext(RecipeCollectionContext);

  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    activeRecipe &&
      getImage(activeRecipe.recipeTitle).then((url) => setImageURL(url));
  }, [activeRecipe]);

  useEffect(() => {
    mealPlan && id && setActiveRecipe(getRecipeObjectByIdOrNull(mealPlan, id));
  }, [mealPlan, id]);

  useEffect(() => {
    console.log(activeRecipe);
  }, [activeRecipe]);

  if (!activeRecipe || imageURL === "") {
    return (
      <div className={"flex justify-center items-center w-screen h-screen"}>
        <DotLoader />
      </div>
    );
  }

  const isHalfStar = activeRecipe.recipeRating % 1 > 0;

  return (
    <div
      className={
        "relative flex flex-row p-12 min-h-screen justify-center gap-24 pt-24"
      }
    >
      <Button
        className={"w-fit absolute top-4 left-4"}
        onClick={() => (window.location.href = "/app")}
      >
        Return to Dashboard
      </Button>
      <div className={"flex flex-col"}>
        <div className={"flex flex-row items-center gap-2 my-4"}>
          <Badge>Top rated</Badge>
          <Badge>Lunch</Badge>
          <Badge>Vegetarian</Badge>
          <Badge>Mediterranean</Badge>
        </div>
        <h1 className={"text-5xl font-extrabold"}>
          {activeRecipe.recipeTitle}
        </h1>
        <p className={"text-xl font-medium"}>
          {activeRecipe.recipeDescription}
        </p>
        <div className={"flex flex-row items-center gap-0.5 mt-2"}>
          {Array.from(
            { length: Math.floor(activeRecipe.recipeRating) },
            (_, index) => (
              <FaStar key={index}></FaStar>
            ),
          )}
          {isHalfStar && <FaStarHalfAlt></FaStarHalfAlt>}
          {Array.from(
            {
              length:
                5 -
                Math.floor(activeRecipe.recipeRating) -
                (isHalfStar ? 1 : 0),
            },
            (_, index) => (
              <FaRegStar key={index}></FaRegStar>
            ),
          )}
          <div className={"ml-1"}>{activeRecipe.recipeRating}</div>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <div
          className={"size-[36rem] aspect-square overflow-hidden rounded-2xl"}
        >
          {!!imageURL ? (
            <img
              className={"min-h-full min-w-full object-cover"}
              src={imageURL}
              alt="Recipe preview"
            />
          ) : (
            <Skeleton className={"size-[36rem]"} />
          )}
        </div>
      </div>
      {/*<h2 className={"text-2xl font-semibold"}>Ingredients</h2>*/}
      {/*<ul className={"list-disc ml-[1.5ch]"}>*/}
      {/*  {activeRecipe.recipeIngredients.map((ingredient, index) => {*/}
      {/*    return (*/}
      {/*      <li*/}
      {/*        key={index}*/}
      {/*      >{`${ingredient.qtyNumber} ${ingredient.qtyUnit} ${ingredient.product}`}</li>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ul>*/}
      {/*<h2 className={"text-2xl font-semibold mt-4"}>Steps</h2>*/}
      {/*<ol className={"list-decimal ml-[1.5ch]"}>*/}
      {/*  {activeRecipe.recipeSteps.map((step, index) => {*/}
      {/*    return <li key={index}>{step}</li>;*/}
      {/*  })}*/}
      {/*</ol>*/}
    </div>
  );
}
