import mongoose from "mongoose";

function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({
      data: {
        message: "Invalid data",
        status: res.statusCode
      }
    })
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessage = Object.values(error.errors).map(error => error.message).join("; ")

    console.log(errorMessage)

    res.status(400).send({
      data: {
        message: errorMessage,
      }
    })
  } else {

    res.status(500).send({
      data: {
        message: "Internal Server Error",
        statusCode: error.message
      }
    })
  }
}

export default errorHandler;