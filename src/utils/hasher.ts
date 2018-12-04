import * as md5 from 'md5'
import * as passwordHasher from 'aspnet-identity-pw'
import { ILawInstance } from '../db/model/Law';
export function hashPassword(password: string) {
  return passwordHasher.hashPassword(password);
}

export function isValid(password,passwordHash) {
  return passwordHasher.validatePassword(password, passwordHash);
}

export function hashLaw(law:ILawInstance){
  return md5(law.id.toString()+law.cadence.toString()+law.govId.toString())
}
