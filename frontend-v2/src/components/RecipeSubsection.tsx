import RecipePreviewTile from "@/components/RecipePreviewTile.tsx";
import { Recipe } from "@/utility/types.ts";
import { cn } from "@/utility/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";

interface RecipeSubsectionProps {
  headerIcon?: React.ReactNode;
  recipes: Recipe[];
  label: string;
  className?: string;
}

export default function RecipeSubsection({
  headerIcon,
  recipes,
  label,
  className,
}: RecipeSubsectionProps) {
  return (
    <div className={cn("mb-12  px-12 pt-10 pb-16 rounded-lg", className)}>
      <div className={"flex flex-row items-center gap-2"}>
        {headerIcon && headerIcon}
        <h1 className={"text-4xl font-semibold"}>{label}</h1>
      </div>
      <Separator className={"w-full h-[1px] mb-8 mt-3 zinc-300"} />
      <div className={"flex flex-row items-center gap-10 flex-wrap"}>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <RecipePreviewTile recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
