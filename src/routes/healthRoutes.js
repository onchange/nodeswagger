const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: ヘルスチェックエンドポイント
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: ヘルスチェックエンドポイント
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: サービスは正常です
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 */
router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;