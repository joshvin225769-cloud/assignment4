# Simple Campus Issue Tracker

A simple MERN stack project for tracking campus issues. Students can report issues, and admins can update their status.

## Features
- User registration and login with JWT
- Role-based access (Student/Admin)
- Create, view, update issues
- Filter by status/category
- Admin can change status and priority

## Tech Stack
- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (httpOnly cookies)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
- Copy `server/.env.example` to `server/.env` and update values
- Copy `client/.env.example` to `client/.env` if needed

4. Run development server:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure
```
simple-campus-tracker/
├── client/          # React frontend
└── server/          # Express backend
```
