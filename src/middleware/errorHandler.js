const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'バリデーションエラー',
            details: err.message
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'リソースが見つかりません',
            message: err.message
        });
    }

    res.status(500).json({
        error: 'サーバー内部エラー',
        message: '何らかの問題が発生しました'
    });
};

module.exports = errorHandler;