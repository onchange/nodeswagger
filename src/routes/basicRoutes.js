const express = require('express');
const config = require('../config/environment');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Hello
 *     description: Basic greeting endpoints
 *   - name: Status
 *     description: Server status information
 */

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a hello message
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: A JSON object with hello message
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
 *     summary: Returns server status information
 *     description: Get current server status and runtime information
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Server status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Server status
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Current timestamp
 *                 version:
 *                   type: string
 *                   description: API version
 *                 environment:
 *                   type: string
 *                   description: Runtime environment
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