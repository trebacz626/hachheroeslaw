import Error from './customError'

export default {
  /**
   * @apiDefine invalidPage
   * @apiError (400) invalidPage
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "invalid page param",
          "status": 400
       }
}
   * */
  invalidPage: new Error("invalid page param", 400),
  /**
   * @apiDefine wrongNumberOfFiles
   * @apiError (400) wrongNumberOfFiles
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "wrong number of files",
          "status": 400
       }
}
   * */
  wrongNumberOfFiles: new Error("wrong number of files", 400),
  /**
   * @apiDefine errorParsingFile
   * @apiError (400) errorParsingFile
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Couldn't parse incoming file",
          "status": 400
       }
}
   * */
  errorParsingFile: new Error("Couldn't parse incoming file", 400),
  /**
   * @apiDefine invalidVideoFormat
   * @apiError (400) invalidVideoFormat
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
        "error": {
          "message": "Wrong file format",
          "status": 400
       }
}
   * */
  invalidVideoFormat:new Error("Wrong file format",400),
  
  invalidId: new Error("invalid id", 400),

}