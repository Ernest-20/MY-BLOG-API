const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.tack || '');
    const status = err.status || 500;

    if (err instanceof multer.MulterError) {
        res.status(400).json('Invalid file type or too large file');
    }
        res.status(status).json({error: err.message });
};

module.exports = errorHandler;