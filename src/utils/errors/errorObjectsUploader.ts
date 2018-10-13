import Error from './customError'

export default {
  /**
   * @apiDefine invalidParamFingerprint
   * @apiError (400) invalidParamFingerprint The given fingerprint is invalid
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "error": {
        "message": "invalid param fingerprint",
        "status": 400
        }
   *  }
   * */
  invalidFingreprint: new Error("invalid param fingerprint", 400),
  /**
   * @apiDefine invalidHeaderFingerprint
   * @apiError (400) invalidHeaderFingerprint The given fingerprint in header is invalid
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "error": {
        "message": "Invalid uploaderFingerprint header",
        "status": 400
        }
   *  }
   * */
  invalidXUploaderFingerprint: new Error("Invalid uploaderFingerprint header", 400),
  /**
   * @apiDefine uploaderNotFoundByClaimToken
   * @apiError (400) uploaderNotFoundByClaimToken ploader with given claim token doesn't exist
   * 
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "error": {
        "message": "ploader with given claim token doesn't exist",
        "status": 404
        }
   *  }
   * */
  uploaderNotFoundByClaimToken: new Error("Uploader with given claim token doesn't exist", 404)
}