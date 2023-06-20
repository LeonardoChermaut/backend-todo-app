export enum HttpStatusCode {
  BadRequest = 400,
  NotFound = 404,
}

export interface ISwaggerResponse {
  statusCode: HttpStatusCode;
  message: string[];
  error: string;
}
