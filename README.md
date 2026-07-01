# 📦 Mini Product Management Dashboard

> **The UI might look simple, but under the hood it's complex and production-level.**

A full-stack CRUD dashboard for managing products — built with a **React + Redux Toolkit (RTK Query)** frontend and a **Node.js + Express + MongoDB** backend. What appears as a straightforward product table actually hides a carefully layered architecture: automatic cache invalidation, server-state synchronization, centralized validation, global error handling, and a clean separation of concerns across every layer.

---

## 🌐 Live Deployment

| Resource | URL |
|---|---|
| **Live Application** | [http://3.6.159.74](http://3.6.159.74) |
| **Backend Health Check** | [http://3.6.159.74:5000/api/health](http://3.6.159.74:5000/api/health) |
| **API Base URL** | `http://3.6.159.74:5000/api` |

> The application is deployed on an **AWS EC2** instance using **Docker Compose** with both the frontend and backend running as containerized services.

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI library (latest with concurrent features) |
| **Redux Toolkit + RTK Query** | State management & server-state caching |
| **React Router DOM v7** | Client-side routing |
| **React Hook Form** | Performant form handling with minimal re-renders |
| **Shadcn UI (Radix)** | Accessible, composable UI primitives |
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
| **Helmet** | Security headers middleware |
| **express-rate-limit** | API rate limiting |
| **express-mongo-sanitize** | NoSQL injection prevention |
| **hpp** | HTTP parameter pollution protection |
| **compression** | Gzip response compression |
| **CORS** | Cross-origin resource sharing |
| **Morgan** | HTTP request logger |
| **dotenv** | Environment variable management |
| **Nodemon** | Auto-restart on file changes (dev) |

### DevOps

| Technology | Purpose |
|---|---|
| **Docker** | Containerization for both client and server |
| **Docker Compose** | Multi-container orchestration |
| **AWS EC2** | Cloud hosting for live deployment |

---

## 🚀 Getting Started — Local Setup Guide

### Prerequisites

Make sure you have the following installed on your machine:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 9.x | Comes with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **MongoDB** | Atlas (free tier) or local | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Docker** *(optional)* | ≥ 20.x | [docker.com](https://www.docker.com/get-started/) |

---

### Option 1: Run Locally (Without Docker)

#### Step 1 — Clone the Repository

```bash
git clone https://github.com/404Nix/Mini-Product-Management-Dashboard.git
cd Mini-Product-Management-Dashboard
```

#### Step 2 — Set Up the Backend

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

**Create the `.env` file** inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Environment Variables Reference (Server):**

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | Yes | Port the Express server runs on | `5000` |
| `MONGODB_URI` | Yes | MongoDB connection string (Atlas or local) | `mongodb+srv://user:pass@cluster0.mongodb.net/product_management` or `mongodb://localhost:27017/product_management` |
| `CORS_ORIGIN` | Yes | Comma-separated allowed origins for CORS | `http://localhost:5173` |
| `NODE_ENV` | Yes | Environment mode | `development` or `production` |

> [!TIP]
> **MongoDB Atlas Quick Setup:**
> 1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a **free M0 cluster**
> 2. Create a database user with a username and password
> 3. Under **Network Access**, whitelist your IP address (or use `0.0.0.0/0` for development)
> 4. Click **Connect → Drivers → Node.js** and copy the connection string
> 5. Replace `<username>`, `<password>`, and `<database_name>` in the `.env` file
>
> **No manual collection or schema creation is needed** — Mongoose creates the `products` collection automatically on first write.

**Start the backend:**

```bash
# Development mode (auto-restart with Nodemon)
npm run dev

# OR Production mode
npm start
```

You should see:
```
MongoDB Connected: <cluster-host>
Server is running at port : 5000
```

#### Step 3 — Set Up the Frontend

Open a **new terminal** and run:

```bash
# Navigate to the client directory (from project root)
cd client

# Install dependencies
npm install
```

**Create the `.env` file** inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

**Environment Variables Reference (Client):**

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | Yes | Base URL of the backend API server | `http://localhost:5000` |

**Start the frontend:**

```bash
npm run dev
```

The Vite dev server will start at:
```
➜ Local: http://localhost:5173/
```

#### Step 4 — Open the App

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser.

> [!IMPORTANT]
> Both the **server** (`:5000`) and **client** (`:5173`) must be running simultaneously in separate terminals.

---

### Option 2: Run with Docker 🐳

The project is fully dockerized with individual `Dockerfile`s for both the client and server, orchestrated via `docker-compose.yml`.

#### Project Docker Structure

```
Mini-Product-Management-Dashboard/
├── docker-compose.yml          # Orchestrates both services
├── client/
│   ├── Dockerfile              # Client container (Node 20 + Vite dev server)
│   └── .dockerignore           # Excludes node_modules, .env, dist, etc.
└── server/
    ├── Dockerfile              # Server container (Node 20 + Express)
    └── .dockerignore           # Excludes node_modules, .env, logs, etc.
```

#### Step 1 — Clone the Repository

```bash
git clone https://github.com/404Nix/Mini-Product-Management-Dashboard.git
cd Mini-Product-Management-Dashboard
```

#### Step 2 — Configure Environment Variables

Before running Docker, create the `.env` files that Docker Compose will inject into the containers.

**Create `server/.env`:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
CORS_ORIGIN=http://localhost,http://localhost:5173
NODE_ENV=production
```

**Create `client/.env`:**

```env
VITE_API_URL=http://localhost:5000
```

> [!WARNING]
> The `.env` files are listed in `.dockerignore` so they won't be baked into the image. Docker Compose injects them at runtime via the `env_file` directive. **You must create these files before running `docker compose up`.**

#### Step 3 — Build and Run

```bash
# Build and start both containers in detached mode
docker compose up --build -d
```

This will:
1. Build the **server** image from `./server/Dockerfile` (Node 20, Express)
2. Build the **client** image from `./client/Dockerfile` (Node 20, Vite dev server)
3. Start both containers with the correct port mappings and environment variables

#### Step 4 — Access the Application

| Service | URL | Container Port → Host Port |
|---|---|---|
| **Frontend** | [http://localhost](http://localhost) | `5173 → 80` |
| **Backend API** | [http://localhost:5000](http://localhost:5000) | `5000 → 5000` |
| **Health Check** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | — |

#### Docker Compose Configuration

```yaml
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "5000:5000"
    env_file:
      - ./server/.env
    restart: unless-stopped

  client:
    build:
      context: ./client
    env_file:
      - ./client/.env
    ports:
      - "80:5173"
    environment:
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - server
    restart: unless-stopped
```

#### Useful Docker Commands

```bash
# View running containers
docker compose ps

# View logs (both services)
docker compose logs -f

# View logs for a specific service
docker compose logs -f server
docker compose logs -f client

# Stop all containers
docker compose down

# Rebuild and restart (after code changes)
docker compose up --build -d

# Remove containers, networks, and volumes
docker compose down -v
```

#### Dockerfile Breakdown

**Server Dockerfile** (`server/Dockerfile`):
```dockerfile
FROM node:20                  # Base image with Node.js 20 LTS
WORKDIR /app                  # Set working directory
COPY package*.json ./         # Copy dependency manifests (layer caching)
RUN npm install               # Install dependencies
COPY . .                      # Copy application source code
EXPOSE 5000                   # Document the exposed port
CMD [ "npm", "start" ]        # Start the Express server
```

**Client Dockerfile** (`client/Dockerfile`):
```dockerfile
FROM node:20                  # Base image with Node.js 20 LTS
WORKDIR /app                  # Set working directory
COPY package*.json ./         # Copy dependency manifests (layer caching)
RUN npm install               # Install dependencies
COPY . .                      # Copy application source code
EXPOSE 5173                   # Document the exposed port
CMD [ "npm", "run", "dev" ]   # Start the Vite dev server (host: true)
```

> [!NOTE]
> The client container runs the Vite dev server with `host: true` configured in `vite.config.js`, which binds to `0.0.0.0` — required for Docker to expose the port correctly.

---

## 📊 Database Schema

### Product Model (MongoDB / Mongoose)

```javascript
// server/src/models/product.model.js
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

**No manual database or collection setup required.** Mongoose automatically creates the `products` collection in the database specified by `MONGODB_URI` when the first document is inserted.

### Stock Status (Computed, Not Stored)

Stock status labels are **computed server-side** on every response, not stored in the database:

| Stock Value | Status Label |
|---|---|
| `0` | 🔴 Out of Stock |
| `1 – 10` | 🟡 Low Stock |
| `> 10` | 🟢 In Stock |

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

## 📡 API Endpoints Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/api/products` | Fetch all products | — |
| `GET` | `/api/products?search=mouse` | Search products by name | — |
| `GET` | `/api/products?category=Electronics` | Filter by category | — |
| `POST` | `/api/products` | Create a new product | `{ name, category, price, stock }` |
| `PUT` | `/api/products/:id` | Update an existing product | `{ name, category, price, stock }` |
| `DELETE` | `/api/products/:id` | Delete a product | — |
| `GET` | `/api/health` | Health check endpoint | — |

### Quick Test with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Fetch all products
curl http://localhost:5000/api/products

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "category": "Electronics", "price": 799, "stock": 50}'

# Update a product
curl -X PUT http://localhost:5000/api/products/<product_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse Pro", "price": 999}'

# Delete a product
curl -X DELETE http://localhost:5000/api/products/<product_id>

# Search products
curl "http://localhost:5000/api/products?search=mouse"

# Filter by category
curl "http://localhost:5000/api/products?category=Electronics"
```

---

## 🏗 Architecture Deep-Dive

### Project Structure

```
Mini Product Management Dashboard/
├── docker-compose.yml              # Docker orchestration
│
├── client/                         # React Frontend
│   ├── Dockerfile                  # Client Docker image
│   ├── .env                        # VITE_API_URL
│   ├── vite.config.js              # Vite + React + Tailwind plugins
│   ├── package.json
│   └── src/
│       ├── app/
│       │   └── store.js            # Redux store (RTK Query + UI slice)
│       ├── components/
│       │   ├── common/
│       │   │   ├── Loader.jsx      # Reusable loading spinner
│       │   │   └── SearchInput.jsx # Generic search input
│       │   ├── layout/
│       │   │   ├── DashboardLayout.jsx  # Header + Main + Footer shell
│       │   │   ├── Header.jsx      # Top bar with "Add Product" CTA
│       │   │   └── Footer.jsx      # Credits & social links
│       │   ├── product/
│       │   │   ├── DeleteDialog.jsx # Confirmation dialog (AlertDialog)
│       │   │   ├── ProductForm.jsx  # react-hook-form powered form
│       │   │   ├── ProductModal.jsx # Create/Edit modal (Dialog)
│       │   │   ├── ProductRow.jsx   # Single table row with actions
│       │   │   ├── ProductTable.jsx # Full product table
│       │   │   └── SearchBar.jsx    # Debounced search input
│       │   └── ui/                  # Shadcn UI primitives
│       ├── constants/
│       │   └── product.constants.js # Categories, empty form defaults
│       ├── features/
│       │   ├── api/
│       │   │   └── productApi.js    # ★ RTK Query API slice (CRUD endpoints)
│       │   └── ui/
│       │       └── uiSlice.js       # Modal & dialog state (Redux slice)
│       ├── lib/
│       │   └── utils.js             # cn() — clsx + tailwind-merge helper
│       ├── pages/
│       │   └── Dashboard.jsx        # Main page composing all components
│       ├── routes/
│       │   └── AppRoutes.jsx        # BrowserRouter setup
│       ├── utils/
│       │   ├── formatCurrency.js    # INR currency formatter (Intl API)
│       │   ├── products.js          # Static seed data (dev reference)
│       │   └── toast.js             # Sonner toast wrapper
│       ├── App.jsx                  # Root component
│       ├── main.jsx                 # Entry — Provider, Toaster, StrictMode
│       └── index.css                # Tailwind v4 config + CSS variables
│
└── server/                          # Express Backend
    ├── Dockerfile                   # Server Docker image
    ├── .env                         # PORT, MONGODB_URI, CORS_ORIGIN, NODE_ENV
    ├── package.json
    └── src/
        ├── config/
        │   ├── conf.js              # Centralized config with env validation
        │   ├── db.js                # MongoDB connection handler
        │   └── env.js               # dotenv initialization
        ├── controllers/
        │   └── product.controller.js # CRUD logic with stock status computation
        ├── middleware/
        │   ├── error.middleware.js   # Global error handler
        │   ├── notFound.middleware.js # 404 catch-all
        │   └── validate.middleware.js # Request body validation
        ├── models/
        │   └── product.model.js     # Mongoose schema (name, category, price, stock)
        ├── routes/
        │   └── product.routes.js    # RESTful route definitions
        ├── utils/
        │   ├── asyncHandler.js      # Promise wrapper for controllers
        │   └── getStockStatus.js    # Stock level → status label mapper
        ├── validators/
        │   └── product.validator.js # express-validator rules
        ├── app.js                   # Express app (middleware + routes)
        └── server.js                # Entry — DB connect → listen
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

- **Security Middleware Stack** — The backend employs `helmet` for secure HTTP headers, `express-mongo-sanitize` to prevent NoSQL injection, `hpp` to prevent HTTP parameter pollution, and `express-rate-limit` to guard against abuse.

---

## 🎓 Project-Based Learning — Things I Learned

### RTK Query — The Game-Changer

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
- **React Hook Form + Controller Pattern** — Used `Controller` from `react-hook-form` to integrate Radix-based `<Select>` (an uncontrolled component) into a controlled form.
- **Express Validation Pipeline** — Two-layer validation: a lightweight custom middleware (`validate.middleware.js`) for quick 400 responses, plus `express-validator` schema (`product.validator.js`) for field-level rules.
- **asyncHandler Pattern** — Wrapped every controller in a higher-order `asyncHandler` to catch async errors and forward them to Express's centralized error middleware — no try/catch clutter.

---

## 📝 Available Scripts

### Client (`/client`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `localhost:5173` |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint for code quality checks |

### Server (`/server`)

| Command | Description |
|---|---|
| `npm run dev` | Start with Nodemon (auto-restart on changes) |
| `npm start` | Start in production mode |

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| `ECONNREFUSED` on frontend | Make sure the backend is running on the port specified in `VITE_API_URL` |
| MongoDB connection fails | Verify your `MONGODB_URI` is correct and your IP is whitelisted in Atlas |
| CORS errors in browser | Ensure `CORS_ORIGIN` in `server/.env` includes your frontend URL |
| Docker containers won't start | Run `docker compose logs -f` to check for errors. Ensure `.env` files exist |
| Port already in use | Kill the process using the port: `npx kill-port 5000` or `npx kill-port 5173` |
| Vite not accessible in Docker | Ensure `host: true` is set in `vite.config.js` (already configured) |

---

## 👤 Author

**Nikhil Kanojia**

- GitHub: [@404Nix](https://github.com/404Nix)
- LinkedIn: [nikhil-kanojia69](https://linkedin.com/in/nikhil-kanojia69)
- Portfolio: [nix404.me](https://nix404.me)

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
