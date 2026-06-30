# Mini Product Management Dashboard - Backend Server

This is the backend server for the Mini Product Management Dashboard, built using Node.js, Express, MongoDB (Mongoose), and structured using clean controllers, services, models, and middleware.

## Folder Structure

```text
server/
│
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection setup
│   │
│   ├── controllers/
│   │   └── product.controller.js # Request handlers for product routes
│   │
│   ├── services/
│   │   └── product.service.js    # Data access and business logic layer
│   │
│   ├── models/
│   │   └── product.model.js      # Mongoose schema and model
│   │
│   ├── routes/
│   │   └── product.routes.js     # API endpoints mapping
│   │
│   ├── middleware/
│   │   ├── error.middleware.js   # Centralized error handler
│   │   ├── notFound.middleware.js# fallback for unregistered paths
│   │   └── validate.middleware.js# validation parser middleware
│   │
│   ├── validators/
│   │   └── product.validator.js  # Product validation schemas/rules
│   │
│   ├── utils/
│   │   ├── ApiError.js           # Custom operational error wrapper
│   │   ├── ApiResponse.js        # Structured success responder
│   │   └── asyncHandler.js       # Express async route wrapper
│   │
│   ├── app.js                    # Express app initialization
│   └── server.js                 # Execution entrypoint and db starter
│
├── package.json                  # Dependencies and execution scripts
├── .env                          # Local environment variables configuration
└── README.md                     # Documentation
```

## Getting Started

### Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB installed locally and running, or a MongoDB Atlas connection string.

### Setup
1. Open terminal in the `server` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file environment variables as needed.
4. Run the server in development mode:
   ```bash
   npm run dev
   ```
5. To run the production build:
   ```bash
   npm start
   ```

## API Endpoints

### Products (`/api/v1/products`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Retrieve all products (supports query search & pagination) |
| `GET` | `/:id` | Retrieve a single product by ID |
| `POST` | `/` | Create a new product (validates payload) |
| `PUT` | `/:id` | Update an existing product (validates payload) |
| `DELETE` | `/:id` | Delete a product by ID |
