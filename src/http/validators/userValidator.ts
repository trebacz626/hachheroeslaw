import { body, param, query } from 'express-validator/check';
import * as customValidator from './customValidator';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';
import errorObjectsGlobal from '../../utils/errors/errorObjectsGlobal';



export function validateGetById() {
  return [
    param('id').isNumeric().withMessage(errorObjectsGlobal.invalidId),
  ]
}