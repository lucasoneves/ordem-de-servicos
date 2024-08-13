import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({
      data: {
        errors: errors.array(),
      },
    });
  } else {
    next();
  }
};
