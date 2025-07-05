const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { createSwaggerConfig } = require('./config/swagger');
const config = require('./config/environment');
const errorHandler = require('./middleware/errorHandler');

const basicRoutes = require('./routes/basicRoutes');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');

const createApp = (options = {}) => {
    const {
        title = 'API ドキュメント',
        description = 'Express と Swagger を使用した RESTful API',
        port = config.server.port,
        apiPaths = ['./src/routes/*.js']
    } = options;

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Swagger documentation
    const swaggerSpec = createSwaggerConfig(title, description, port, apiPaths);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Routes
    app.use('/api', basicRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/health', healthRoutes);

    // Root endpoint
    app.get('/', (req, res) => {
        res.json({
            message: 'API が実行中です',
            documentation: `http://localhost:${port}/api-docs`
        });
    });

    // Error handling middleware (must be last)
    app.use(errorHandler);

    return app;
};

module.exports = createApp;