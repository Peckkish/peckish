import PreferenceToggle from "@/components/PreferenceToggle.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DietaryPreferences } from "@/utility/types.ts";
import { Avocado, Fish, StarAndCrescent } from "@phosphor-icons/react";
import { Beef, Leaf, WheatOff } from "lucide-react";
import { TbBreadOff } from "react-icons/tb";

interface PreferenceSelectorBarProps {
  dietaryPreferences: DietaryPreferences;
  setDietaryPreferences: Dispatch<SetStateAction<DietaryPreferences>>;
}

export default function PreferenceSelectorBar({
  dietaryPreferences,
  setDietaryPreferences,
}: PreferenceSelectorBarProps) {
  return (
    <div
      className={"mx-auto flex flex-row justify-around items-center my-6 gap-4"}
    >
      <PreferenceToggle
        label={"High Protein"}
        toggleProperty={"isHighProtein"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={<Beef className={"mr-2"} />}
      />
      <PreferenceToggle
        label={"Low Carb"}
        toggleProperty={"isLowCarb"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={<TbBreadOff size={"24"} className={"mr-2"} />}
      />
      <PreferenceToggle
        label={"Vegetarian"}
        toggleProperty={"isVegetarian"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={<Leaf className={"mr-2"} />}
      />
      <PreferenceToggle
        label={"Gluten-Free"}
        toggleProperty={"isGlutenFree"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={<WheatOff className={"mr-2"} />}
      />
      <PreferenceToggle
        label={"Ketogenic"}
        toggleProperty={"isKeto"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={
          <Avocado size={"24"} weight={"bold"} className={"mr-2"} />
        }
      />
      <PreferenceToggle
        label={"Halal"}
        toggleProperty={"isHalal"}
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
        iconComponent={
          <StarAndCrescent size={"24"} weight={"bold"} className={"mr-2"} />
        }
      />
    </div>
  );
}
