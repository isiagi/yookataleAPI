# Yookatale Node.js API

This is a Node.js API project for Yookatale.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v16.13.0 or higher)
- npm (v7.24.0 or higher)

### Installing Dependencies

Run the following command to install the project's dependencies:

```bash
npm install
```

### Configuration

Create a .env file in the root directory of the project and add your configuration settings. You can use the provided .env.example file as a template.

```
# .env
PORT=3000
localDB=mongodb://localhost:27017/yookatale
PROD_DB = your-productionUrl
JWT_SECRET=your-secret-key

```

### Scripts

```
npm run build - Build the TypeScript source files into JavaScript.
npm start - Start the server in production mode.
npm run dev - Start the server in development mode with automatic reloading.
```

### Running the Application

To start the application in development mode, run:

`npm run dev`

The API will be accessible at http://localhost:5000 by default. You can change the port in the .env file.

### API Routes

` /api/v1/order/ - Manage order-related operations.`

`/api/v1/auth/ - Authentication, User and login operations`

- Built With

- Node.js - JavaScript runtime

- Express.js - Web framework for Node.js

- MongoDB - NoSQL database

- Mongoose - MongoDB object modeling for Node.js

- bcryptjs - Password hashing library

- jsonwebtoken - JWT authentication library

- cors - Cross-Origin Resource Sharing

- dotenv - Environment variable management

- TypeScript - Typed JavaScript
