import psycopg2
import os

class Item:
    def __init__(self, item_id, item_name, item_price, item_link):
        self.item_id = item_id
        self.item_name = item_name
        self.item_price = item_price
        self.item_link = item_link


def get_items_JSON():
    environmentHost = os.environ.get('dbHost')
    dbHost = environmentHost if environmentHost else 'localhost'
    conn = psycopg2.connect(
        dbname="postgres", user="postgres", password="postgres", host=dbHost, port="5432")
    curr = conn.cursor()

    curr.execute("SELECT * FROM ingredients;")

    rows = curr.fetchall()

    data = []

    for row in rows:
        data.append([row[0], row[1], float(row[2]), row[3]])
    # convert list of tuples to json

    curr.close()
    conn.close()

    ingredients_list = [
        {
            'item_id': item_id,
            'name': name,
            'cost': cost,
            'item_link': item_link
        }
        for item_id, name, cost, item_link in data
    ]

    return ingredients_list


get_items_JSON()
