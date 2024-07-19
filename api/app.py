from flask import Flask, request, jsonify
from flask_cors import CORS
from llm import query
from db_query import db_query
import json

app = Flask(__name__)
CORS(app)


# @app.route('/')
# def hello():
#     return '<h1>Hello World!</h1>'
#
#
# @app.route('/meal-plan', methods=['POST'])
# def meal_plan():
#     user_input = request.json['user_input']
#     ingredients = db_query.get_items_JSON()
#     print("ingredients:", ingredients)
#     response = query.meal_plan_query(ingredients, user_input)
#     return json.dumps(response.content)


@app.route('/api/gfhp', methods=['GET'])
def gfhp():
    with open('gfhp.json', 'r') as file:
        json_arr = json.load(file)
    return json.dumps(json_arr)


@app.route('/api/vegan', methods=['GET'])
def vegan():
    with open('vegan.json', 'r') as file:
        json_arr = json.load(file)
    return json.dumps(json_arr)
  
@app.route('/meal-plan', methods=['POST'])
def meal_plan():
    user_input = request.json['user_input']
    ingredients = db_query.get_ingredients_JSON()
    if not ingredients:
        return jsonify({"error": "Failed to fetch ingredients"}), 500

    recipes = db_query.get_recipes_JSON()
    if not recipes:
        return jsonify({"error": "Failed to fetch recipes"}), 500

    response = query.meal_plan_query(ingredients, recipes, user_input)
    print(response)
    return json.dumps(response.content)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8081)
