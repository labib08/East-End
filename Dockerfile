# Stage 1: Build React Frontend
FROM node:16 AS frontend-builder
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# Stage 2: Set up Flask Backend
FROM python:3.9 AS flask-backend
WORKDIR /app/python_chatbot
COPY Python_Chatbot/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY Python_Chatbot/ ./

# Stage 3: Set up Node.js Backend
FROM node:16 AS node-backend
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ ./

# Stage 4: Combine and set up the final production image
FROM python:3.9

# Install Node.js and npm (needed for React and Node.js backend)
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy React build
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Copy Flask backend
COPY --from=flask-backend /app/python_chatbot ./python_chatbot

# Copy Node.js backend
COPY --from=node-backend /app/backend ./backend

# Install Supervisor to manage processes
RUN apt-get update && apt-get install -y supervisor \
    && rm -rf /var/lib/apt/lists/*
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports for Flask and Node.js
EXPOSE 4000 5000

# Combine health checks for Flask and Node.js
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:5000/health || curl -f http://localhost:4000/health || exit 1

# Start supervisor to run Flask and Node.js servers
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]