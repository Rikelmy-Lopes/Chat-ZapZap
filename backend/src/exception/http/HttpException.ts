

export abstract class HttpException extends Error {
  readonly message: string;
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}