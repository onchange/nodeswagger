const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'Resource Not Found',
            message: err.message
        });
    }

    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong'
    });
};

module.exports = errorHandler;