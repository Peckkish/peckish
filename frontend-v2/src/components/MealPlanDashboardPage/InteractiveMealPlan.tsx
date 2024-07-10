import { Recipe, ServingsInfo } from "@/utility/types.ts";
import {
  cn,
  daysOfWeek,
  getDayOfWeekIndex,
  getRecipeObjectByIdOrNull,
} from "@/utility/utils.ts";
import { useEffect, useState } from "react";

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
    { startCol: number; colSpan: number }[]
  >([]);

  useEffect(() => {
    console.log({ recipeIdToServingsInfoMap });
    let newGanttBlockArray: { startCol: number; colSpan: number }[] = [];
    for (const recipeId of recipeIdToServingsInfoMap.keys()) {
      // Day index informs startCol
      const dayIndex = getDayOfWeekIndex(
        recipeIdToServingsInfoMap.get(recipeId)!.startEatingOn,
      );

      // Number of days informs colSpan
      const numDays = recipeIdToServingsInfoMap.get(recipeId)!.numberOfDays;

      newGanttBlockArray = [
        ...newGanttBlockArray,
        {
          startCol: dayIndex + 1,
          colSpan: numDays,
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
      <h1 className="font-bold text-2xl mb-3.5">Plan</h1>
      <div className={"flex flex-row justify-around mb-2"}>
        {daysOfWeek.map((day, index) => {
          return (
            <p className={"font-medium text-sm"} key={index}>
              {day}
            </p>
          );
        })}
      </div>
      <div
        className="w-full bg-black relative border-4 rounded-lg"
        style={{ height: `${ganttBlockArray.length * 8}rem` }}
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
                  backgroundColor: `rgba(52, 224, 78, ${(85 - 15 * index + 1) / 100})`,
                }}
                className={"rounded-xl"}
              ></div>
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
              <div key={index} className="border-4 bg-white"></div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
