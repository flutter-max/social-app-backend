import { Response } from 'express';

export function sendResponse(response: Response, result?: any) {
  response.send({ result, statusCode: 200 });
}
