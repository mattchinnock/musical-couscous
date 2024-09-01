# Stack Overflow Clone

## Overview

**Stack Overflow Clone** is a frontend web application built with modern web technologies like TypeScript and Vite. This application serves as the user interface for a clone of the popular Q&A platform, Stack Overflow. It allows users to view questions and answers, and see their profile.

## Architecture

The application is structured as follows:

1. **Vite**:
   - Vite is used as the build tool and development server, providing fast builds and hot module replacement.

2. **TypeScript**:
   - The application is written in TypeScript, ensuring type safety and improved developer experience.

3. **React**:
   - The user interface is built using React, in align with Sayari's stack.

4. **Redux**:
   - Although overkill for the simplicity of the task, the application uses Redux Toolkit for state management, I've used Redux before but wanted to try out something new to me in Toolkit.

## Project Structure

- **`src/`**: Application source.
- **`public/`**: Public assets like images and the `index.html` file.
- **`public/src/components`**: modular components for answers, comments, questions, users etc.
- **`public/src/hooks`**: interact with the redux store.
- **`public/src/pages`**: templates for site pages.
- **`public/src/store/selectors`**: for extracting pieces of the store state.
- **`public/src/store/slices`**: combines reducer and action logic.
- **`public/src/types`**: defines data model for type checking.
- **`vite.config.ts`**: Configuration file for Vite.
- **`tsconfig.json`**: TypeScript configuration file.
- **`eslint.config.js`**: Configuration file for ESLint.

## Running the Application

### Running the Application with Docker

It is recommended that this application be ran with Docker Compose, as a single command can start both the frontend and backend containers.

1. **Using Docker Compose**:
   - Using the `docker-compose.yml` file in the root directory (one above this app directory), you can start the application with:
     ```bash
     docker-compose up --build
     ```

Or, the container can be built on it's own:

**Prerequisites**

- **Node.js**: Ensure you have Node.js installed.

1. **Build the Docker Image**:
   - Navigate to the `stack-overflow-clone` directory and build the Docker image:
     ```bash
     docker build -t stack-overflow-clone .
     ```

2. **Run the Docker Container**:
   - Start the container using the following command:
     ```bash
     docker run -p 8087:80 stack-overflow-clone
     ```
   - The application will be accessible at `http://localhost:8087`.

### Running the Application Locally

1. **Install Dependencies**:
   - Run the following command to install all necessary dependencies:
     ```bash
     npm install
     ```

2. **Start the Development Server**:
   - Use the following command to start the Vite development server:
     ```bash
     npm run dev
     ```
   - The application will be accessible at `http://localhost:5173` by default.

3. **Build the Application**:
   - To build the application for production, use:
     ```bash
     npm run build
     ```
