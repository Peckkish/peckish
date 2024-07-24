import { useEffect, useState } from 'react'
import {
  cn,
  decimalToMixedFractionString,
  getFormattedTime,
  getRecipeObjectByIdOrNull,
  roundToNearestQuarter,
} from '@/utility/utils.ts'
import { Recipe } from '@/utility/types.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { DotLoader } from 'react-spinners'
import { Button } from '@/components/ui/button.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Bookmark } from 'lucide-react'
import { BowlFood, CaretLeft } from '@phosphor-icons/react'
import NutritionInfo from '@/components/RecipePage/NutritionInfo.tsx'
import { Toggle } from '@/components/ui/toggle.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import ServingsSelector from '@/components/RecipeSelectorPage/ServingsSelector.tsx'
import RatingDisplay from '@/components/shared/RatingDisplay.tsx'
import useScrollToTop from '@/hooks/useScrollToTop.ts'
import useDocumentTitle from '@/hooks/useDocumentTitle.ts'

interface RecipeDetailsPageProps {
  recipeCollection: Recipe[] | null
}

export default function RecipeDetailsPage({
  recipeCollection,
}: RecipeDetailsPageProps) {
  useScrollToTop()
  useDocumentTitle('Recipe | Peckish')

  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)
  const [numServings, setNumServings] = useState(1)
  const [fabricatedWaitRunning, setFabricatedWaitRunning] = useState(true)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if (recipeCollection) {
      const urlArr = window.location.href.split('/')
      console.log({ inLocal: localStorage.getItem('recipeCollection') })
      const recipeCollectionToSearch = !!localStorage.getItem(
        'recipeCollection',
      )
        ? JSON.parse(localStorage.getItem('recipeCollection')!)
        : recipeCollection
      const identifiedRecipe = getRecipeObjectByIdOrNull(
        recipeCollectionToSearch,
        id ?? urlArr[urlArr.length - 1],
      )
      !!identifiedRecipe && setActiveRecipe(identifiedRecipe!)
    }
  }, [recipeCollection, id])

  useEffect(() => {
    console.log({ activeRecipe })

    // activeRecipe &&
    //   getImage(activeRecipe.recipeTitle).then((url) => setImageURL(url));

    !!activeRecipe && setNumServings(activeRecipe.numServings)
  }, [activeRecipe])

  useEffect(() => {
    setTimeout(() => setFabricatedWaitRunning(false), 450)
  }, [])

  if (!activeRecipe || !activeRecipe.recipeTitle || fabricatedWaitRunning) {
    return (
      <div className={'flex justify-center items-center w-screen h-screen'}>
        <DotLoader />
      </div>
    )
  }

  const multiplierOnOriginalQty = numServings / activeRecipe.numServings

  return (
    <div
      className={
        'flex flex-col items-center py-24 sm:px-24 px-8 min-h-screen 2xl:max-w-[60%] mx-auto'
      }>
      <Button
        className={'w-fit absolute top-[85px] left-5'}
        size={'sm'}
        variant={'pale'}
        onClick={() => navigate(-1)}>
        <CaretLeft weight={'bold'} className={'mr-1.5'} />
        <span>Go Back</span>
      </Button>
      {/* TOP ROW */}
      <div
        className={cn(
          'flex justify-between gap-10 w-full',
          'max-[1200px]:flex-col flex-row',
        )}>
        {/* TOP ROW LEFT COLUMN */}
        <div className={'flex flex-col items-start'}>
          <div className={'flex flex-row items-center gap-2 my-4 flex-wrap'}>
            <Badge className={'bg-emerald-800'}>Top rated</Badge>
            <Badge className={'bg-zinc-800'}>
              {activeRecipe.BLD ?? 'Lunch'}
            </Badge>
            <Badge className={'bg-slate-800'}>
              {activeRecipe.recipeTitle.split(' ')[0]}
            </Badge>
            <Badge className={'bg-zinc-600'}>Mediterranean</Badge>
          </div>
          <h1 className={'text-6xl font-bold mt-4'}>
            {activeRecipe.recipeTitle}
          </h1>
          <p className={'text-lg font-base text-zinc-500 mb-1'}>
            {activeRecipe.recipeDescription}
          </p>
          <RatingDisplay
            recipeRating={activeRecipe.recipeRating}
            numRatings={activeRecipe.numRatings}
          />
          <div
            className={
              'mt-8 flex flex-row items-center gap-2.5 max-[850px]:mb-8'
            }>
            <Button>
              <Bookmark className={'mr-2'} size={20} />
              Save Recipe
            </Button>
            <Toggle variant={'outline'} className={'outline-1 outline'}>
              <BowlFood weight={'bold'} className={'mr-2'} size={20} />I made
              this!
            </Toggle>
          </div>
          <div
            className={cn(
              'flex flex-row justify-center items-center mt-auto -ml-4 max-[850px]:mb-8',
              'max-[850px]:mx-auto',
            )}>
            <div
              className={'flex flex-col items-center sm:p-6 p-2 sm:w-32 w-28'}>
              <p className={'font-semibold 2xl:text-xl sm:text-lg text-sm'}>
                Prep
              </p>
              <p className={'font-light mt-2 text-sm'}>
                {getFormattedTime(activeRecipe.prepTime)}
              </p>
            </div>
            <div
              className={
                'flex flex-col items-center sm:p-6 p-2 border-x-[1px] border-[#12b312]/20 sm:w-32 w-28'
              }>
              <p className={'font-semibold 2xl:text-xl sm:text-lg text-sm'}>
                Cook
              </p>
              <p className={'font-light mt-2 text-sm'}>
                {getFormattedTime(activeRecipe.cookTime)}
              </p>
            </div>
            <div
              className={'flex flex-col items-center sm:p-6 p-2 sm:w-32 w-28'}>
              <p className={'font-semibold 2xl:text-xl sm:text-lg text-sm'}>
                Difficulty
              </p>
              <p className={'font-light mt-2 text-sm'}>Easy</p>
            </div>
          </div>
          <NutritionInfo
            numServings={numServings}
            setNumServings={setNumServings}
          />
        </div>

        {/* TOP ROW RIGHT IMAGE COLUMN */}
        <div className={'flex flex-col'}>
          <div
            className={
              'size-[36rem] max-[1200px]:size-42 aspect-square overflow-hidden rounded-2xl'
            }>
            {!!activeRecipe.recipeImageURL ? (
              <img
                className={'min-h-full min-w-full object-cover'}
                src={activeRecipe.recipeImageURL}
                alt="Recipe preview"
              />
            ) : (
              <Skeleton className={'size-[36rem]'} />
            )}
            {/*<img*/}
            {/*  className={"min-h-full min-w-full object-cover"}*/}
            {/*  src={*/}
            {/*    "https://assets.epicurious.com/photos/5f68fb2caeadb5160e3feed7/1:1/w_1920,c_limit/RememberTheAlimony_HERO_091620_11797b_VOG_final.jpg"*/}
            {/*  }*/}
            {/*  alt="Recipe preview"*/}
            {/*/>*/}
          </div>
        </div>
      </div>

      <Separator className={'h-[1px] my-8 mx-8 '} />

      {/* DESCRIPTION ROW*/}
      {!!activeRecipe.recipeLongIntro && (
        <div className={'self-start mb-6 text-zinc-600'}>
          {activeRecipe.recipeLongIntro}
        </div>
      )}

      {/* INGREDIENTS AND METHOD ROW */}
      <div
        className={cn(
          'grid w-full mt-8 mb-8 gap-24',
          'max-[850px]:grid-cols-1 grid-cols-[6fr_7fr]',
        )}>
        <div className={'flex flex-col items-start'}>
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className={'text-4xl font-semibold'}>Ingredients</h2>
            <ServingsSelector
              setNumServings={setNumServings}
              numServings={numServings}
              className={'w-40'}
            />
          </div>
          <Separator className={'mb-5 mt-2.5 bg-[#12b312]/15'} />
          {/*>{`${decimalToMixedFractionString(roundToNearestQuarter(parseFractionString(ingredient.qtyNumber) * multiplierOnOriginalQty))} ${ingredient.qtyUnit} ${ingredient.product}`}</li>*/}
          {/*<ul className="flex flex-col list-disc ml-[1.5ch] gap-2 mt-4">*/}
          {/*  {activeRecipe.recipeIngredients.map((ingredient: any, index: number) => {*/}
          {/*    const qtyNumber = typeof ingredient.qtyNumber === 'string'*/}
          {/*      ? parseFractionString(ingredient.qtyNumber)*/}
          {/*      : ingredient.qtyNumber;*/}

          {/*    return (*/}
          {/*      <li key={index}>*/}
          {/*        {`${decimalToMixedFractionString(roundToNearestQuarter(qtyNumber * multiplierOnOriginalQty))} ${ingredient.qtyUnit} ${ingredient.product}`}*/}
          {/*      </li>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</ul>*/}
          <ul className="flex flex-col list-disc ml-[1.5ch] gap-3 mt-4">
            {activeRecipe.recipeIngredients.map(
              (ingredient: any, index: number) => {
                // const qtyNumber = !ingredient.qtyNumber
                //   ? 0
                //   : typeof ingredient.qtyNumber === "string"
                //     ? parseFractionString(ingredient.qtyNumber)
                //     : ingredient.qtyNumber;
                // const qtyNumber = 1;
                return (
                  <li key={index}>
                    {/*{`${decimalToMixedFractionString(roundToNearestQuarter(qtyNumber))} ${ingredient.qtyUnit} ${ingredient.product}`}*/}
                    {`${decimalToMixedFractionString(roundToNearestQuarter(ingredient.qtyNumber * multiplierOnOriginalQty))} ${ingredient.qtyUnit} ${ingredient.product}`}
                  </li>
                )
              },
            )}
          </ul>
        </div>
        <div className={'flex flex-col items-start'}>
          <h2 className={'text-4xl font-semibold'}>Method</h2>
          <Separator className={'mb-5 mt-2.5 bg-[#12b312]/15'} />
          <ol className={'flex flex-col list-decimal ml-[1.5ch] gap-3'}>
            {activeRecipe.recipeSteps.map((step, index) => {
              return (
                <li key={index}>
                  {step}
                  {index !== activeRecipe.recipeSteps.length - 1 && '.'}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
