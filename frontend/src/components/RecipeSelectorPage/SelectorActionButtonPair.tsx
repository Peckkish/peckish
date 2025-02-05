import { Button } from '@/components/ui/button.tsx'
import { getRecipeCollection } from '@/api/api.ts'
import { Robot } from '@phosphor-icons/react'
import { Utensils } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction, useContext } from 'react'
import { DietaryPreferences, Recipe } from '@/utility/types.ts'
import { cn, getRecipeObjectByIdOrNull } from '@/utility/utils.ts'
import { RecipeCollectionContext } from '@/utility/context.ts'

interface SelectorActionButtonPairProps {
  setRecipeCollection: Dispatch<SetStateAction<Recipe[] | null>>
  dietaryPreferences: DietaryPreferences
  selectedRecipeIds: string[]
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>
  setUserMealPlan: Dispatch<SetStateAction<Recipe[]>>
  // setHasClickedGetRecipes: Dispatch<SetStateAction<boolean>>;
}

export default function SelectorActionButtonPair({
  setRecipeCollection,
  dietaryPreferences,
  selectedRecipeIds,
  setIsLoading,
  setSelectedRecipeIds,
  setUserMealPlan,
  // setHasClickedGetRecipes,
}: SelectorActionButtonPairProps) {
  const navigate = useNavigate()
  const recipeCollection = useContext(RecipeCollectionContext)
  // const { isFetching, data } = useGetRecipeCollection({
  //   dietaryPreferences,
  // });
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   setRecipeCollection(data);
  // }, [data]);

  return (
    <div
      className={cn(
        'right-4 bottom-4 flex flex-col items-end gap-4 z-20',
        'max-[740px]:static fixed',
        'max-[740px]:items-center max-[740px]:mt-6 max-[740px]:mb-20',
      )}>
      <Button
        className={
          'px-[1.5em] py-[1.25em] text-xl font-bold z-10 bg-zinc-900/95'
        }
        onClick={async () => {
          setIsLoading(true)
          // setHasClickedGetRecipes(true);
          setSelectedRecipeIds([])
          const fetchedRecipe = await getRecipeCollection(dietaryPreferences)
          setRecipeCollection(fetchedRecipe)
          setIsLoading(false)
          // await queryClient.invalidateQueries({
          //   queryKey: ["recipeCollection"],
          // });
          localStorage.setItem(
            'recipeCollection',
            JSON.stringify(recipeCollection),
          )
        }}>
        <Robot size={28} className={'mr-3'} />
        <span>Get Recipes</span>
      </Button>

      <Button
        variant={'green'}
        className={cn('px-[1.5em] py-[1.25em] text-xl font-bold z-10')}
        disabled={selectedRecipeIds.length < 2}
        onClick={() => {
          setSelectedRecipeIds([])
          setUserMealPlan(
            selectedRecipeIds.map(
              id => getRecipeObjectByIdOrNull(recipeCollection, id)!,
            ),
          )
          navigate('/app/plans/myMealPlan')
        }}>
        <Utensils size={26} className={'mr-3'} />
        <span>
          {selectedRecipeIds.length < 2
            ? 'Select More Recipes'
            : `Create Meal Plan (${selectedRecipeIds.length})`}
        </span>
      </Button>
    </div>
  )
}
