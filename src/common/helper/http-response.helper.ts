import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpResponseHelper {
  static send(message: string, data?: {}) {
    return {
      status: true,
      message,
      data: data,
    };
  }

  static error(
    code: string,
    message: string,
    content: Record<string, unknown>,
  ) {
    const data = {
      status: false,
      message,
      data: content,
    };

    throw new HttpException(data, HttpStatus[code]);
  }
}
