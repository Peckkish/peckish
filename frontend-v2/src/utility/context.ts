import { createContext } from "react";
import { Recipe } from "@/utility/types.ts";

export const RecipeCollectionContext = createContext<null | Recipe[]>(null);
