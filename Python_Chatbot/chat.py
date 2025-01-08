import json
import random
import re

import requests
import torch
from fuzzywuzzy import process
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('Python_Chatbot/intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

qa_data = {
    "vanilla": "vanilla",
    "chocolate": "chocolate",
    "strawberry": "strawberry",
    "coffee": "coffee",
    "dessert": "dessert"
}

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

BACKEND_URL_CHATBOT = "http://localhost:5000/api/chatbot/orders"

BACKEND_URL_ORDERS = "http://localhost:5000/api/item/list"

name_id_dict = {}
name_mapping_dict ={}
def get_item_list():
    global name_mapping_dict
    global name_id_dict
    response = requests.get(BACKEND_URL_ORDERS)
    if response.status_code == 200:
        data = response.json().get('data', [])
        name_id_dict = {item['name'].lower(): item['_id'] for item in data if 'name' in item and '_id' in item}
        name_mapping_dict = {item['name'].lower(): item['name'].lower() for item in data if 'name' in item}
        print(name_mapping_dict)

    else:
        print("Failed to fetch data:", response.status_code)


def send_order_to_backend(orders):

    try:
        #print("Order here: ")
        #print(orders)
        response = requests.post(BACKEND_URL_CHATBOT, json={"orders": orders})
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error sending order to backend: {e}")
        return {"error": str(e)}

def find_items(item):
    #questions = list(qa_data.keys())
    get_item_list()
    item_name = list(name_mapping_dict.keys())
    matched_item, score = process.extractOne(item, item_name)

    if score > 70:
        answer = name_mapping_dict[matched_item]
        return answer
    else:
        return "Not available"
def parse_order(user_input):

    pattern = r"(\d+)\s*x?\s*([a-zA-Z\s]+)"

    matches = re.findall(pattern, user_input)

    order_matches = []
    for quantity, item_name in matches:
        order_tuple = (quantity, find_items(item_name))
        order_matches.append(order_tuple)
    if any(item_name.strip().lower() == 'not available' for _, item_name in order_matches):
        orders = ["Not available"]
    else:
        orders = [
            {"quantity": int(quantity), "item_name": item_name.strip().lower(), "item_id": name_id_dict[item_name.strip().lower()]}
            for quantity, item_name in order_matches
        ]

    return orders

order = False

def get_response(msg):
    global order
    if order:
        orders = parse_order(msg)
        if orders:
            if orders[0] == "Not available":
                return "One or more items is not available, please choose an item from the menu"
            #print("Chatbot: Here is what I understood from your order:")

            order_message = [f"{order['quantity']} x {order['item_name']}" for order in orders]
            order_messages = "\n".join(order_message)
            print(orders)
            backend_response = send_order_to_backend(orders)
            #print(f"Backend response: {backend_response}")
            return order_messages + ". Is that all?"

    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                if (intent['responses'][0]) == "Sure, what would you like to order?":
                    order = True
                return random.choice(intent['responses'])

    return "I do not understand..."



if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)

