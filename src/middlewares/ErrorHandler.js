const { boom } = require('@hapi/boom');

const logError = (err, req, res, next) => {
  console.error('middleware error', err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({
      error: true,
      msg: output.payload.message,
      status: output.payload.statusCode
    });
  } else {
    next(err);
  }
};

const handleError = (err, req, res, next) => {
  res.status(500).json({
    ok: false,
    msg: err.message,
    stack: err.stack
  });
};

module.exports = {
  logError,
  boomErrorHandler,
  handleError
};
