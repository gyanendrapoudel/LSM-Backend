export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 200
    res.status(statusCode).json({
    status: 'error',
    message: error.message,
  })
}
