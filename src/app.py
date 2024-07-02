from flask import Flask, request
from flask_cors import CORS
from llm import query
from src.db_query.db_query import get_items_JSON

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return '<h1>Hello World!</h1>'

@app.route('/meal-plan', methods=['POST'])
def meal_plan():
    user_input = request.json['user_input']
    ingredients = get_items_JSON()
    print("ingredients:", ingredients)
    response = query.meal_plan_query(ingredients, user_input)
    return response.content

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8081)
