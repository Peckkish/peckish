import PreferenceToggle from "@/components/RecipeSelectorPage/PreferenceToggle.tsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DietaryPreferences, SupermarketPreferences } from "@/utility/types.ts";
import {
  Avocado,
  Bread,
  Cow,
  Plant,
  StarAndCrescent,
} from "@phosphor-icons/react";
import { Beef, Leaf, WheatOff } from "lucide-react";
import SupermarketToggle from "@/components/RecipeSelectorPage/SupermarketToggle.tsx";
import { cn } from "@/utility/utils.ts";

interface PreferenceSelectorBarProps {
  dietaryPreferences: DietaryPreferences;
  setDietaryPreferences: Dispatch<SetStateAction<DietaryPreferences>>;
  supermarketPreferences: SupermarketPreferences;
  setSupermarketPreferences: Dispatch<SetStateAction<SupermarketPreferences>>;
}

export default function PreferenceSelectorBar({
  dietaryPreferences,
  setDietaryPreferences,
  supermarketPreferences,
  setSupermarketPreferences,
}: PreferenceSelectorBarProps) {
  useEffect(() => {
    console.log(supermarketPreferences);
  }, [supermarketPreferences]);
  return (
    <div className={"w-screen bg-[#33E14D]/20 py-8 px-[4vw] mb-16 mt-10"}>
      <div className={"flex flex-row w-full justify-around items-center gap-4"}>
        <div className={"flex flex-col items-center gap-0.5"}>
          <p className={"font-semibold text-xl"}>
            Dietary Restrictions/Preferences
          </p>
          <div className={"flex flex-row items-center gap-4 mt-4 flex-wrap"}>
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
              iconComponent={<Bread size={"22"} className={"mr-2"} />}
            />
            <PreferenceToggle
              label={"Low Fat"}
              toggleProperty={"isLowFat"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Plant size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"Vegetarian"}
              toggleProperty={"isVegetarian"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={<Leaf className={"mr-2"} size={"22"} />}
            />
            <PreferenceToggle
              label={"Gluten-Free"}
              toggleProperty={"isGlutenFree"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={<WheatOff className={"mr-2"} size={"22"} />}
            />
            <PreferenceToggle
              label={"Ketogenic"}
              toggleProperty={"isKeto"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Avocado size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"Halal"}
              toggleProperty={"isHalal"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <StarAndCrescent
                  size={"22"}
                  weight={"bold"}
                  className={"mr-2"}
                />
              }
            />
            <PreferenceToggle
              label={"Dairy-Free"}
              toggleProperty={"isDairyFree"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Cow size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"Low-FODMAP"}
              toggleProperty={"isLowFODMAP"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Plant size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"AIP Diet"}
              toggleProperty={"isAIP"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Plant size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"Low Calorie"}
              toggleProperty={"isLowCalorie"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Plant size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
            <PreferenceToggle
              label={"Vegan"}
              toggleProperty={"isVegan"}
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
              iconComponent={
                <Plant size={"22"} weight={"bold"} className={"mr-2"} />
              }
            />
          </div>
        </div>
        <div className={"flex flex-col items-center ml-22 mr-auto gap-0.5"}>
          <p className={"font-semibold text-xl"}>Supermarkets</p>
          <div
            className={"flex flex-row justify-between items-center gap-4 mt-4"}
          >
            <SupermarketToggle
              className={
                "data-[state=on]:bg-[#118032] data-[state=on]:text-white"
              }
              label={"Woolies"}
              toggleProperty={"wooliesEnabled"}
              supermarketPreferences={supermarketPreferences}
              setSupermarketPreferences={setSupermarketPreferences}
              iconComponent={
                <img
                  src="/assets/woolies-black.png"
                  alt=""
                  className={cn(
                    "w-5 mr-2 transition-all",
                    supermarketPreferences.wooliesEnabled && "invert",
                  )}
                />
              }
            />
            <SupermarketToggle
              className={
                "data-[state=on]:bg-[#E01923] data-[state=on]:text-white outline-[#E01923]"
              }
              label={"Coles"}
              toggleProperty={"colesEnabled"}
              supermarketPreferences={supermarketPreferences}
              setSupermarketPreferences={setSupermarketPreferences}
              iconComponent={
                <div className={"p-0.5 rounded-sm bg-[#f8f8f8] mr-2"}>
                  <img
                    src="/assets/coles-red.png"
                    alt=""
                    className={cn(
                      "w-8",
                      !supermarketPreferences.colesEnabled &&
                        "saturate-0 brightness-0",
                    )}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
