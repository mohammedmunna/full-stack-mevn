# MEVN Stack Project

This project is a full-stack web application built using the MEVN stack. The following tools are required:
- MongoDB
- Express.js
- Vue.js
- Node.js
- Firebase

[![My Skills](https://skillicons.dev/icons?i=mongodb,express,vue,nodejs,firebase)](https://skillicons.dev)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v20.13.x or later)
- npm (v10.5.x or later)
- MongoDB

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/full-stack-mevn.git
    cd full-stack-mevn
    ```

2. Navigate to the `back-end` directory and install dependencies:
    ```bash
    cd back-end
    npm install
    ```

3. Create a `.env` file in the `back-end` directory and add your MongoDB URI and other environment variables:
    ```
    DB_USER=username
    DB_PASS=password
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `front-end` directory and install dependencies:
    ```bash
    cd ../front-end
    npm install
    ```
2. Create a `.env` file in the `front-end` directory and add your firebase apiKey and other environment variables:
    ```
    VUE_APP_FIREBASE_API_KEY=yourFirebaseApikey
    ```

3. Start the frontend development server:
    ```bash
    npm run serve
    ```

4. Open your browser and go to `http://localhost:8080`.
