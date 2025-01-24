# East-End Coffee Shop
A feature-rich, full-stack website for a coffee shop that allows users to browse products, place orders, and make payments seamlessly. The project includes a **responsive frontend** built with **React, TypeScript, and Tailwind CSS**, and a robust **backend** powered by **Node.js, Express.js, and MongoDB**.

Additionally, an **AI-driven chatbot** was developed using **Python, PyTorch, and NLTK**, enabling users to place orders and resolve inquiries through natural language interactions. The chatbot integrates with the backend via a **Flask-based API**, employing advanced **NLP techniques** and **neural networks** to classify user intents, extract order details, and map them to the product database efficiently.

This project combines intuitive user experience, efficient backend systems, and cutting-edge AI to enhance customer interaction and streamline the ordering process.

# Installation
To begin, please follow the steps below for installing Npm and Node and setting up the server and database:
## Download Node and Npm
Download the latest version of Node from the official website.
[Download Here](https://nodejs.org/en)
## Install Npm 
Open the terminal and run the following command:
```
npm install
```
## Install Npm 
On the terminal run the following command:
```
npm install express --save
```
## Install React Router
For this project the router dependency needs to be installed. On the terminal run the following command:
```
npm install react-router-dom
```

## Additional Dependencies to install
If these dependencies are not installed on the machine, install them using these commands on terminal:

```
npm install axios bcrypt body-parser cors dotenv express fuse.js jsonwebtoken mongoose multer nodemon stripe validator
```

# Getting Started
Follow these steps to run the project locally:

**1. Clone the Repository:**
```
git clone https://github.com/labib08/East-End.git
```
**Open up three terminal windows, for frontend, backend and database**

## Frontend
Make sure you are in the frontend directory
```
cd East-End/Frontend
```
Run the frontend
```
npm start
```
## Backend for Web
Make sure you are in the backend directory
```
cd East-End/Backend
```
Run the backend
```
nodemon server.js
```
## Backend for Chatbot
Make sure you are in the backend directory of Chatbot

```
cd python_chatbot
python3 -m venv venv
. venv/bin/activate
```
Install dependencies

```
(venv) pip install Flask torch torchvision nltk
```
Install nltk package

```
(venv) python
>>> import nltk
>>> nltk.download('punkt')
```
Go to the app.py and press run

# Technologies Used
* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js, REST API
* **Database:** MongoDB
* **Machine Learning:** Python, PyTorch, NLTK
* **Chatbot:** Flask, Natural Language Processing (NLP), Doc2Vec, FastText
* **Other Libraries:** Fuzzy Matching for product extraction and mapping

# Features

**1. Responsive Frontend:**

User-friendly and visually appealing interface to browse products and make payments.
Fully responsive design for seamless usage across devices.

**2. Comprehensive Backend:**

REST API for user authentication, product management, and order processing.
Robust data handling for user, product, and order information using MongoDB.

**3. AI-Powered Chatbot:**

Handles customer inquiries and processes product orders directly via chat.
Utilizes PyTorch for intent classification and response generation.
NLP techniques, such as tokenization, stemming, and bag-of-words, for accurate text understanding.

**4. Order Processing:**

Extracts product names and quantities from user input using fuzzy matching logic.
Allows users to place orders directly through the chatbot.

**5. Performance Optimization:**

Hyperparameter tuning for machine learning models.
Robust parsing logic ensures smooth integration between chatbot and database.

**6. Streamlined Customer Experience:**

Simplifies the ordering process by enabling users to navigate and complete transactions through the chatbot.
