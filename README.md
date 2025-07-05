# Node.js Express API with Swagger Documentation

A modular Express.js API with comprehensive Swagger documentation, featuring both basic endpoints and user management functionality.

## 🚀 Features

- **Modular Architecture**: Clean separation of concerns with dedicated modules for routes, services, middleware, and configuration
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0 specification
- **User Management**: Complete CRUD operations for user entities
- **Input Validation**: Comprehensive request validation middleware
- **Error Handling**: Centralized error handling with meaningful error responses
- **Health Checks**: Built-in health monitoring endpoints
- **Environment Configuration**: Flexible configuration management

## 📁 Project Structure

```
├── src/
│   ├── config/
│   │   ├── environment.js      # Environment configuration
│   │   └── swagger.js          # Swagger configuration
│   ├── middleware/
│   │   ├── errorHandler.js     # Error handling middleware
│   │   └── validation.js       # Input validation middleware
│   ├── routes/
│   │   ├── basicRoutes.js      # Basic API endpoints
│   │   ├── userRoutes.js       # User management endpoints
│   │   └── healthRoutes.js     # Health check endpoints
│   ├── services/
│   │   └── userService.js      # User business logic
│   ├── app.js                  # Express application factory
│   ├── server.js               # Basic API server
│   └── userServer.js           # User management server
├── index.js                    # Legacy basic API (kept for compatibility)
├── index2.js                   # Legacy user API (kept for compatibility)
└── package.json
```

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/onchange/nodeswagger.git
cd nodeswagger
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Start the Basic API Server
```bash
npm start
# or
npm run dev  # with nodemon for development
```
Server will run on `http://localhost:3000`

### Start the User Management API Server
```bash
npm run start:users
# or
npm run dev:users  # with nodemon for development
```
Server will run on `http://localhost:3001`

### Legacy Servers (for compatibility)
```bash
npm run start:legacy   # Original index.js
npm run start:legacy2  # Original index2.js
```

## 📖 API Documentation

Once the server is running, access the interactive Swagger documentation:

- Basic API: `http://localhost:3000/api-docs`
- User Management API: `http://localhost:3001/api-docs`

## 🔧 Configuration

Environment variables can be used to configure the application:

```bash
PORT=3000                    # Basic API port
USER_API_PORT=3001          # User Management API port
NODE_ENV=development        # Environment (development/production)
```

## 📋 API Endpoints

### Basic API (Port 3000)
- `GET /api/hello` - Returns a greeting message
- `GET /api/status` - Returns server status information

### User Management API (Port 3001)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID
- `GET /api/health` - Health check endpoint

## 🧪 Example Usage

### Create a User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Get All Users
```bash
curl http://localhost:3001/api/users
```

### Update a User
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "age": 31}'
```

## 🔍 Key Improvements in Refactored Version

1. **Modular Structure**: Separated concerns into dedicated modules
2. **Reusable Components**: Shared Swagger and Express configuration
3. **Better Error Handling**: Centralized error management with custom error types
4. **Input Validation**: Comprehensive validation middleware
5. **Service Layer**: Business logic separated from route handlers
6. **Environment Configuration**: Flexible configuration management
7. **Consistent Code Style**: Standardized naming and structure
8. **Better Documentation**: Comprehensive API documentation

## 📝 Development Notes

- The legacy `index.js` and `index2.js` files are kept for backward compatibility
- All new development should use the modular structure in the `src/` directory
- The application uses in-memory storage for demonstration purposes
- For production use, consider implementing proper database integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.