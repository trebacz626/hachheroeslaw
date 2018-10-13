
export default class customError {
  message: string;
  status:number
  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}