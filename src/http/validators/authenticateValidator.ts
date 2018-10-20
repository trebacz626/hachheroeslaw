import { body, param, query } from 'express-validator/check';
import * as customValidator from './customValidator';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';



export function validateRegisterRequest() {
  return [
    body('email').isString().withMessage(errorObjectsUser.invalidUsernameOrPassword),
    body('password').isString().withMessage(errorObjectsUser.invalidUsernameOrPassword)
  ]
}
export function validateLoginRequest() {
  return [
    body('email').isString().withMessage(errorObjectsUser.invalidUsernameOrPassword),
    body('password').isString().withMessage(errorObjectsUser.invalidUsernameOrPassword)
  ]
}
export function validateRefreshTokenRequest() {
  return [
    body('refreshToken').isString().withMessage(errorObjectsUser.invalidRefreshToken),
    body('password').isString().withMessage(errorObjectsUser.invalidUsernameOrPassword)
  ]
}

