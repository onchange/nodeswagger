const createApp = require('./app');
const config = require('./config/environment');

const app = createApp({
    title: 'User Management API',
    description: 'A comprehensive User Management API with CRUD operations',
    port: config.server.userApiPort,
    apiPaths: ['./src/routes/userRoutes.js', './src/routes/healthRoutes.js']
});

const port = config.server.userApiPort;

app.listen(port, () => {
    console.log(`User Management API server is running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});