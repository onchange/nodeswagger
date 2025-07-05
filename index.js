const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Hello
 *     description: Hello メッセージの管理
 *   - name: Status
 *     description: サーバーステータス情報
 */

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello メッセージを返す
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Hello メッセージを含む JSON オブジェクト
 */

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: サーバーステータス情報を返す
 *     description: サーバーの現在のステータス情報を取得します
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: サーバーステータス情報
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: サーバーのステータス
 *                 uptime:
 *                   type: number
 *                   description: サーバーの稼働時間（秒）
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: 現在の日時
 *                 version:
 *                   type: string
 *                   description: APIバージョン
 *                 environment:
 *                   type: string
 *                   description: 実行環境
 */

app.get('/api/status', (req, res) => {
    res.json({
        status: 'running',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
