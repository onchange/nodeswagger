const express = require('express');
const config = require('../config/environment');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Hello
 *     description: 基本的な挨拶エンドポイント
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: サーバーステータス情報を返す
 *     description: 現在のサーバーステータスと実行時情報を取得
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
 *                   description: サーバーステータス
 *                 uptime:
 *                   type: number
 *                   description: サーバーの稼働時間（秒）
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: 現在のタイムスタンプ
 *                 version:
 *                   type: string
 *                   description: APIバージョン
 *                 environment:
 *                   type: string
 *                   description: 実行環境
 */
router.get('/status', (req, res) => {
    res.json({
        status: 'running',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: config.api.version,
        environment: config.server.environment
    });
});

module.exports = router;