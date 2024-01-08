const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const asyncHandlerUsingPromise = (func) => async (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => next(error));
};

export default asyncHandler;
