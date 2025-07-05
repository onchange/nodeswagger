const express = require('express');
const UserService = require('../services/userService');
const { validateUser, validateUserUpdate } = require('../middleware/validation');
const router = express.Router();

const userService = new UserService();

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
router.get('/', (req, res, next) => {
    try {
        const users = userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
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
router.get('/:id', (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
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
router.post('/', validateUser, (req, res, next) => {
    try {
        const newUser = userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
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
router.put('/:id', validateUserUpdate, (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUser = userService.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
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
router.delete('/:id', (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const result = userService.deleteUser(userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;