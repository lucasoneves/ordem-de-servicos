import InvalidRequest from "./InvalidRequest.js";

class ValidationError extends InvalidRequest {

  constructor(err) {
    const mensagensErro = Object.values(err.errors)
      .map(error => error.message)
      .join("; ");

    super();
  }

}

export default ValidationError;