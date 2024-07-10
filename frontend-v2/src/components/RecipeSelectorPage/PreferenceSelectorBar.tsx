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
    <div
      className={
        "flex flex-row w-full justify-around items-center mb-14 mt-10 gap-4"
      }
    >
      <div className={"flex flex-col items-center"}>
        <p>Dietary Preferences & Restrictions</p>
        <div
          className={"flex flex-row justify-between items-center gap-4 mt-4"}
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
            iconComponent={<Bread size={"24"} className={"mr-2"} />}
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
          <PreferenceToggle
            label={"Dairy-Free"}
            toggleProperty={"isDairyFree"}
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
            iconComponent={
              <Cow size={"24"} weight={"bold"} className={"mr-2"} />
            }
          />
          <PreferenceToggle
            label={"Vegan"}
            toggleProperty={"isVegan"}
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
            iconComponent={
              <Plant size={"24"} weight={"bold"} className={"mr-2"} />
            }
          />
        </div>
      </div>
      <div className={"flex flex-col items-center ml-24 mr-auto"}>
        <p>Supermarkets</p>
        <div
          className={"flex flex-row justify-between items-center gap-4 mt-4"}
        >
          <SupermarketToggle
            className={"data-[state=on]:bg-[#9ACA52]"}
            label={"Woolies"}
            toggleProperty={"wooliesEnabled"}
            supermarketPreferences={supermarketPreferences}
            setSupermarketPreferences={setSupermarketPreferences}
            iconComponent={
              <img
                src="/assets/woolies-black.png"
                alt=""
                className={"w-5 mr-2"}
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
                <img src="/assets/coles-red.png" alt="" className={"w-8"} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
