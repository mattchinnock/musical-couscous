# Stack Overflow Clone

## Matt Chinnock

**Stack Overflow Clone** comprises of a frontend React application served by a simple Node.js backend. These applications serve as a clone and partial implementation of the popular Q&A platform, Stack Overflow. It allows users to view questions and answers, and see their profile.

### Running the Application with Docker

It is recommended that this application be ran with Docker Compose, as a single command can start both the frontend and backend containers.

1. **Using Docker Compose**:
   - Using the `docker-compose.yml` file in the root directory, you can start the both applications with:
     ```bash
     docker-compose up --build
     ```

Containers can also be built on their own, or without Docker entirely. Instructions are located in each app's README file.
