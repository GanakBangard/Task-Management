# 📝 Task Management Web App

A full-stack task management application that allows users to register, log in, and manage their daily tasks in real-time. Users can create, update, delete tasks, and categorize them based on their status (important, completed, incomplete).

---

## 🚀 Features

- 🔐 User Signup and Login with JWT Authentication
- 🧭 Sidebar Navigation for:
  - All Tasks
  - Important Tasks
  - Completed Tasks
  - Incomplete Tasks
- ➕ Task Creation
- ✏️ Task Editing
- ❌ Task Deletion
- ✅ Mark as Complete/Incomplete
- ⭐ Mark as Important
- 💾 Persistent storage using MongoDB
- ⚡ Real-time UI updates (client-side filtering)
- 🎨 Responsive, clean UI built with React

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **Axios**
- **React Hooks (useState, useEffect)**
- **CSS Modules / Tailwind CSS** (for styling)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JWT for Authentication**
- **CORS & dotenv**

---
## 🔗 Live Demo

👉 [Click here to view the live app](https://ganak-two.vercel.app/Signup)


## 📁 Project Structure

```
project-root/
│
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Sidebar, TaskForm, TaskList, etc.
│   │   ├── pages/            # Signup, Login, Home
│   │   └── App.js
│   └── package.json
│
├── server/                   # Node + Express Backend
│   ├── controllers/          # Auth & Task Controllers
│   ├── middleware/           # JWT Auth Middleware
│   ├── models/               # User & Task Models
│   ├── routes/               # API Routes
│   ├── .env
│   └── server.js
│
├── README.md
└── package.json
```
---

## 📦 API Endpoints

### Auth
- `POST /api/auth/signup` – Create a new user
- `POST /api/auth/login` – Authenticate user and return JWT

### Tasks (Protected)
- `GET /api/tasks` – Get all tasks
- `POST /api/tasks` – Create new task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task
- `PATCH /api/tasks/:id/complete` – Mark task complete/incomplete
- `PATCH /api/tasks/:id/important` – Mark task important/unimportant

---

## 👨‍💻 Author

**Your Name**  
Email: bangardganak@gmail.com
GitHub: [@GanakBangard](https://github.com/GanakBangard)


