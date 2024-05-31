import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    try {
      const status = false;
      let success, resObj, data, message;
      if (exception instanceof HttpException) {
        success = exception.getStatus();
        resObj = exception.getResponse();
        (message = resObj.message), (data = resObj.data || undefined);
      } else {
        success = HttpStatus.BAD_REQUEST;
        resObj = exception;
        message =
          resObj.message || 'Sorry, we are unable to process your request';
        data = {
          message: resObj.message,
          stack: resObj.stack,
        };
        // AppLogger.verbose(resObj);
      }

      return response.status(success).json({
        status,
        message: Array.isArray(message) ? message[0] : message,
        // error: '',
      });
    } catch (e) {
      response.status(400).json({
        status: false,
        message: 'Sorry, we are unable to process your request',
      });
    }
  }
}
