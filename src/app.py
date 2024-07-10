from flask import Flask, request
from llm import query
from flask_cors import CORS
# from db_query import db_query
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


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8081)
