import { Toggle } from "@/components/ui/toggle.tsx";
import { Dispatch, SetStateAction } from "react";
import { SupermarketPreferences } from "@/utility/types.ts";
import { cn } from "@/utility/utils.ts";

interface SupermarketToggleProps {
  label: string;
  toggleProperty: keyof SupermarketPreferences;
  supermarketPreferences: SupermarketPreferences;
  setSupermarketPreferences: Dispatch<SetStateAction<SupermarketPreferences>>;
  iconComponent?: React.ReactNode;
  className?: string;
}

export default function SupermarketToggle({
  supermarketPreferences,
  label,
  toggleProperty,
  setSupermarketPreferences,
  iconComponent,
  className,
}: SupermarketToggleProps) {
  const handlePressedChange = () => {
    setSupermarketPreferences((prevPreferences) => ({
      ...prevPreferences,
      [toggleProperty]: !prevPreferences[toggleProperty],
    }));
  };
  return (
    <Toggle
      pressed={supermarketPreferences[toggleProperty]}
      variant="outline"
      className={cn(
        "h-10 w-36 rounded-2xl flex justify-center items-center hover:opacity-70",
        className,
      )}
      onClick={handlePressedChange}
      aria-label={`Toggle ${toggleProperty}`}
    >
      {iconComponent}
      <span>{label}</span>
    </Toggle>
  );
}
