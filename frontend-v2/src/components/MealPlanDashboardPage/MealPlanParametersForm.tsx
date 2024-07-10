import { Recipe } from "@/utility/types.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { cn, daysOfWeek, updateMultiplierMapState } from "@/utility/utils.ts";

interface MealPlanParametersFormProps {
  recipe: Recipe;
  className?: string;
  setRecipeIdToMultiplierMap: Dispatch<SetStateAction<Map<string, number>>>;
}

export default function MealPlanParametersForm({
  recipe,
  className,
  setRecipeIdToMultiplierMap,
}: MealPlanParametersFormProps) {
  const [formData, setFormData] = useState({
    portionSize: "Standard",
    peopleServedPerMeal: 2,
    numberOfDays: 1,
    startEatingOn: daysOfWeek[new Date().getDay() - (1 % 7)],
  });

  const portionMultiplierMap: Map<string, number> = new Map([
    ["Standard", 1],
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
  }, [formData]);

  return (
    <div className={cn("flex flex-col items-start gap-1.5 w-full", className)}>
      <Select
        value={formData.portionSize}
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            portionSize: value,
          }))
        }
      >
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={"Select portion size..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {["Standard", "Large", "XLarge"].map((portionSize) => (
              <SelectItem key={portionSize} value={portionSize}>
                {`${portionSize} Portions`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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
                {`${number} People`}
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
                {`${day} Days`}
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
            startEatingOn: value,
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
                {day}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
