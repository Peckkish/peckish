import pandas as pd
import os
from dotenv import load_dotenv
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain_groq.chat_models import ChatGroq
import time
# ignore not openssl warning
import warnings
from groq import Groq
warnings.filterwarnings("ignore")

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

typescript_types = '''
export interface IngredientItem {
  product: string;
  qtyNumber: number;
  qtyUnit: string;
  productURL: string;
}

export interface Recipe {
  BLD: string;
  recipeTitle: string;
  recipeId: string;
  recipeDescription: string;
  recipeLongIntro: string;
  totalCost: number;
  prepTime: number;
  cookTime: number;
  recipeIngredients: IngredientItem[];
  recipeSteps: string[];
  recipeImageURL: string;
  recipeRating: number;
  numRatings: number;
  numServings: number;
}

// Full data structure to receive from backend is of type FullRecipeCollection

export interface DietaryPreferences {
  isHighProtein: boolean;
  isLowCarb: boolean;
  isVegetarian: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;
  isKeto: boolean;
  isDairyFree: boolean;
  isVegan: boolean;
}
'''


example = '''
1 D'orsogna Ham Leg Triple Smoked 97% Fat Free Shaved 1kg
14	D'orsogna Triple Smoked Leg Ham 97% Fat Free Sliced From The Deli Per Kg
15	Perfect Italiano Extra Sharp Grated Parmesan 125g
16	Woolworths Rspca Approved Chicken Stirfry 500g
'''


def get_ingredients():

    df = pd.read_csv('updated_woolworths_specials.csv')
    df = df[df["isHighProtein"] == 1][["name", "link"]]
    return df.to_string(index=False)


def get_recipes():

    df = pd.read_csv("Recipes.csv")
    df = df[df["isHighProtein"] == 1]['title']
    return df.to_string(index=False)


prompt = "You are a JSON-generating kiosk, incapable of responding in English sentences. I will be giving you a "
"set of ingredients with their corresponding costs."
prompt += "Take EXCLUSIVELY the ingredients I provide, and create a nutritious recipe for beginner-to-average "
"home-cooks, for the lowest cost possible."
prompt += "You will give me EXCLUSIVELY the recipe, as an array of json objects and "
"nothing more or less."
prompt += "Specifically, you will respond in type Recipe, given these Typescript types: \n"
prompt += typescript_types
prompt += "You will give me NO introductory statements such as 'Here is your meal plan'. "
prompt += "recipeDescriptions will be in the format 'with key_ingredient_1 and key_ingredient_2', choosing those "
"key ingredients based on the recipe."
prompt += "These are the ingredients and each of their corresponding costs: \n"
prompt += get_ingredients()
prompt += "And here are the recipes you know: \n"
prompt += get_recipes()

strategy = {"role": "system", "content": prompt}


def meal_plan_query():

    meal_plan = client.chat.completions.create(
        messages=[
            strategy, {
                "role": "user", "content": "If ingredients you need for the recipe are not in the list, you can add them"}
        ],
        model="llama3-70b-8192",
    )
    return meal_plan.choices[0].message.content


print(meal_plan_query())
