import NotFound from "../errors/NotFound.js";

function notFoundHandler(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default notFoundHandler;