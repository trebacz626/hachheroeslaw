import Error from './customError'

export default {
  /**
   * @apiDefine levelsNotFound
   * @apiError (404) levelsNotFound
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 404 Not Found
   *  {
        "error": {
          "message": "Levels not found",
          "status": 404
       }
}
   * */
  levelsNotFound: new Error("Levels not found", 404),
  /**
   * @apiDefine invalidLevelName
   * @apiError (400) invalidLevelName
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "invalid level name",
          "status": 400
       }
}
   * */
  invalidLevelName: new Error("invalid level name", 400)

}