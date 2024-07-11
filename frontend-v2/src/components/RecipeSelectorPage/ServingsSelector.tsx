import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import { cn } from "@/utility/utils.ts";

interface ServingsSelectorProps {
  setNumServings: Dispatch<SetStateAction<number>>;
  numServings: number;
  className?: string;
}

export default function ServingsSelector({
  setNumServings,
  numServings,
  className,
}: ServingsSelectorProps) {
  const handleValueChange = (numServingsString: string) => {
    setNumServings(parseInt(numServingsString));
  };

  useEffect(() => {
    console.log(numServings);
  }, [numServings]);

  return (
    <Select
      value={numServings.toString()}
      onValueChange={handleValueChange}
      defaultValue={numServings.toString()}
    >
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder="1" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 Serving</SelectItem>
        <SelectItem value="2">2 Servings</SelectItem>
        <SelectItem value="3">3 Servings</SelectItem>
        <SelectItem value="4">4 Servings</SelectItem>
        <SelectItem value="5">5 Servings</SelectItem>
        <SelectItem value="6">6 Servings</SelectItem>
        <SelectItem value="7">7 Servings</SelectItem>
        <SelectItem value="8">8 Servings</SelectItem>
        <SelectItem value="8">9 Servings</SelectItem>
        <SelectItem value="10">10 Servings</SelectItem>
      </SelectContent>
    </Select>
  );
}
