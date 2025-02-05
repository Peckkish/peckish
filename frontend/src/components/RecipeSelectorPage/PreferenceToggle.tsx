import { Toggle } from '@/components/ui/toggle.tsx'
import { Dispatch, SetStateAction } from 'react'
import { DietaryPreferences } from '@/utility/types.ts'
import { cn } from '@/utility/utils.ts'

interface PreferenceToggleProps {
  label: string
  toggleProperty: keyof DietaryPreferences
  dietaryPreferences: DietaryPreferences
  setDietaryPreferences: Dispatch<SetStateAction<DietaryPreferences>>
  iconComponent?: React.ReactNode
  className?: string
}

export default function PreferenceToggle({
  dietaryPreferences,
  label,
  toggleProperty,
  setDietaryPreferences,
  iconComponent,
  className,
}: PreferenceToggleProps) {
  const handlePressedChange = () => {
    setDietaryPreferences(prevPreferences => ({
      ...prevPreferences,
      [toggleProperty]: !prevPreferences[toggleProperty],
    }))
  }
  return (
    <Toggle
      pressed={dietaryPreferences[toggleProperty]}
      variant="outline"
      size={'sm'}
      className={cn(
        'h-10 rounded-2xl flex justify-center items-center hover:opacity-70 text-nowrap px-3',
        'data-[state=off]:border-zinc-900 bg-[#f7f7f7] data-[state=off]:text-zinc-900',
        'max-[740px]:w-auto w-36',
        className,
      )}
      onClick={handlePressedChange}
      aria-label={`Toggle ${toggleProperty}`}>
      <div>{iconComponent}</div>
      <span className={'text-xs mx-auto font-semibold'}>{label}</span>
    </Toggle>
  )
}
