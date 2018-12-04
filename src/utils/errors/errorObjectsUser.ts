import Error from './customError'

export default {
  /**
   * @apiDefine userAlreadyExists
   * @apiError (409) userAlreadyExists This user already exists
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 409 Conflict
   *  {
        "error": {
          "message": "This user already exists",
          "status": 409
       }
}
   * */
  userAlreadyExists: new Error("This user already exists", 409),
  /**
   * @apiDefine couldntCreateUser
   * @apiError (500) couldntCreateUser Couldn't create user(db problem)
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 500 Internal Server Error
   *  {
        "error": {
          "message": "Couldn't create user",
          "status": 500
       }
}
   * */
  couldntCreateUser: new Error("Couldn't create user", 500),
  /**
   * @apiDefine userFromSessionDoesntexists
   * @apiError (400) userFromSessionDoesntexists User stored in session waas deleted
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Couldn't find user who's id is stored in session",
          "status": 400
       }
}
   * */
  userFromSessionDoesntexists: new Error("Couldn't find user who's id is stored in session", 400),
  /**
   * @apiDefine invalidUsernameOrPassword
   * @apiError (401) invalidUsernameOrPassword "invalid username or passowrd"
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 UnAuthorized
   *  {
        "error": {
          "message": "invalid username or passowrd",
          "status": 401
       }
}
   * */
  invalidUsernameOrPassword: new Error("invalid username or passowrd", 401),
  /**
   * @apiDefine invalidPassword
   * @apiError (401) invalidPassword invalid passowrd
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 UnAuthorized
   *  {
        "error": {
          "message": invalid passowrd,
          "status": 401
       }
}
   * */
  invalidPassword: new Error("invalid passowrd", 401),
  /**
   * @apiDefine userUnauthenticated
   * @apiError (401) userUnauthenticated 
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 UnAuthorized
   *  {
        "error": {
          "message": "user not authenticated",
          "status": 401
       }
}
   * */
  userUnauthenticated: new Error("user not authenticated", 401),
  /**
   * @apiDefine userUnauthorized
   * @apiError (401) userUnauthorized
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 403 UnAuthorized
   *  {
        "error": {
          "message": "user is not authorized for this action",
          "status": 403
       }
}
   * */
  userUnauthorized: new Error("user is not authorized for this action", 403),
  /**
   * @apiDefine invalidUserName
   * @apiError (400) invalidUserName
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid name param",
          "status": 400
       }
}
   * */
  invalidRefreshToken: new Error("Invalid refresh token", 409),
  invalidAccessToken: new Error("Invalid access token", 401),
  userDoesntExist: new Error("user doesn't exist", 404),

}