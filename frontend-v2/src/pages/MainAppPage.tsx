import { List } from "@phosphor-icons/react";
import { cn, daysOfTheWeekArray } from "@/utility/utils.ts";
import OneFullDayMealPlan from "@/components/OneFullDayMealPlan.tsx";
import { useContext, useState } from "react";
import { DayOfWeek } from "@/utility/types.ts";
import { MealPlanContext } from "@/utility/context.ts";
import PrefenceSelectorBar from "@/components/PrefenceSelectorBar.tsx";

interface MainAppPageProps {}

export default function MainAppPage({}: MainAppPageProps) {
  const [activeDayOfWeek, setActiveDayOfWeek] = useState<DayOfWeek>("Monday");
  const mealPlan = useContext(MealPlanContext);

  return (
    <div className={"flex flex-col items-center mx-[5vw]"}>
      <div
        className={
          "w-screen h-[65px] bg-red-500 flex flex-row items-center px-8"
        }
      >
        <List size={20} />
      </div>
      <PrefenceSelectorBar />
      <div className={"w-[90vw] h-[65px] mx-auto bg-blue-500"}>
        <div className={"grid grid-cols-7"}>
          {daysOfTheWeekArray.map((day) => (
            <div
              key={day}
              onClick={() => setActiveDayOfWeek(day)}
              className={cn(
                "flex flex-row justify-center items-center h-[65px]",
                activeDayOfWeek === day ? "bg-cyan-300" : "bg-emerald-200",
                "hover:cursor-pointer opacity-90",
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <OneFullDayMealPlan
        mealPlan={mealPlan}
        activeDayOfWeek={activeDayOfWeek}
      />
    </div>
  );
}
