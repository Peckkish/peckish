import { useEffect, useState } from "react";
import {
  cn,
  daysOfTheWeekArray,
  exampleWeekMealPlan,
} from "@/utility/utils.ts";
import { DayOfWeek, WeeklyMealPlanDay } from "@/utility/types.ts";
import { List } from "@phosphor-icons/react";
import OneFullDayMealPlan from "../../components/subcomponents/OneFullDayMealPlan.tsx";
import axios from "axios";

export default function App() {
  const [mealPlan, setMealPlan] = useState<null | WeeklyMealPlanDay[]>(null);
  const [activeDayOfWeek, setActiveDayOfWeek] = useState<DayOfWeek>("Monday");

  const handleGetMealPlan = async () => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_input: "Make me a meal plan with lots of protein.",
    //   }),
    // };
    //
    // try {
    //   const res = await fetch(
    //     "http://localhost:8081/meal-plan",
    //     requestOptions,
    //   );
    //   const text = await res.text(); // Read the response as text
    //
    //   console.log(text); // Log the response text
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      const response = await axios.post("http://localhost:8081/meal-plan", {
        user_input: "Give me a high protein, keto friendly meal plan.",
      });
      console.log(response.data);
      console.log(response.data[0]);
      setMealPlan(JSON.parse(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const response = await axios.get("http://localhost:8081/getStrategy", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    // setTimeout(() => {
    //   const exampleData = exampleWeekMealPlan;
    //   setMealPlan(exampleData);
    //   return exampleData;
    // }, 800);
  };

  useEffect(() => {
    handleGetMealPlan();
  }, []);

  return (
    <div className={"flex flex-col items-center mx-[5vw]"}>
      <div
        className={
          "w-screen h-[65px] bg-red-500 flex flex-row items-center px-8"
        }
      >
        <List size={20} />
      </div>
      <div
        className={
          "w-[90vw] h-[65px] mx-auto flex flex-row justify-around items-center bg-green-500"
        }
      >
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
        <div className={"w-28 h-10 bg-rose-500 rounded-xl"}></div>
      </div>
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
