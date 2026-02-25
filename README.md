# 📝 Taskmaster - MERN Task Management Application (Ongoing Project)

🚧 This project is currently under development.

Taskmaster is a full-stack task management web application built using the MERN stack.  
It allows users to register, login securely using JWT authentication, and manage their tasks using protected REST APIs.

---

## 🚀 Current Features

- User Registration & Login
- JWT Authentication
- Protected REST APIs
- Create Task
- View All Tasks
- Update Task
- Delete Task
- Basic Dashboard UI

---

## 🏗 Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js

---

## 📂 Project Structure

```
Taskmaster-Pro/
│
├── frontend/
├── backend/
└── .gitignore
```

---

## ⚙ Installation & Setup

### Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/Taskmaster.git
cd Taskmaster
```

### Backend Setup

```
cd backend
npm install
```

Create `.env` file inside backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:
```
npm start
```

### Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔐 API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login

### Task Routes (Protected)
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

## 🔄 Upcoming Features

- Task filtering & sorting
- Password reset functionality
- UI improvements
- Deployment (Render / Vercel)
- Role-based authentication

---

## 👨‍💻 Author

Sunny Yadav  
MERN Stack Developer
