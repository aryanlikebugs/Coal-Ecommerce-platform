# CCL - Coal E-Commerce Application

## Overview
CCL - Coal Application is a web-based platform designed to streamline the process of coal product management, customer orders, and administrative control. The application consists of a frontend built with React.js and a backend powered by FastAPI and MongoDB.

This project was developed as part of a two-week internship at CCL Darbhanga House, Ranchi.

## Features
- **User Authentication**: Signup and login functionality with secure authentication.
- **Product Management**: Add, view, and delete coal products.
- **Order Placement & Tracking**: Customers can place orders, and admins can track all orders.
- **Admin Dashboard**: Manage users, products, and view all orders.

## Tech Stack
### Frontend
- React.js
- CSS & JavaScript

### Backend
- FastAPI
- MongoDB (with Motor async driver)


### Backend
- FastAPI routes for user authentication, product management, and order processing.
- MongoDB integration for database operations.

## Installation & Setup
1. **Clone the repository**
```bash
   git clone <repo-url>
   cd ccl-logistics-coal
```

2. **Install dependencies**
   - **Backend**
   ```bash
   pip install -r requirements.txt
   ```
   - **Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the application**
   - **Backend**
   ```bash
   uvicorn main:app --reload
   ```
   - **Frontend**
   ```bash
   npm start
   ```

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/coal-india/sign-up` | POST | User registration |
| `/coal-india/login` | POST | User login |
| `/coal-india/add-product` | POST | Add new coal products |
| `/coal-india/delete-product/{product_id}` | DELETE | Delete a product |
| `/coal-india/get-all-products` | GET | Retrieve all products |
| `/coal-india/place-order` | POST | Place an order |
| `/coal-india/get-orders/{email}` | GET | Retrieve orders for a user |
| `/coal-india/get-allOrders` | GET | Retrieve all orders |



