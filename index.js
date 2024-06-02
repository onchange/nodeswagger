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
 *   name: Hello
 *   description: Hello management
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
 */

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
