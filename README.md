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
