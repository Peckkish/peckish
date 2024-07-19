import {
  DayOfWeek,
  PortionSize,
  Recipe,
  ServingsInfo,
} from "@/utility/types.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  cn,
  daysOfWeek,
  updateMultiplierMapState,
  updateServingsMapState,
} from "@/utility/utils.ts";

interface MealPlanParametersFormProps {
  recipe: Recipe;
  className?: string;
  setRecipeIdToMultiplierMap: Dispatch<SetStateAction<Map<string, number>>>;
  setRecipeIdToServingsInfoMap: Dispatch<
    SetStateAction<Map<string, ServingsInfo>>
  >;
}

export default function MealPlanParametersForm({
  recipe,
  className,
  setRecipeIdToMultiplierMap,
  setRecipeIdToServingsInfoMap,
}: MealPlanParametersFormProps) {
  const [formData, setFormData] = useState<ServingsInfo>({
    portionSize: "Regular" as PortionSize,
    peopleServedPerMeal: 2,
    numberOfDays: 5,
    // startEatingOn: daysOfWeek[new Date().getDay() - (1 % 7)] as DayOfWeek,
    startEatingOn: "Monday",
  });

  const portionMultiplierMap: Map<string, number> = new Map([
    ["Regular", 1],
    ["Large", 1.5],
    ["XLarge", 2],
  ]);

  const getUpdatedQtyMultiplier = () => {
    return (
      formData.numberOfDays *
      formData.peopleServedPerMeal *
      portionMultiplierMap.get(formData.portionSize)!
    );
  };

  useEffect(() => {
    updateMultiplierMapState(
      recipe.recipeId,
      getUpdatedQtyMultiplier(),
      setRecipeIdToMultiplierMap,
    );

    updateServingsMapState(
      recipe.recipeId,
      { ...formData },
      setRecipeIdToServingsInfoMap,
    );
  }, [formData]);

  return (
    <div className={cn("flex flex-col items-start gap-1.5 w-full", className)}>
      <Select
        value={formData.peopleServedPerMeal.toString()}
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            peopleServedPerMeal: parseInt(value),
          }))
        }
      >
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={"Select number of people..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 2, 3, 4, 5].map((number) => (
              <SelectItem key={number.toString()} value={number.toString()}>
                {`Feeding ${number} People`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={formData.numberOfDays.toString()}
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            numberOfDays: parseInt(value),
          }))
        }
      >
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={"Select number of days..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <SelectItem key={day.toString()} value={day.toString()}>
                {day > 1 ? `Across ${day} Days` : "Just Once"}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={formData.startEatingOn}
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            startEatingOn: value as DayOfWeek,
          }))
        }
      >
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={"Select start day..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {daysOfWeek.map((day, index) => (
              <SelectItem key={index.toString()} value={day}>
                {formData.numberOfDays > 1 ? `Starting on ${day}` : `On ${day}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={formData.portionSize}
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            portionSize: value as PortionSize,
          }))
        }
      >
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={"Select portion size..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {["Regular", "Large", "XLarge"].map((portionSize) => (
              <SelectItem key={portionSize} value={portionSize}>
                {`${portionSize} Portions`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
