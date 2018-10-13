import Error from './customError'

export default {
  /**
   * @apiDefine tagNotFound
   * @apiError (409) tagNotFound Tag wasn't found
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 404 Not-Found
   *  {
        "error": {
          "message": "Tag not found",
          "status": 409
       }
}
   * */
  tagNotFound: new Error("Tag not found", 404),
  /**
   * @apiDefine invalidTagName
   * @apiError (400) invalidTagName Tag name is invalid
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad-Request
   *  {
        "error": {
          "message": "Invalid tag name",
          "status": 400
       }
}
   * */
  invalidTagName:new Error("Invalid tag name",400)

}