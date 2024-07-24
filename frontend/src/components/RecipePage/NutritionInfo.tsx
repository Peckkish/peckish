import { Dispatch, SetStateAction } from 'react'
import ServingsSelector from '@/components/RecipeSelectorPage/ServingsSelector.tsx'
import { cn } from '@/utility/utils.ts'

interface NutritionInfoProps {
  setNumServings: Dispatch<SetStateAction<number>>
  numServings: number
}

export default function NutritionInfo({
  setNumServings,
  numServings,
}: NutritionInfoProps) {
  return (
    <div
      className={'flex flex-col items-start mt-auto gap-3 max-[850px]:mx-auto'}>
      <div
        className={cn(
          'grid 2xl:min-w-[35vw] min-w-[40vw] gap-3',
          'max-[850px]:grid-cols-1 grid-cols-6',
        )}>
        <p className={'font-bold text-xl mt-1 mr-1 col-span-2'}>Nutrition</p>
        <ServingsSelector
          setNumServings={setNumServings}
          numServings={numServings}
          className={cn('col-span-2 col-start-5')}
        />
      </div>
      <div
        className={cn(
          '2xl:min-w-[35vw] sm:min-w-[40vw] max-[850px]:w-[85vw] min-h-24 gap-3',
          'flex-col gap-4 grid',
        )}
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(80px, 100%), 1fr))',
        }}>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Energy</p>
          <p className={'font-light mt-2 text-sm'}>501cal</p>
          <p className={'font-light text-sm'}>(2012kj)</p>
        </div>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Protein</p>
          <p className={'font-light mt-2 text-sm'}>38.4g</p>
        </div>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Fat</p>
          <p className={'font-light mt-2 text-sm'}>15.3g</p>
        </div>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Carbs</p>
          <p className={'font-light mt-2 text-sm'}>56.3g</p>
        </div>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Fibre</p>
          <p className={'font-light mt-2 text-sm'}>3g</p>
        </div>
        <div
          className={
            'flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 py-3 rounded-lg'
          }>
          <p className={'font-medium text-md'}>Salt</p>
          <p className={'font-light mt-2 text-sm'}>400mg</p>
        </div>
      </div>
    </div>
  )
}
