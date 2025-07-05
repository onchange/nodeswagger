const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        errors.push('Valid email is required');
    }

    if (!age || typeof age !== 'number' || age < 0 || age > 150) {
        errors.push('Age must be a number between 0 and 150');
    }

    if (errors.length > 0) {
        const error = new Error(errors.join(', '));
        error.name = 'ValidationError';
        return next(error);
    }

    next();
};

const validateUserUpdate = (req, res, next) => {
    const { name, email, age } = req.body;
    const errors = [];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
        errors.push('Name must be a non-empty string');
    }

    if (email !== undefined && (typeof email !== 'string' || !isValidEmail(email))) {
        errors.push('Valid email is required');
    }

    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
        errors.push('Age must be a number between 0 and 150');
    }

    if (errors.length > 0) {
        const error = new Error(errors.join(', '));
        error.name = 'ValidationError';
        return next(error);
    }

    next();
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    validateUser,
    validateUserUpdate
};