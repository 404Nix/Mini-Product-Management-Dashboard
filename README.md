# 📦 Mini Product Management Dashboard

> **The UI might look simple, but under the hood it's complex and production-level.**

A full-stack CRUD dashboard for managing products — built with a **React + Redux Toolkit (RTK Query)** frontend and a **Node.js + Express + MongoDB** backend. What appears as a straightforward product table actually hides a carefully layered architecture: automatic cache invalidation, server-state synchronization, centralized validation, global error handling, and a clean separation of concerns across every layer.

---

## 🎓 Project-Based Learning — Things I Learned From This Project

### RTK Query — The Game-Changer

This project was my deep-dive into **RTK Query**, and here's what I took away:

| Concept | What I Learned |
|---|---|
| **`createApi` & `fetchBaseQuery`** | How to define a single API slice that auto-generates React hooks (`useGetProductsQuery`, `useCreateProductMutation`, etc.) — zero boilerplate for data fetching. |
| **Cache Tags (`tagTypes` / `providesTags` / `invalidatesTags`)** | After a mutation (create / update / delete), RTK Query **automatically refetches** the product list because the `"Products"` tag is invalidated. No manual `dispatch(fetchProducts())` required. |
| **Auto-generated Hooks** | Each endpoint produces a custom hook with built-in `isLoading`, `error`, and `data` states — eliminates the need for hand-rolled loading/error reducers entirely. |
| **`setupListeners`** | Enables **refetchOnFocus** and **refetchOnReconnect** behaviors out of the box — the app stays in sync when a user tabs back in or reconnects to the network. |
| **`.unwrap()` on Mutations** | Learned to use `.unwrap()` to get the raw resolved/rejected Promise from mutations so I can `await` them and show success/error toasts with precise control. |
| **Middleware Integration** | RTK Query ships its own middleware for cache lifecycle management. Adding `productApi.middleware` to the store is essential — skip it and cache invalidation silently breaks. |
| **Colocating Server-State & UI-State** | Used a **separate `uiSlice`** for modal/dialog visibility while letting RTK Query own all server-state. Clean boundary, zero conflicts. |

### Beyond RTK Query

- **Debounced Search** — Implemented a custom debounce (500 ms) with `useEffect` + `setTimeout` cleanup so RTK Query only fires a network request after the user stops typing, not on every keystroke.
- **React Hook Form + Controller Pattern** — Used `Controller` from `react-hook-form` to integrate Radix-based `<Select>` (which is an uncontrolled component) into a controlled form. Learned the nuance of when `register` works vs. when you need `Controller`.
- **Express Validation Pipeline** — Built a two-layer validation approach: a lightweight custom middleware (`validate.middleware.js`) for quick 400 responses, plus a robust `express-validator` schema (`product.validator.js`) for fine-grained field-level rules.
- **asyncHandler Pattern** — Wrapped every controller in a higher-order `asyncHandler` to catch async errors and forward them to Express's centralized error middleware — no try/catch clutter in every controller.

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI library (latest with concurrent features) |
| **Redux Toolkit + RTK Query** | State management & server-state caching |
| **React Router DOM v7** | Client-side routing |
| **React Hook Form** | Performant form handling with minimal re-renders |
| **Shadcn UI (Radix Nova)** | Accessible, composable UI primitives |
| **Tailwind CSS v4** | Utility-first styling |
| **Lucide React** | Icon library |
| **Sonner** | Toast notification system |
| **Vite 8** | Lightning-fast dev server & bundler |
| **Geist Font** | Modern variable font from Vercel |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 4** | Web framework with middleware architecture |
| **MongoDB + Mongoose 8** | NoSQL database with schema-level validation |
| **express-validator** | Declarative request validation |
| **CORS** | Cross-origin resource sharing |
| **Morgan** | HTTP request logger |
| **dotenv** | Environment variable management |
| **Nodemon** | Auto-restart on file changes (dev) |

---

## 🏗 Implementation — Architecture Deep-Dive

### Project Structure

```
Mini Product Management Dashboard/
├── client/                         # React Frontend
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js            # Redux store (RTK Query + UI slice)
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Loader.jsx      # Reusable loading spinner
│   │   │   │   └── SearchInput.jsx # Generic search input
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.jsx  # Header + Main + Footer shell
│   │   │   │   ├── Header.jsx      # Top bar with "Add Product" CTA
│   │   │   │   └── Footer.jsx      # Credits & social links
│   │   │   ├── product/
│   │   │   │   ├── DeleteDialog.jsx # Confirmation dialog (AlertDialog)
│   │   │   │   ├── ProductForm.jsx  # react-hook-form powered form
│   │   │   │   ├── ProductModal.jsx # Create/Edit modal (Dialog)
│   │   │   │   ├── ProductRow.jsx   # Single table row with actions
│   │   │   │   ├── ProductTable.jsx # Full product table
│   │   │   │   └── SearchBar.jsx    # Debounced search input
│   │   │   └── ui/                  # Shadcn UI primitives
│   │   │       ├── alert-dialog.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── select.jsx
│   │   │       ├── sonner.jsx
│   │   │       └── table.jsx
│   │   ├── constants/
│   │   │   └── product.constants.js # Categories, empty form defaults, stock variants
│   │   ├── features/
│   │   │   ├── api/
│   │   │   │   └── productApi.js    # ★ RTK Query API slice (all CRUD endpoints)
│   │   │   └── ui/
│   │   │       └── uiSlice.js       # Modal & dialog state (Redux slice)
│   │   ├── lib/
│   │   │   └── utils.js             # cn() — clsx + tailwind-merge helper
│   │   ├── pages/
│   │   │   └── Dashboard.jsx        # Main page composing all components
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx        # BrowserRouter setup
│   │   ├── utils/
│   │   │   ├── formatCurrency.js    # INR currency formatter (Intl API)
│   │   │   ├── products.js          # Static seed data (dev reference)
│   │   │   └── toast.js             # Sonner toast wrapper
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry — Provider, Toaster, StrictMode
│   │   └── index.css                # Tailwind v4 config + Shadcn CSS variables
│   ├── .env                         # VITE_API_URL
│   ├── components.json              # Shadcn UI configuration
│   ├── vite.config.js               # Vite + React + Tailwind plugins
│   └── package.json
│
└── server/                          # Express Backend
    ├── src/
    │   ├── config/
    │   │   ├── conf.js              # Centralized config with env validation
    │   │   ├── db.js                # MongoDB connection handler
    │   │   └── env.js               # dotenv initialization
    │   ├── controllers/
    │   │   └── product.controller.js # CRUD logic with stock status computation
    │   ├── middleware/
    │   │   ├── error.middleware.js   # Global error handler
    │   │   ├── notFound.middleware.js # 404 catch-all
    │   │   └── validate.middleware.js # Request body validation
    │   ├── models/
    │   │   └── product.model.js     # Mongoose schema (name, category, price, stock)
    │   ├── routes/
    │   │   └── product.routes.js    # RESTful route definitions
    │   ├── utils/
    │   │   ├── asyncHandler.js      # Promise wrapper for controllers
    │   │   └── getStockStatus.js    # Stock level → status label mapper
    │   ├── validators/
    │   │   └── product.validator.js  # express-validator rules
    │   ├── app.js                   # Express app (middleware + routes)
    │   └── server.js                # Entry — DB connect → listen
    ├── .env                         # PORT, MONGODB_URI, CORS_ORIGIN, NODE_ENV
    └── package.json
```

### How Data Flows (End to End)

```
User Action (e.g. "Add Product")
        │
        ▼
  ┌──────────────┐     dispatch()      ┌─────────────────┐
  │  ProductModal │ ◄──────────────── │   uiSlice.js     │
  │  (Dialog UI)  │                    │ (open/close/set) │
  └──────┬───────┘                    └─────────────────┘
         │ onSubmit
         ▼
  ┌──────────────────┐   POST /api/products   ┌───────────────┐
  │ useCreateProduct │ ──────────────────────► │  Express API   │
  │   Mutation()     │                         │  (Controller)  │
  └──────┬───────────┘                         └───────┬───────┘
         │                                             │
         │ invalidatesTags: ["Products"]               ▼
         │                                     ┌───────────────┐
         │                                     │   MongoDB      │
         │                                     │   (Mongoose)   │
         ▼                                     └───────────────┘
  ┌──────────────────┐  GET /api/products
  │ useGetProducts   │ ──────────────────────► (auto refetch)
  │   Query()        │
  └──────────────────┘
         │
         ▼
    ProductTable re-renders with fresh data
```

### Key Design Decisions

- **RTK Query over Thunks** — Instead of writing `createAsyncThunk` + manual loading/error/data reducers for every endpoint, RTK Query handles the entire lifecycle declaratively. The `productApi.js` file is ~60 lines and powers all four CRUD operations.

- **UI State Separated from Server State** — `uiSlice.js` manages only what's visible on screen (modals, dialogs, selected product). Server data lives exclusively in RTK Query's cache. This prevents stale UI state from conflicting with fresh server data.

- **Computed Stock Status** — Stock labels (`In Stock`, `Low Stock`, `Out of Stock`) are computed server-side in the controller using `getStockStatus()`, not stored in the database. This ensures consistency and avoids data duplication.

- **Debounced Search** — The `SearchBar` component uses a local `useState` for immediate keystroke feedback, then debounces the actual query parameter update by 500ms. RTK Query fires the network request only when the debounced value changes.

---

## 📊 Database Schema

### Product Collection

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Furniture", "Accessories", "Clothing", "Books", "Sports"]
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdAt: Date,    // auto-generated (timestamps: true)
  updatedAt: Date     // auto-generated (timestamps: true)
}
```

### API Response Format

All endpoints return a standardized response shape:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "count": 5,
  "data": [
    {
      "_id": "665a...",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 2499,
      "stock": 35,
      "stockStatus": "In Stock",
      "createdAt": "2024-05-31T...",
      "updatedAt": "2024-05-31T..."
    }
  ]
}
```

---

## 🚀 How to Run It — Local Setup Guide

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (comes with Node.js)
- **MongoDB Atlas** account (free tier works) or a local MongoDB instance
- **Git** — [Download](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/404Nix/Mini-Product-Management-Dashboard.git
cd Mini-Product-Management-Dashboard
```

### 2. Set Up the Backend

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

**Create the `.env` file** in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
CORS_ORIGIN=*
NODE_ENV=development
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server runs on | `5000` |
| `MONGODB_URI` | MongoDB connection string (Atlas or local) | `mongodb://localhost:27017/product_management` |
| `CORS_ORIGIN` | Allowed origins for CORS | `*` (dev) or `http://localhost:5173` (restrictive) |
| `NODE_ENV` | Environment mode | `development` or `production` |

> **💡 MongoDB Atlas Quick Setup:**
> 1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free cluster
> 2. Create a database user with a password
> 3. Whitelist your IP address (or use `0.0.0.0/0` for development)
> 4. Click **Connect → Drivers** and copy the connection string
> 5. Replace `<username>`, `<password>`, and `<database_name>` in the `.env` file
>
> No manual collection or schema creation is needed — **Mongoose creates the `products` collection automatically** on first write.

**Start the backend:**

```bash
# Development mode (auto-restart with Nodemon)
npm run dev

# Production mode
npm start
```

The server will log:
```
MongoDB Connected: <cluster-host>
Server is running at port : 5000
```

### 3. Set Up the Frontend

```bash
# Navigate to the client directory (from project root)
cd client

# Install dependencies
npm install
```

**Create the `.env` file** in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000` |

**Start the frontend:**

```bash
npm run dev
```

The Vite dev server will start at:
```
➜ Local: http://localhost:5173/
```

### 4. Open the App

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser. Both the server (`:5000`) and client (`:5173`) must be running simultaneously.

---

### API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Fetch all products (supports `?search=` and `?category=` query params) |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Delete a product |

### Quick Test with cURL

```bash
# Fetch all products
curl http://localhost:5000/api/products

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "category": "Electronics", "price": 799, "stock": 50}'

# Search products
curl "http://localhost:5000/api/products?search=mouse"
```

---

## 📝 Available Scripts

### Client (`/client`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint for code quality checks |

### Server (`/server`)

| Command | Description |
|---|---|
| `npm run dev` | Start with Nodemon (auto-restart on changes) |
| `npm start` | Start in production mode |

---

## 👤 Author

**Nikhil Kanojia**

- GitHub: [@404Nix](https://github.com/404Nix)
- LinkedIn: [nikhil-kanojia69](https://linkedin.com/in/nikhil-kanojia69)
- Portfolio: [nix404.me](https://nix404.me)
