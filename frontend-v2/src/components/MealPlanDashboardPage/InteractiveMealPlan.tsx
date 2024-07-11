import { Recipe, ServingsInfo } from "@/utility/types.ts";
import {
  cn,
  daysOfWeek,
  getDayOfWeekIndex,
  getRecipeObjectByIdOrNull,
} from "@/utility/utils.ts";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import { UserRound } from "lucide-react";

interface InteractiveMealPlanProps {
  userMealPlan: Recipe[];
  recipeIdToServingsInfoMap: Map<string, ServingsInfo>;
}

export default function InteractiveMealPlan({
  userMealPlan,
  recipeIdToServingsInfoMap,
}: InteractiveMealPlanProps) {
  const getRecipeInMealPlanById = (
    userMealPlan: Recipe[],
    recipeId: string,
  ) => {
    return userMealPlan.find((recipe) => recipe.recipeId === recipeId);
  };

  const [ganttBlockArray, setGanttBlockArray] = useState<
    {
      startCol: number;
      colSpan: number;
      numPeople: number;
      imageURL: string;
      servingSymbol: string;
    }[]
  >([]);

  useEffect(() => {
    console.log({ recipeIdToServingsInfoMap });
    let newGanttBlockArray: {
      startCol: number;
      colSpan: number;
      numPeople: number;
      imageURL: string;
      servingSymbol: string;
    }[] = [];
    for (const recipeId of recipeIdToServingsInfoMap.keys()) {
      const servingsInfo = recipeIdToServingsInfoMap.get(recipeId)!;

      // Day index informs startCol
      const dayIndex = getDayOfWeekIndex(servingsInfo.startEatingOn);

      // Number of days informs colSpan
      const numDays = servingsInfo.numberOfDays;

      const numPeople = servingsInfo.peopleServedPerMeal;

      const servingSymbol =
        servingsInfo.portionSize === "Regular"
          ? "Regular"
          : servingsInfo.portionSize === "Large"
            ? "L"
            : "XL";

      newGanttBlockArray = [
        ...newGanttBlockArray,
        {
          startCol: dayIndex + 1,
          colSpan: numDays,
          numPeople: numPeople,
          imageURL:
            "https://assets.epicurious.com/photos/5f68fb2caeadb5160e3feed7/1:1/w_1920,c_limit/RememberTheAlimony_HERO_091620_11797b_VOG_final.jpg",
          servingSymbol: servingSymbol,
        },
      ];
    }
    setGanttBlockArray(newGanttBlockArray);
  }, [recipeIdToServingsInfoMap]);

  useEffect(() => {
    console.log({ ganttBlockArray });
  }, [ganttBlockArray]);

  return (
    <div>
      <h1 className="font-bold text-2xl">Plan</h1>
      <Separator className={"mt-3 mb-7"} />
      <div className={"p-6 shadow-lg rounded-lg"}>
        <div
          className={"grid grid-cols-[repeat(7,1fr)] place-items-center mb-2"}
        >
          {daysOfWeek.map((day, index) => {
            return (
              <p className={"font-medium text-sm"} key={index}>
                {day.slice(0, 3)}
              </p>
            );
          })}
        </div>
        <div
          className="w-full bg-black relative border-[1px] border-[#d8f2dc] rounded-sm"
          style={{ height: `${ganttBlockArray.length * 5}rem` }}
        >
          {/* BLOCKS */}
          <div
            className="grid grid-cols-7 h-full z-20"
            style={{
              position: "absolute",
              inset: 0,
              gridTemplateAreas: '"stack"',
              gridTemplateRows: `repeat(${ganttBlockArray.length}, 1fr)`,
            }}
          >
            {ganttBlockArray.map((ganttBlock, index) => {
              return (
                <div
                  key={index}
                  style={{
                    gridColumn: `${ganttBlock.startCol} / ${ganttBlock.startCol + ganttBlock.colSpan}`,
                    gridRowStart: index + 1,
                    position: "relative",
                    // backgroundColor: `rgba(52, 224, 78, ${(85 - 15 * index + 1) / 100})`,
                    backgroundImage: `url("${ganttBlock.imageURL}")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "contain",
                  }}
                  className={
                    "rounded-lg flex justify-center items-center my-0.5 outline -outline-offset-[3px] outline-[#051407]"
                  }
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-md"></div>

                  <div
                    className={"z-20 flex flex-row items-center text-white "}
                  >
                    <p className={"font-medium text-2xl"}>
                      {ganttBlock.numPeople}
                    </p>
                    <UserRound fontWeight={"bold"} className={"mr-0.5"} />
                    <p className={"font-medium text-2xl"}>
                      {`· ${ganttBlock.servingSymbol}`}
                    </p>
                  </div>
                </div>
              );
            })}

            {/*{Array.from({ length: 21 }).map((_, index) => {*/}
            {/*  const isBlockedOut = Math.random() > 0.5;*/}
            {/*  return (*/}
            {/*    <div*/}
            {/*      key={index}*/}
            {/*      className={cn("border-4", isBlockedOut && "bg-red-500")}*/}
            {/*    ></div>*/}
            {/*  );*/}
            {/*})}*/}
          </div>

          {/* GRID LINES */}
          <div
            className="grid grid-cols-7 h-full z-10"
            style={{
              position: "absolute",
              inset: 0,
              gridTemplateAreas: '"stack"',
              gridTemplateRows: `repeat(${ganttBlockArray.length}, 1fr)`,
            }}
          >
            {Array.from({ length: 7 * ganttBlockArray.length }).map(
              (_, index) => (
                <div
                  key={index}
                  className="border-[1px] border-[#d8f2dc] bg-white"
                ></div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
