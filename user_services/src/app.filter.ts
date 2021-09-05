import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'

@Catch()
export class ResponseErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()
    const code: number = exception?.getStatus?.()
    const statusCode: number = HttpStatus[code]
      ? code
      : HttpStatus.INTERNAL_SERVER_ERROR
    const errorMessage: string = exception?.message || 'Unknown error'

    const errorRes: Record<string, { [key: string]: string }> = {
      error: {
        timestamp: new Date().toISOString(),
        path: req?.path,
        message: errorMessage
      }
    }

    res
      .status(statusCode)
      .json(errorRes)
  }
}
