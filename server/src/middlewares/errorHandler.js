function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status =
    error.status >= 400 && error.status <= 599 ? error.status : 500;
  res
    .status(status)
    .json({
      error: {
        code: status === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
        message:
          status === 500 ? 'Máy chủ gặp lỗi. Vui lòng thử lại.' : error.message,
      },
    });
}

module.exports = errorHandler;
