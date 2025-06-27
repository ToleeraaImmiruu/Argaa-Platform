# 🌍 ARGAA Tourism Platform

**ARGAA** is a full-featured tourism platform that connects tourists with local guides, homestays, and experiences across Ethiopia. The platform enables users to explore, book, and manage customized tours, cultural trips, and adventure packages — all in one place.

---

## 🚀 Key Features

### 👤 User Roles
- **Tourists**: Browse and book tours, leave reviews, and manage bookings.
- **Guides**: Create and manage custom tour packages.
- **Hotel Managers**: Post and manage accommodation listings.
- **Admins**: Control the platform, manage users and content.

### 📱 Platform Capabilities
- 🧭 Smart & personalized **tour search**
- 🏞️ Custom tour creation by guides
- 📍 Location-aware listings and booking system
- 📷 Uploads: support for images & video tours
- 💬 Built-in **chatbot** for tourist inquiries
- 🛡️ Role-based access control (RBAC)
- 🌐 Responsive UI with mobile-first design

---

## 🛠️ Technologies Used

### Frontend (React + Vite)
- React.js with normal and Tailwind CSS
- Vite for fast development
- Axios for API calls
- React Router, Context API

### Backend (Node.js + MongoDB)
- Express.js with RESTful APIs
- JWT-based Authentication & Authorization
- MongoDB + Mongoose
- Role validation & route protection
- File uploads using Multer
- Custom validators using Yup

---

## 📦 Folder Structure

```bash
argaa/
├── argaa-backend/       # Node.js + Express backend
├── argaafrontend/       # React + Vite frontend
├── .gitignore
├── README.md


git clone https://github.com/your-username/argaa-platform.git
cd argaa-platform

git clone https://github.com/your-username/argaa-platform.git
cd argaa-platform

cd argaafrontend
npm install
npm run dev
