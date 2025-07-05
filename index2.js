const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for demo purposes
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
];
let nextId = 3;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'A comprehensive User Management API with CRUD operations',
    },
    servers: [
        {
            url: 'http://localhost:3001'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./index2.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: ユーザーの自動生成されたID
 *         name:
 *           type: string
 *           description: ユーザーの名前
 *         email:
 *           type: string
 *           description: ユーザーのメールアドレス
 *         age:
 *           type: integer
 *           description: ユーザーの年齢
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         age: 30
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: ユーザー管理操作
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 全ユーザーを取得
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 全ユーザーのリスト
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/api/users', (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: IDでユーザーを取得
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ユーザーの数値ID
 *     responses:
 *       200:
 *         description: ユーザーの詳細
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: ユーザーが見つかりません
 */
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 新しいユーザーを作成
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: ユーザーが正常に作成されました
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: 不正な入力
 */
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }
    
    const newUser = {
        id: nextId++,
        name,
        email,
        age: parseInt(age)
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: IDでユーザーを更新
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ユーザーの数値ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: ユーザーが正常に更新されました
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: ユーザーが見つかりません
 */
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, email, age } = req.body;
    
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (age) users[userIndex].age = parseInt(age);
    
    res.json(users[userIndex]);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: IDでユーザーを削除
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ユーザーの数値ID
 *     responses:
 *       200:
 *         description: ユーザーが正常に削除されました
 *       404:
 *         description: ユーザーが見つかりません
 */
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: ヘルスチェックエンドポイント
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: サービスは正常です
 */
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.listen(port, () => {
    console.log(`User Management API is running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});