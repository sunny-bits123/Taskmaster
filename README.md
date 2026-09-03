# ✅ Taskmaster — MERN Task Management Web Application
🔗 **Live Demo:** https://taskmaster-git-main-sunny-bits123s-projects.vercel.app

A full-stack Kanban-based task management web application with JWT authentication, instant task search, inline editing, and priority/category filtering built using the MERN stack.

---

## 🚀 Features

- 🔐 User Registration & Login with JWT Authentication
- 📋 Kanban Board with 3 columns — To Do / In Progress / Done
- ✏️ Inline task editing (title, priority, category, due date)
- 🗑️ Delete tasks with confirmation
- 🔀 Move tasks between columns with arrow buttons
- 🔍 Real-time task search/filter
- 📊 Stats dashboard (Total, To Do, In Progress, Completed)
- 📈 Analytics dashboard with grouped bar chart and priority breakdown
- ⚠️ Overdue task highlighting
- 👤 User dropdown navbar with avatar
- 🌙 Dark slate + teal theme
- 📱 Fully responsive (mobile, tablet, desktop)
- 🛡️ Protected routes (dashboard only accessible after login)

---

## 🏗 Tech Stack

### Frontend
- React.js
- React Router DOM v7
- Axios
- CSS (hand-rolled, no Tailwind)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js

---

## 📂 Project Structure

```
Taskmaster-Pro/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.js
│   │   │   ├── Navbar.js
│   │   │   └── TaskCard.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   └── Navbar.css
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/sunny-bits123/Taskmaster.git
cd Taskmaster
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔐 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Task Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/tasks/stats | Get task statistics |

---

## 👨‍💻 Author

**Sunny Yadav**
B.Tech CSE (Data Science) 