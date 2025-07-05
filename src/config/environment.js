const config = {
    server: {
        port: process.env.PORT || 3000,
        userApiPort: process.env.USER_API_PORT || 3001,
        environment: process.env.NODE_ENV || 'development'
    },
    api: {
        version: '1.0.0'
    }
};

module.exports = config;