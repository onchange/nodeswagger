const swaggerJSDoc = require('swagger-jsdoc');

const createSwaggerConfig = (title, description, port, apiPaths) => {
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title,
            version: '1.0.0',
            description,
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    };

    const options = {
        swaggerDefinition,
        apis: apiPaths,
    };

    return swaggerJSDoc(options);
};

module.exports = { createSwaggerConfig };