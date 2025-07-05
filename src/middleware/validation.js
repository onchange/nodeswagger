const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('名前は必須で、空でない文字列である必要があります');
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        errors.push('有効なメールアドレスが必要です');
    }

    if (!age || typeof age !== 'number' || age < 0 || age > 150) {
        errors.push('年齢は0から150の間の数値である必要があります');
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
        errors.push('名前は空でない文字列である必要があります');
    }

    if (email !== undefined && (typeof email !== 'string' || !isValidEmail(email))) {
        errors.push('有効なメールアドレスが必要です');
    }

    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
        errors.push('年齢は0から150の間の数値である必要があります');
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