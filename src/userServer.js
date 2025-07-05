const createApp = require('./app');
const config = require('./config/environment');

const app = createApp({
    title: 'ユーザー管理 API',
    description: 'CRUD 操作を持つ包括的なユーザー管理 API',
    port: config.server.userApiPort,
    apiPaths: ['./src/routes/userRoutes.js', './src/routes/healthRoutes.js']
});

const port = config.server.userApiPort;

app.listen(port, () => {
    console.log(`User Management API server is running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});