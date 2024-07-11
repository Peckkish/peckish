import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.tsx";

interface AppHeaderProps {}

export default function AppHeader({}: AppHeaderProps) {
  return (
    <div
      className={
        "w-full shadow-md h-[65px] flex flex-row items-center pl-8 bg-white"
      }
    >
      <List size={20} />
      <img
        className={"h-[65px] ml-5"}
        src="/assets/peckish-logo-2.png"
        alt=""
      />
      <Button variant={"green"} className={"ml-auto mr-[4vw]"}>
        Sign Up to Save Recipes
      </Button>
    </div>
  );
}
