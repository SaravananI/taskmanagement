# Task Manager Backend (Node.js, Express, MongoDB)

## Overview
This is the backend for the Task Manager app, built using Node.js, Express, and MongoDB. It provides authentication and task management features through a REST API.

## Tech Stack
- **Express.js** for backend framework
- **MongoDB + Mongoose** for database management
- **bcrypt.js** for password hashing
- **jsonwebtoken (JWT)** for authentication
- **CORS & Express JSON Middleware** for request handling

## API Endpoints

### Authentication (JWT-based)
- `POST /auth/signup` → Register a new user
- `POST /auth/login` → Authenticate user and return JWT

### Task Management (Protected Routes - Requires JWT)
- `POST /tasks` → Create a new task
- `GET /tasks` → Get all tasks for the logged-in user
- `GET /tasks/:id` → Get a specific task
- `PUT /tasks/:id` → Update a task
- `DELETE /tasks/:id` → Delete a task

## Setup Instructions

### Prerequisites:
- Node.js installed (latest LTS recommended)
- MongoDB installed and running locally or using a cloud database like MongoDB Atlas

### Steps to Run the Backend:
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   or using nodemon (for development):
   ```bash
   npm run dev
   ```

## Learn More
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

