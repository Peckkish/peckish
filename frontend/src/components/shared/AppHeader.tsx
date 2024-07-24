import { List, Question, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button.tsx'
import { Toggle } from '@/components/ui/toggle.tsx'
import { useEffect, useState } from 'react'

interface AppHeaderProps {}

export default function AppHeader({}: AppHeaderProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth))
    return () =>
      window.removeEventListener('resize', () =>
        setInnerWidth(window.innerWidth),
      )
  }, [])

  return (
    <div
      className={
        'w-full border-b-[1px] h-[65px] flex flex-row items-center pl-8 bg-white'
      }>
      <List size={20} weight={'bold'} className={'hover:cursor-not-allowed'} />
      <img className={'h-[60px] '} src="/assets/peckish-logo-4.png" alt="" />
      <div
        className={
          'flex flex-row justify-center items-center ml-10 mr-auto gap-7'
        }>
        {innerWidth > 1000 && (
          <>
            <a className={'text-sm hover:cursor-not-allowed'} href="#">
              Recipes
            </a>
            <a className={'text-sm hover:cursor-not-allowed'} href="#">
              Explore
            </a>
            <a className={'text-sm hover:cursor-not-allowed'} href="#">
              Meal Plans
            </a>
            <a className={'text-sm hover:cursor-not-allowed'} href="#">
              Shop
            </a>
          </>
        )}
      </div>
      {innerWidth > 650 && (
        <Button variant={'pale'} className={'ml-auto hover:cursor-not-allowed'}>
          Sign Out
        </Button>
      )}
      <div className={'hover:cursor-not-allowed'}>
        <Toggle
          className={'ml-6 pointer-events-none max-[1000px]:mr-5'}
          aria-label="Toggle bold">
          <Sun size={24} weight={'bold'} />
        </Toggle>
      </div>
      {innerWidth > 650 && (
        <div className={'hover:cursor-not-allowed'}>
          <Toggle
            className={'mr-[4vw] pointer-events-none'}
            aria-label="Toggle bold">
            <Question size={24} weight={'bold'} />
          </Toggle>
        </div>
      )}
    </div>
  )
}
