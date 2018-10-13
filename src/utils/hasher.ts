import * as md5 from 'md5'
import * as passwordHasher from 'aspnet-identity-pw'
export function hashPassword(password: string) {
  return passwordHasher.hashPassword(password);
}

export function isValid(password,passwordHash) {
  return passwordHasher.validatePassword(password, passwordHash);
}
