import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { cn } from "@/utility/utils.ts";

interface RatingDisplayProps {
  recipeRating: number;
  numRatings: number;
  small?: boolean;
}

export default function RatingDisplay({
  recipeRating,
  numRatings,
  small = false,
}: RatingDisplayProps) {
  const isHalfStar = recipeRating % 1 > 0;

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-0.5 mt-2 text-emerald-800",
        small && "text-xs",
      )}
    >
      {Array.from({ length: Math.floor(recipeRating) }, (_, index) => (
        <FaStar key={index}></FaStar>
      ))}
      {isHalfStar && <FaStarHalfAlt></FaStarHalfAlt>}
      {Array.from(
        {
          length: 5 - Math.floor(recipeRating) - (isHalfStar ? 1 : 0),
        },
        (_, index) => (
          <FaRegStar key={index}></FaRegStar>
        ),
      )}
      <p
        className={cn("ml-1.5 mt-[0.14rem] text-base", small && "text-sm")}
      >{`${recipeRating} (${numRatings})`}</p>
      {/*<a*/}
      {/*  href={"https://www.epicurious.com/"}*/}
      {/*  className={"ml-3 font-medium underline text-emerald-800"}*/}
      {/*>{`${numRatings} ratings`}</a>*/}
    </div>
  );
}
