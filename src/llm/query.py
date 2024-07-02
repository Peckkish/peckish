import os
from groq import Groq

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


def meal_plan_query(ingredients, user_input):
    groq_input = {"role": "user", "content": user_input}
    strategy = get_low_cost_strategy(ingredients)

    meal_plan = client.chat.completions.create(
        messages=[
            strategy,
            groq_input,
        ],
        model="llama3-8b-8192",
    )
    return meal_plan.choices[0].message


def get_low_cost_strategy(ingredient):
    prompt = "You are a meal planner, skilled in creating balanced and nutritious meals plans for the lowest cost possible. \n"
    prompt += "Given the following ingredients and their cost:\n"
    prompt += get_ingredients(ingredient)
    prompt += "Assuming common household items are available, give me a recipe that fulfills the following request, ignoring items that are costly:\n"
    return {
        "role": "system",
        "content": prompt
    }


def get_ingredients(ingredients):
    ingredients_str = ""
    for ingredient in ingredients:
        print(ingredient)
        ingredients_str += f"{ingredient.get('name')}, ${ingredient.get('cost')}\n"
    return ingredients_str
