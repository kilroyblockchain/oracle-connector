export class Response {
  success: boolean;
  statusCode: number;
  message: string[] | string;
  data: any;

  constructor(message: string[] | string, data?: any) {
    this.message = message;
    this.data = data;
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  setSuccess(success: boolean) {
    this.success = success;
    return this;
  }
}
