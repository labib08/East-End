import os

from chat import get_response
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Chatbot API"

@app.route('/chat', methods=['POST'])
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 4000))
    app.run(host='0.0.0.0', port=port)