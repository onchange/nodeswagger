const createApp = require('./app');
const config = require('./config/environment');

const app = createApp({
    title: '基本的な API',
    description: '基本的なエンドポイントを持つシンプルな Express API',
    port: config.server.port,
    apiPaths: ['./src/routes/basicRoutes.js']
});

const port = config.server.port;

app.listen(port, () => {
    console.log(`Basic API server is running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});