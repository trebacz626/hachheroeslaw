import Error from './customError'

export default {
  /**
   * @apiDefine invalidOrderByValue
   * @apiError (400) invalidOrderByValue Invalid OrderBy value. Should be in [VIEWS,VOTES,DAY]
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid OrderBy value",
          "status": 400
       }
}
   * */
  invalidOrderByValue: new Error("Invalid OrderBy value", 400),
  /**
   * @apiDefine invalidPostHandleName
   * @apiError (400) invalidPostHandleName
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid postHandle value",
          "status": 400
       }
}
   * */
  invalidPostHandleName: new Error("Invalid postHandle value", 400),
  /**
   * @apiDefine invalidPostGfyName
   * @apiError (400) invalidPostGfyName
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid postGfyName value",
          "status": 400
       }
}
   * */
  invalidPostGfyName: new Error("Invalid postGfyName value", 400),
  /**
   * @apiDefine invalidYoutubeId
   * @apiError (400) invalidYoutubeId
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Invalid youtubeId",
          "status": 400
       }
}
   * */
  invalidYoutubeId: new Error("Invalid youtubeId", 400),
  /**
   * @apiDefine invalidUpOption
   * @apiError (400) invalidUpOption
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "invalid up param should be in [true,false]",
          "status": 400
       }
}
   * */
  invalidUpOption: new Error("invalid up param should be in [true,false]", 400),
  /**
   * @apiDefine invalidDescription
   * @apiError (400) invalidDescription
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "invalid description",
          "status": 400
       }
}
   * */
  invalidDescription: new Error("invalid description", 400),
  /**
   * @apiDefine postnotexists
   * @apiErro (404)r postnotexists
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 404 Not Found
   *  {
        "error": {
          "message": "Post doesn't exist",
          "status": 404
       }
}
   * */
  postnotexists: new Error("Post doesn't exist", 404),
}