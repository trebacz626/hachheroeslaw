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

export function validateSetName() {
  return [
    param('name').isString()
      .custom(function (name) { return name.length <= 32 })
      .withMessage(errorObjectsUser.invalidUserName)
  ]
}

export function validateClaimUploader() {
  return [
    param('token').isString()
      .withMessage(errorObjectsUser.invalidUploaderClaimToken)
  ]
}

