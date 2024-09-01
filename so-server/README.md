# SO-Server

## Overview

**SO-Server** is the backend server component for a Stack Overflow clone code challenge. This server is responsible for handling requests related to user, question, answer and comment functionalities, and interaction with the database.

### Features:
- Read operations for Users, Questions, Answers and Comments
- Interaction with a SQLite database for persistent data storage

## Architecture

The application follows a simple, modular architecture:

1. **Node.js Server**: 
   - Built on Node.js in order to stick with a Javascript based stack.
   
2. **Express.js**:
   - The server uses Express.js as the web framework for routing and middleware configuration.
   
3. **SQLite Database**:
   - SQLite is used as the database, providing a lightweight, file-based storage solution without the need to run a database server.

## Running the Application

### Running the Application with Docker

It is recommended that this application be ran with Docker Compose, as a single command can start both the frontend and backend containers.

1. **Using Docker Compose**:
   - Using the `docker-compose.yml` file in the root directory (one up from this app directory), you can start the server and the frontend at the same time with:
     ```bash
     docker-compose up --build
     ```

Or, the container can be built on it's own:

1. **Build the Docker Image**:
   - Navigate to the `so-server` directory and build the Docker image:
     ```bash
     docker build -t so-server .
     ```

2. **Run the Docker Container**:
   - Start the container using the following command:
     ```bash
     docker run -p 3087:3087 so-server
     ```
   - The application will be accessible at `http://localhost:3087`.

### Running the Application Locally

**Prerequisites**

- **Node.js**: Ensure you have Node.js installed.
- **SQLite**: SQLite is included and does not require separate installation.

1. **Install Dependencies**:
   - Run the following command to install all necessary dependencies:
     ```bash
     npm install
     ```

2. **Start the Server**:
   - Use the following command to start the server:
     ```bash
     npm start
     ```
   - The server will be accessible at `http://localhost:3087`.

### API Endpoints

- **/users**: Handles user-related operations.
- **/questions**: CRUD operations for questions.
- **/answers**: CRUD operations for answers.
- **/comments**: CRUD operations for comments.
