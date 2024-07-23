import mongoose from "mongoose";

function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({
      data: {
        message: "Invalid data",
        status: res.statusCode
      }
    })
  }
  res.status(500).send({
    data: {
      message: "Internal Server Error",
      statusCode: error.message
    }
  })
}

export default errorHandler;