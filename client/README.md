# 🚀 HealthTrack Pro: Daily Health Logger

[![Status](https://img.shields.io/badge/Status-Complete-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-orange)](https://www.mongodb.com/mern-stack)

## 🌟 1. Project Overview (Educational Focus)

HealthTrack Pro is a simple, full-stack application designed to track essential daily health metrics like **Calories, Water intake, and Steps**.

This project serves as an **educational showcase** of the **MERN (MongoDB, Express, React, Node.js) stack architecture**, demonstrating core concepts such as:

* **Component-Based UI**: Using functional React components for modularity.
* **State Management**: Handling application data (entries) in the parent component.
* **API Integration**: Performing CRUD (Create, Read, Delete) operations using `axios`.
* **RESTful API Design**: Building a robust backend with Express for handling data requests.
* **Database Interaction**: Using Mongoose to model and store data in MongoDB.
* **Deployment Strategy**: Configuring a single server for full-stack deployment.

---

## 2. Tech Stack

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | User Interface and Client-side Logic. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid, responsive design. |
| **Backend** | **Node.js, Express.js** | Runtime environment and lightweight server framework. |
| **Database** | **MongoDB (Mongoose)** | NoSQL database for flexible data storage. |

---

## 3. Setup and Installation

Follow these steps to get the project running on your local machine.

### A. Prerequisites

You must have the following software installed:

* **Node.js** (version 14 or higher)
* **npm** or **yarn**
* **MongoDB Instance:** A local instance or a cloud cluster (e.g., MongoDB Atlas).

### B. Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `server` directory and add your MongoDB connection string and port:
    ```env
    PORT=5002
    MONGODB_URI="YOUR_MONGO_DB_ATLAS_CONNECTION_STRING" 
    ```
4.  **Start the backend server:**
    ```bash
    node server.js
    # OR if using nodemon:
    npm run dev
    ```
    The server should start on `http://localhost:5002`.

### C. Frontend Setup (Client)

1.  **Navigate to the client directory (in a new terminal window):**
    ```bash
    cd ../client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the React application:**
    ```bash
    npm run dev
    ```
    The frontend will typically open on `http://localhost:5173` (or similar port). The client is configured to connect to the backend at `http://localhost:5002/api` during development.

---

## 🔗 4. API Endpoints

The backend exposes the following RESTful endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **`GET`** | `/api/entries` | Retrieves all health entries, sorted by date. |
| **`POST`** | `/api/entries` | Creates a new health entry. |
| **`DELETE`**| `/api/entries/:id` | Deletes a specific entry using its MongoDB ID. |

---

## 🎓 5. Educational Notes

* **Dynamic API Path:** The `App.js` file uses the environment check (`import.meta.env.NODE_ENV`) to switch between the local URL (`http://localhost:5002/api`) and a **relative path** (`/api`) for production. This is a key concept for simplifying deployment on a single server and avoiding CORS issues.
* **Component Hierarchy:** The application uses a clear component tree (`App` -> `SummaryCard`, `InputForm`, `EntryListItem`) to separate concerns and ensure **reusability** of UI elements.
* **Fixing Deletion:** The project demonstrates how to fix a common MERN development error by correctly implementing the **`DELETE`** HTTP method and using `Entry.findByIdAndDelete(id)` on the server side.

---

## 📝 6. License

This project is licensed under the **MIT License**. See the separate `LICENSE` file in the repository root for details.
