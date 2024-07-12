import AppHeader from "@/components/shared/AppHeader.tsx";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import UpdateMealPlanNameForm from "@/components/MealPlanDashboardPage/UpdateMealPlanNameForm.tsx";
import InteractiveMealPlan from "@/components/MealPlanDashboardPage/InteractiveMealPlan.tsx";
import {
  decimalToMixedFractionString,
  getRecipeObjectByIdOrNull,
  getTotalShoppingList,
  parseFractionString,
  roundToNearestQuarter,
  updateMultiplierMapState,
} from "@/utility/utils.ts";
import RecipePreviewTile from "@/components/RecipeSelectorPage/RecipePreviewTile.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import {
  DayOfWeek,
  IngredientItem,
  PortionSize,
  Recipe,
  ServingsInfo,
} from "@/utility/types.ts";
import { ShoppingCart, Trash } from "lucide-react";
import MealPlanParametersForm from "@/components/MealPlanDashboardPage/MealPlanParametersForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import useScrollToTop from "@/hooks/useScrollToTop.ts";

interface MealPlanDashboardPageProps {
  userMealPlan: Recipe[];
  setUserMealPlan: Dispatch<SetStateAction<Recipe[]>>;
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function MealPlanDashboardPage({
  userMealPlan,
  setUserMealPlan,
  setSelectedRecipeIds,
}: MealPlanDashboardPageProps) {
  useScrollToTop();
  const [api, setApi] = useState<CarouselApi>();

  const [mealPlanName, setMealPlanName] = useState("My First Meal Plan");
  const [totalShoppingList, setTotalShoppingList] = useState<IngredientItem[]>(
    [],
  );
  const [recipeIdToMultiplierMap, setRecipeIdToMultiplierMap] = useState<
    Map<string, number>
  >(new Map([]));
  const [recipeIdToServingsInfoMap, setRecipeIdToServingsInfoMap] = useState<
    Map<string, ServingsInfo>
  >(new Map([]));

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleOpenAll = () => {
    totalShoppingList.forEach((ingredientItem) => {
      window.open(ingredientItem.productURL, "_blank");
    });
  };

  useEffect(() => {
    userMealPlan &&
      setTotalShoppingList(
        getTotalShoppingList(userMealPlan, recipeIdToMultiplierMap),
      );
  }, [recipeIdToMultiplierMap]);

  useEffect(() => {
    // console.log(recipeIdToServingsInfoMap);
  }, [recipeIdToServingsInfoMap]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={"relative pb-12"}>
      <Button
        className={"w-fit absolute top-4 left-5"}
        onClick={() => navigate("/app")}
      >
        <CaretLeft weight={"bold"} className={"mr-2"} />
        <span>Go Back</span>
      </Button>
      <Button
        className={"w-fit absolute top-4 right-5"}
        variant={"destructive"}
        onClick={() => {
          localStorage.removeItem("userMealPlan");
          setUserMealPlan([]);
          navigate("/app");
        }}
      >
        <Trash className={"mr-2"} size={20} />
        <span>Delete Meal Plan</span>
      </Button>
      <div className={"flex flex-col items-center"}>
        <h1 className={"mt-16 text-6xl font-semibold"}>Meal Plan Dashboard</h1>
        <p className={"mt-1.5 mb-5 text-lg text-muted-foreground"}>
          Seamlessly view and edit your shopping list, recipes, and meal plan.
        </p>
        <div
          className={
            "flex flex-row items-center bg-[#E7F3E7] rounded-3xl px-4 py-1.5"
          }
        >
          <span className={"font-medium text-xl ml-1 mr-1.5 text-[#047A46]"}>
            {mealPlanName}
          </span>
          <UpdateMealPlanNameForm
            mealPlanName={mealPlanName}
            setMealPlanName={setMealPlanName}
          />
        </div>
      </div>

      {/* MAIN PAGE CONTENT - ROW */}
      <div
        className={"grid grid-cols-[2fr_3fr_6fr] gap-20 mt-10 xl:px-16 px-12"}
      >
        <div className={"flex flex-col"}>
          <h1 className={"font-semibold text-2xl"}>Shopping List</h1>
          <Separator className={"my-3 bg-[#12b312]/15"} />
          <Button variant={"green"} onClick={handleOpenAll}>
            <ShoppingCart size={18} />
            <span className={"ml-2"}>Open Shopping Links</span>
          </Button>
          <ScrollArea className={"pr-5 mt-6"}>
            <ScrollBar orientation={"vertical"} forceMount />
            <ul
              className={
                "list-disc mt-4 font-light flex flex-col gap-3 max-h-[40rem]"
              }
            >
              {totalShoppingList.map((ingredient, index) => {
                // const qtyNumber = ingredient.qtyNumber.parseFloat();
                // const qtyNumber = !ingredient.qtyNumber
                //   ? 0
                //   : typeof ingredient.qtyNumber === "string"
                //     ? parseFractionString(ingredient.qtyNumber)
                //     : ingredient.qtyNumber;
                // console.log(
                //   `The qty number of ${ingredient.product} is ${qtyNumber}`,
                // );
                return (
                  <li key={index} className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      id={`checkbox-${index}`}
                      defaultChecked={false}
                      onCheckedChange={(checked) => {
                        const ingredientText = document.getElementById(
                          `ingredient-text-${index}`,
                        );
                        if (checked) {
                          ingredientText.style.textDecoration = "line-through";
                          ingredientText.style.color = "grey";
                        } else {
                          ingredientText.style.textDecoration = "none";
                          ingredientText.style.color = "inherit";
                        }
                      }}
                    />
                    <a
                      id={`link-${index}`}
                      href={ingredient.productURL}
                      className="text-[#33E14D] brightness-75 font-medium"
                    >
                      <span id={`ingredient-text-${index}`}>
                        {/*{decimalToMixedFractionString(*/}
                        {/*  roundToNearestQuarter(ingredient.qtyNumber),*/}
                        {/*)}*/}
                        {`${decimalToMixedFractionString(roundToNearestQuarter(ingredient.qtyNumber))} ${ingredient.qtyUnit} ${ingredient.product}`}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
        <div className={"flex flex-col"}>
          <div className={"mb-8"}>
            <h1 className={"font-semibold text-2xl"}>Recipes</h1>
            <Separator className={"my-3 bg-[#12b312]/15"} />
            <div
              className={
                "flex flex-row justify-center items-center gap-3 mt-4 "
              }
            >
              {userMealPlan && (
                <div className={"flex flex-col"}>
                  <div className="pt-2 text-center text-sm text-muted-foreground">
                    {currentSlide} of {userMealPlan.length}
                  </div>
                  <Carousel
                    setApi={setApi}
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm -mt-4 shadow-lg rounded-lg"
                  >
                    <CarouselContent>
                      {userMealPlan.map((recipe, index) => (
                        <CarouselItem key={index} className="basis-full">
                          <div className="p-1">
                            <div>
                              <div className="flex flex-col items-center justify-center p-6 gap-5">
                                <RecipePreviewTile
                                  recipe={recipe}
                                  setSelectedRecipeIds={setSelectedRecipeIds}
                                  hidePlanAddButton
                                  showRemoveFromPlanButton
                                  setUserMealPlan={setUserMealPlan}
                                />
                                {/*<Separator*/}
                                {/*  className={"w-[75%] mx-auto my-5"}*/}
                                {/*/>*/}
                                <MealPlanParametersForm
                                  recipe={recipe}
                                  setRecipeIdToMultiplierMap={
                                    setRecipeIdToMultiplierMap
                                  }
                                  setRecipeIdToServingsInfoMap={
                                    setRecipeIdToServingsInfoMap
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                      {/*{Array.from({ length: 5 }).map((_, index) => (*/}
                      {/*  <CarouselItem*/}
                      {/*    key={index}*/}
                      {/*    className="md:basis-1/2 lg:basis-1/3"*/}
                      {/*  >*/}
                      {/*    <div className="p-1">*/}
                      {/*      <div>*/}
                      {/*        <div className="flex aspect-square items-center justify-center p-6">*/}
                      {/*          <span className="text-3xl font-semibold">*/}
                      {/*            {index + 1}*/}
                      {/*          </span>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*  </CarouselItem>*/}
                      {/*))}*/}
                    </CarouselContent>
                    <CarouselPrevious
                      className={"bg-[#E4F9BF] text-[#047A46]"}
                    />
                    <CarouselNext className={"bg-[#E4F9BF] text-[#047A46]"} />
                  </Carousel>
                </div>
              )}
            </div>
          </div>
        </div>
        <InteractiveMealPlan
          userMealPlan={userMealPlan}
          recipeIdToServingsInfoMap={recipeIdToServingsInfoMap}
        />
      </div>
    </div>
  );
}
