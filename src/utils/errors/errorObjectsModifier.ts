import Error from './customError'

export default {
  /**
   * @apiDefine modifierNotFound
   * @apiError (404) modifierNotFound
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 404 Not Found
   *  {
        "error": {
          "message": "Modifier not found",
          "status": 404
       }
}
   * */
  modifierNotFound: new Error("Modifier not found", 404),
  /**
   * @apiDefine invalidmodifierName
   * @apiError (400) invalidmodifierName
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid modifier name",
          "status": 400
       }
}
   * */
  invalidmodifierName:new Error("Invalid modifier name",400)

}