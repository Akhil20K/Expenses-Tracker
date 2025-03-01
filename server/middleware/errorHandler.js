const errorHandler = (err, req, res, next) => {
    // Throw a 500 status code for our error messages in Controller
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack,
    })
}
export default errorHandler;