import { createContext } from "react";
import { FullRecipeCollection } from "@/utility/types.ts";

export const RecipeCollectionContext =
  createContext<null | FullRecipeCollection>(null);
