import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.tsx";

interface AppHeaderProps {}

export default function AppHeader({}: AppHeaderProps) {
  return (
    <div
      className={
        "w-full shadow-md h-[65px] flex flex-row items-center px-8 bg-[#E3FFDC]"
      }
    >
      <List size={20} />
      <img
        className={"h-[65px] ml-8"}
        src="/assets/peckish_banner.png"
        alt=""
      />
      <Button variant={"green"} className={"ml-auto mr-[3vw]"}>
        Sign Up to Save Recipes
      </Button>
    </div>
  );
}
