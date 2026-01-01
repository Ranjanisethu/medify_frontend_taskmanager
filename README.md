# Task Management Application

## 📋 MERN Stack Technical Assignment

**Assignment Description:**
Develop a Task Management Application using the MERN stack, with PostgreSQL (Sequelize ORM) for database management.

### Requirements & Implementation Status
- [x] **Backend**: Node.js, Express.js, PostgreSQL, and Sequelize.
- [x] **Authentication**: JWT-based authentication with Login and protected APIs.
- [x] **API**: REST APIs to perform CRUD operations on tasks.
- [x] **Task Structure**: Tasks include title and status (Todo, In Progress, Completed).
- [x] **Frontend**: React frontend with Redux Toolkit for state management.
- [x] **Analytics**: Dashboard using Chart.js to display task statistics.
- [x] **Quality**: Proper error handling, loading indicators, and form validations.

### Evaluation Criteria Met
Strong focus on API design, secure authentication flow, efficient Sequelize usage, robust state management, and overall code quality.

---

## 🚀 Additional Features (Bonus)
Beyond the core requirements, this application includes several advanced features to enhance user experience and productivity:

1.  **📅 Calendar Transformation**: A fully interactive **Calendar View** to visualize tasks by their due dates, essential for planning.
2.  **🖱️ Kanban Drag & Drop**: A Trello-style board allowing users to drag tasks between statuses (Todo -> In Progress -> Completed) with smooth animations.
3.  **🌗 Dark/Light Mode**: A built-in theme toggle with persisted user preference.
4.  **⚡ Optimistic UI**: Instant state updates on the frontend while background requests process, ensuring a lag-free experience.
5.  **🔔 Interactive Notifications**: Replaced browser alerts with modern, center-screen Toasts for actions like deletion and updates.
6.  **✨ Premium UI**: Polished design using Tailwind CSS with glassmorphism effects and responsiveness.

---

## 🏗 Tech Stack

**Frontend:**
*   React 18 (Vite)
*   Redux Toolkit
*   Tailwind CSS
*   Chart.js (`react-chartjs-2`)
*   `react-datepicker` & `date-fns`
*   `@hello-pangea/dnd` (Drag & Drop)
*   `react-hot-toast`

**Backend:**
*   Node.js & Express
*   PostgreSQL
*   Sequelize ORM
*   JsonWebToken (JWT) & Bcrypt

---

## � Setup & Run

### Prerequisites
*   Node.js (v14+)
*   PostgreSQL Database

### 1. Database Setup
Ensure you have a PostgreSQL database running. Update `backend/.env`:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:6543/task_db
JWT_SECRET=your_secure_secret
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

The application will launch at `http://localhost:6543`.
