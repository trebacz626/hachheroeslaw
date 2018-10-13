import { validationResult } from "express-validator/check";
import CustomError from './../utils/errors/customError';
export function processErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var array =errors.array();
    console.log(array);
    let err = array[0]['msg'];
    if (err instanceof String)     err = new CustomError(err, 400);
    return next(err);
  } else {
    next();
  }
}