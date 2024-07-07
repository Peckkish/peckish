import { Toggle } from "@/components/ui/toggle.tsx";
import { Fish } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import { DietaryPreferences } from "@/utility/types.ts";

interface PreferenceToggleProps {
  label: string;
  toggleProperty: keyof DietaryPreferences;
  dietaryPreferences: DietaryPreferences;
  setDietaryPreferences: Dispatch<SetStateAction<DietaryPreferences>>;
  iconComponent?: React.ReactNode;
}

export default function PreferenceToggle({
  dietaryPreferences,
  label,
  toggleProperty,
  setDietaryPreferences,
  iconComponent,
}: PreferenceToggleProps) {
  const handlePressedChange = () => {
    setDietaryPreferences((prevPreferences) => ({
      ...prevPreferences,
      [toggleProperty]: !prevPreferences[toggleProperty],
    }));
  };
  return (
    <Toggle
      pressed={dietaryPreferences[toggleProperty]}
      variant="outline"
      className={"h-10 w-40 rounded-2xl flex justify-center items-center"}
      onClick={handlePressedChange}
      aria-label={`Toggle ${toggleProperty}`}
    >
      {iconComponent}
      {label}
    </Toggle>
  );
}
