import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

interface UpdateMealPlanNameFormProps {
  mealPlanName: string;
  setMealPlanName: Dispatch<SetStateAction<string>>;
}

export default function UpdateMealPlanNameForm({
  mealPlanName,
  setMealPlanName,
}: UpdateMealPlanNameFormProps) {
  const [formData, setFormData] = useState({
    mealPlanName: mealPlanName,
  });
  const [formIsOpen, setFormIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormIsOpen(false);
    setMealPlanName(formData.mealPlanName);
  };

  return (
    <Sheet open={formIsOpen} onOpenChange={setFormIsOpen}>
      <SheetTrigger className={"standard-edit-delete-button"}>
        <Button
          asChild
          variant={"ghost"}
          size={"xs"}
          className={
            "standard-edit-delete-button flex-justify-center py-3 px-1.5 rounded-[50%] transition-all"
          }
        >
          <div
            className={
              "edit-delete-button-icon-container origin-center transition-all"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3 transition-all duration-200 ease-out"
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
          </div>
        </Button>
      </SheetTrigger>
      {/*<SheetContent className={cn(userPreferences.darkModeEnabled && "dark")}>*/}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Meal Plan Name</SheetTitle>
          <SheetDescription>
            Give your meal plan a distinctive name.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className={"grid grid-cols-4 items-center gap-5 relative"}>
            <Label htmlFor="mealPlanName" className={"text-right"}>
              Name
            </Label>
            <Input
              type="text"
              className={"col-span-3"}
              autoFocus
              onChange={handleChange}
              value={formData.mealPlanName}
              name="mealPlanName"
              id="mealPlanName"
              autoComplete={"off"}
              required
            />
          </div>

          <Button
            className={"mt-2 self-end"}
            type={"submit"}
            // variant={userPreferences.darkModeEnabled ? "secondary" : "default"}
          >
            Save Changes
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
