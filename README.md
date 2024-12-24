
# Nearby Service Finder

A web application that helps users find nearby mechanics, plumbers, electricians, and other service workers for their business or personal needs. Built with **React.js** for the frontend and **Node.js** for the backend, this project provides a seamless way to connect users with local service providers.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User-Friendly Interface**: Intuitive UI for users to search for nearby service providers.
- **Service Categories**: Organized services like mechanics, plumbers, electricians, etc.
- **Location-Based Search**: Fetch service providers based on the user's current location or input address.
- **Contact Details**: Easily access contact information and service details.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

### Frontend
- **React.js**
- **CSS/Bootstrap** for styling
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for the database
- **Mongoose** for MongoDB object modeling
- **Geolocation API** for fetching nearby services
- **JWT** for user authentication

---

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js**: [Download](https://nodejs.org/)
- **MongoDB**: [Download](https://www.mongodb.com/try/download/community)
- **Git**: [Download](https://git-scm.com/)


2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   - For the backend:
     ```bash
     cd backend
     npm start
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. **Search for Services**: Enter your location or enable geolocation to find nearby service providers.
2. **Filter by Category**: Choose the type of service you need (e.g., mechanic, plumber).
3. **Contact Providers**: View the contact information and reach out directly.

---

## Folder Structure

```plaintext
nearby-service-finder/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## API Endpoints

### Authentication
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login an existing user

### Services
- **GET /api/services** - Fetch all services
- **GET /api/services/:category** - Fetch services by category
- **POST /api/services** - Add a new service (Admin only)

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

