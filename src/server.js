const createApp = require('./app');
const config = require('./config/environment');

const app = createApp({
    title: 'Basic API',
    description: 'A simple Express API with basic endpoints',
    port: config.server.port,
    apiPaths: ['./src/routes/basicRoutes.js']
});

const port = config.server.port;

app.listen(port, () => {
    console.log(`Basic API server is running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});