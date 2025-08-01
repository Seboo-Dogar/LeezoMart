# LeezoMart

LeezoMart is an online grocery delivery platform built to serve our local community, addressing the high demand at our physical store. Customers can order products like vegetables, dairy, drinks, fruits, grains, and instant foods online, with convenient payment and delivery options. The platform includes a seller dashboard for managing products and orders, and a user interface for browsing, cart management, and order placement.

## Project Overview

- **Purpose**: To provide an efficient online solution for grocery shopping, reducing in-store congestion.
- **Target Audience**: Local community members (customers) and store administrators (sellers).
- **Key Features**:
  - **Seller Dashboard**: Login, manage products (add, update, delete), control stock availability, view and update order statuses.
  - **User Interface**: Register/login, browse products, add to cart, place orders, pay via Cash on Delivery (COD) or Stripe.
- **Tech Stack**:
  - **Backend**: Node.js, Express, MongoDB, JWT, bcryptjs, Cloudinary, Stripe.
  - **Frontend**: React, React Router, Axios, Tailwind CSS, React Hot Toast, React Icons.

## Tech Stack Details

### Backend Dependencies
The backend is built with Node.js and Express, using MongoDB for data storage. Below are the dependencies and their purposes:
```json
{
  "dependencies": {
    "bcryptjs": "^3.0.2", // Password hashing for secure authentication
    "cloudinary": "^2.7.0", // Cloud storage for product images
    "cookie-parser": "^1.4.7", // Parse cookies for authentication
    "cors": "^2.8.5", // Enable cross-origin requests
    "dotenv": "^16.5.0", // Load environment variables
    "express": "^5.1.0", // Web server framework
    "jsonwebtoken": "^9.0.2", // JWT for token-based authentication
    "mongoose": "^8.15.1", // MongoDB object modeling
    "multer": "^2.0.0", // Handle file uploads
    "multer-storage-cloudinary": "^4.0.0", // Cloudinary storage for Multer
    "stripe": "^18.1.1" // Payment processing
  }
}
```

### Frontend Dependencies
The frontend is built with React and styled using Tailwind CSS. Below are the dependencies and their purposes:
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.6", // Tailwind CSS integration with Vite
    "axios": "^1.9.0", // HTTP requests to backend API
    "react": "^19.1.0", // Core React library
    "react-dom": "^19.1.0", // React DOM rendering
    "react-hot-toast": "^2.5.2", // Notification popups
    "react-icons": "^5.5.0", // Icon library
    "react-router-dom": "^7.6.0", // Client-side routing
    "tailwindcss": "^4.1.6" // Utility-first CSS framework
  }
}
```

## Prerequisites

Before setting up the project, ensure you have the following installed:
- **Node.js** (v18 or higher): [Download here](https://nodejs.org/)
- **MongoDB**: Either a local instance or a cloud instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**: For cloning the repository ([Download here](https://git-scm.com/))
- **Accounts**:
  - [Cloudinary](https://cloudinary.com/) for image storage
  - [Stripe](https://stripe.com/) for payment processing

## Setup Instructions

Follow these steps to clone and run the project locally.

### 1. Clone the Repository
1. Copy the repository URL (e.g., `https://github.com/username/LeezoMart.git`).
2. Open a terminal and run:
   ```bash
   git clone <repository-url>
   ```
3. Navigate to the project directory:
   ```bash
   cd LeezoMart
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key-for-jwt>
   NODE_ENV=development
   SELLER_EMAIL=<seller-email-for-login>
   SELLER_PASSWORD=<seller-password-for-login>

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```
   - Replace placeholders (e.g., `<your-mongodb-connection-string>`) with actual values.
   - Obtain `MONGO_URI` from MongoDB Atlas or your local MongoDB instance.
   - Generate a secure `JWT_SECRET` (e.g., a random string like `mySecretKey123`).
   - Get Cloudinary credentials from your Cloudinary dashboard.
   - Get Stripe keys from your Stripe dashboard.
4. Start the backend server:
   ```bash
   npm start
   ```
   - The server should run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with the following content:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   - The frontend should open in your browser at `http://localhost:5173` (or another port if specified).

### 4. Verify the Application
- Ensure the backend is running on `http://localhost:5000`.
- Access the frontend at `http://localhost:5173`.
- **Test Seller Dashboard**:
  - Log in using the `SELLER_EMAIL` and `SELLER_PASSWORD` from the backend `.env`.
  - Add, update, or delete products, manage stock, and check orders.
- **Test User Interface**:
  - Register a new user or log in.
  - Browse products, add to cart, place an order, and test payments (COD or Stripe).

## Troubleshooting

- **Backend Errors**:
  - Ensure MongoDB is running and `MONGO_URI` is correct.
  - Verify Cloudinary and Stripe credentials.
  - Check if port `5000` is free or change `PORT` in `.env`.
- **Frontend Errors**:
  - Ensure `VITE_BACKEND_URL` matches the backend server URL.
  - Clear browser cache if UI issues occur.
- **CORS Issues**: Verify `cors` is properly configured in the backend.
- **Dependencies**: If errors occur during `npm install`, delete `node_modules` and `package-lock.json`, then retry.

## Project Structure

```
LeezoMart/
├── backend/
│   ├── .env                # Backend environment variables
│   ├── node_modules/       # Backend dependencies
│   ├── package.json        # Backend dependencies and scripts
│   └── ...                 # Backend source code
├── frontend/
│   ├── .env                # Frontend environment variables
│   ├── node_modules/       # Frontend dependencies
│   ├── package.json        # Frontend dependencies and scripts
│   ├── src/                # Frontend source code
│   └── ...                 # Other frontend files
├── README.md               # Project documentation
└── ...                     # Other files (e.g., .gitignore)
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
