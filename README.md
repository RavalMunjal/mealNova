<div align="center">

# 🍱 MealNova

### Smart Tiffin & Meal Management Platform for Students and Working Professionals

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-meal--nova.vercel.app-brightgreen?style=for-the-badge)](https://meal-nova.vercel.app)
[![Backend API](https://img.shields.io/badge/🚀_Backend_API-Render-blue?style=for-the-badge)](https://mealnova.onrender.com/)
[![Postman Docs](https://img.shields.io/badge/📮_API_Docs-Postman-orange?style=for-the-badge)](https://documenter.getpostman.com/view/50840903/2sBXqKoL4G)
[![Figma Design](https://img.shields.io/badge/🎨_Figma_Design-View-purple?style=for-the-badge)](https://www.figma.com/design/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=201-2&t=PlJo2a9pAwZQWK8Q-1)
[![YouTube Demo](https://img.shields.io/badge/▶️_YouTube_Demo-Watch-red?style=for-the-badge)](https://youtu.be/hOnVNNJkJDI)

</div>

---

## 🔗 Important Links

| 📌 Resource | 🔗 Link |
|---|---|
| 🌐 **Live Frontend (Vercel)** | [meal-nova.vercel.app](https://meal-nova.vercel.app) |
| 🚀 **Backend API (Render)** | [mealnova.onrender.com](https://mealnova.onrender.com/) |
| 📮 **Postman API Documentation** | [View Docs](https://documenter.getpostman.com/view/50840903/2sBXqKoL4G) |
| 🎨 **Figma UI Design** | [View Design](https://www.figma.com/design/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=201-2&t=PlJo2a9pAwZQWK8Q-1) |
| 🖼️ **Figma Prototype** | [View Prototype](https://www.figma.com/proto/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=213-2&viewport=307%2C398%2C0.07&t=naxuwvfjRlFUhvQs-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=213%3A2&page-id=201%3A2) |
| ▶️ **YouTube Demo** | [Watch Video](https://youtu.be/hOnVNNJkJDI) |

---

## 🚀 About MealNova

**MealNova** is a smart, full-stack tiffin and meal management platform designed for **students**, **hostel residents**, and **working professionals**. It empowers users to customize their daily meals, manage subscriptions, plan weekly menus, and track food preferences — all from one place.

---

## ❗ Problem Statement

Many students and working people face daily food issues:

- 😩 Same boring mess food every single day
- 🚫 No option to customize or swap meals
- 🍕 No control over diet, nutrition, or calorie intake
- 🗑️ Massive food wastage in hostels and canteens
- 📞 No proper feedback mechanism for mess vendors

MealNova solves all these problems by giving **full control of daily meals to users** and helping vendors and hostels manage food efficiently.

---

## 💡 Solution — How MealNova Solves It

| 🔴 Problem | ✅ Our Solution |
|---|---|
| 📋 No order tracking | Users can place, skip, or pause tiffin orders in advance |
| 🍽️ Fixed menu every day | Vendors can update daily menu; users can swap meals freely |
| 💸 Payment confusion | Subscription-based system with clear billing & history |
| 🗑️ Food wastage | Real-time demand dashboard helps vendors prepare exact quantities |
| 📞 No feedback system | Users can rate meals and give direct feedback to providers |
| 📍 Hard to discover tiffins | Location-based vendor matching connects users with nearby providers |

---

## ✨ Features

### 👤 User Features
- ✅ User Signup & Login (JWT Authentication)
- ✅ Browse 40+ Meals across Breakfast, Lunch, Dinner, Dessert categories
- ✅ Weekly Meal Planner (Drag & Drop)
- ✅ Meal Customization (diet, taste, calories)
- ✅ Cart & Checkout Flow
- ✅ Subscription Management (Basic / Pro / Premium)
- ✅ Order History & Tracking
- ✅ Dark Mode Support
- ✅ Feedback & Rating System

### 🔥 Smart Features
- ✅ Real-time Notifications (Socket.IO)
- ✅ Grocery List Generator from Weekly Plan
- ✅ Calorie & Nutrition Tracking
- ✅ Search & Filter Meals by Category, Cuisine, Tags

### 🏢 Hostel / Vendor Features
- ✅ Daily Demand Dashboard
- ✅ Menu Management
- ✅ Student Meal Tracking
- ✅ Food Waste Reduction Insights

---

## ⚙️ Tech Stack

### 🖥️ Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI Framework |
| **Tailwind CSS** | Styling |
| **Redux Toolkit** | State Management |
| **React Router DOM** | Routing |
| **Framer Motion** | Animations |
| **Socket.IO Client** | Real-time features |
| **Axios** | HTTP Requests |
| **Recharts / Nivo** | Data Visualization |

### ⚡ Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB Atlas** | Database (Cloud) |
| **Mongoose** | ODM / Schema |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **CORS** | Cross-Origin Requests |

### 🛠️ DevOps & Tools
| Tool | Purpose |
|---|---|
| **Vercel** | Frontend Deployment |
| **Render** | Backend Deployment |
| **MongoDB Atlas** | Cloud Database |
| **Postman** | API Testing & Documentation |
| **Figma** | UI/UX Design |
| **Git & GitHub** | Version Control |

---

## 📁 Folder Structure

```
mealNova/
│
├── 📁 frontend/                    # React.js Frontend
│   ├── 📁 public/
│   │   └── 📁 meals/               # Meal images (40+ photos)
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── PlannerMealSlot.jsx
│   │   │   └── ...
│   │   ├── 📁 pages/               # Application Pages
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Planner.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── About.jsx
│   │   │   └── ...
│   │   ├── 📁 services/            # API Service Layer
│   │   │   ├── apiService.js       # Axios instance with JWT interceptor
│   │   │   ├── authService.js      # Login/Register calls
│   │   │   ├── mealsService.js     # Meal API calls
│   │   │   ├── plannerService.js   # Planner API calls
│   │   │   ├── socketService.js    # Socket.IO service
│   │   │   └── mockData.js         # Fallback mock data (40+ meals)
│   │   ├── 📁 store/               # Redux store & slices
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📁 utils/               # Helper functions & validators
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── 📁 backend/                     # Node.js/Express Backend
│   ├── 📁 config/
│   │   └── db.js                   # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── authController.js       # Register & Login logic
│   │   ├── mealController.js       # Meal CRUD logic
│   │   └── plannerController.js    # Planner logic
│   ├── 📁 middleware/
│   │   └── authMiddleware.js       # JWT protect middleware
│   ├── 📁 models/
│   │   ├── User.js                 # User schema
│   │   ├── Meal.js                 # Meal schema
│   │   └── Plan.js                 # Weekly plan schema
│   ├── 📁 routes/
│   │   ├── authRoutes.js           # /api/auth
│   │   ├── mealRoutes.js           # /api/meals
│   │   └── plannerRoutes.js        # /api/planner
│   ├── 📁 utils/
│   │   └── generateToken.js        # JWT token generator
│   ├── seedData.js                 # Database seeder script
│   ├── server.js                   # Main Express server
│   └── package.json
│
└── README.md
```

---

## 🌐 API Endpoints

Base URL (Production): `https://mealnova.onrender.com`

### 🔐 Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |

### 🍔 Meals
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/meals` | Get all meals | ❌ |
| `GET` | `/api/meals?category=Breakfast` | Filter by category | ❌ |
| `GET` | `/api/meals?search=poha` | Search by name | ❌ |
| `GET` | `/api/meals/:id` | Get single meal | ❌ |

### 📅 Planner
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/planner` | Get weekly plan | ✅ |
| `POST` | `/api/planner` | Add meal to day | ✅ |
| `DELETE` | `/api/planner/:day/:mealId` | Remove meal | ✅ |
| `GET` | `/api/planner/grocery-list` | Get grocery list | ✅ |

📮 **Full API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/50840903/2sBXqKoL4G)

---

## 🏃 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Git

### Clone the repo
```bash
git clone https://github.com/RavalMunjal/mealNova.git
cd mealNova
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

### Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: `http://localhost:5000`

### Seed Database (optional)
```bash
cd backend
npm run seed
```

### Environment Variables (backend/.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

---

## 👨‍💻 Developer

**Munjal Raval**

- 🌐 GitHub: [@RavalMunjal](https://github.com/RavalMunjal)

---

<div align="center">

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Made with ❤️ by Munjal Raval

</div>
