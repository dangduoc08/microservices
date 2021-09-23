import {
  NestFactory
} from '@nestjs/core'
import {
  VersioningType
} from '@nestjs/common'
import {
  ConfigService
} from '@nestjs/config'
import {
  AppModule
} from './app.module'
import {
  AppValidationPipe
} from './app.pipe'
import {
  ResponseErrorFilter
} from './app.filter'

async function main() {
  const app = await NestFactory.create(AppModule)

  app.enableVersioning({
    type: VersioningType.URI
  })

  const configService = app.get(ConfigService)
  const server = configService.get('server')

  app.useGlobalPipes(new AppValidationPipe())
  app.useGlobalFilters(new ResponseErrorFilter())

  console.log('aaaaaa')

  app.listen(server.port)
}

main()