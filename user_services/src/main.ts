import {
  NestFactory
} from '@nestjs/core'
import {
  VersioningType
} from '@nestjs/common'
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

  app.useGlobalPipes(new AppValidationPipe())
  app.useGlobalFilters(new ResponseErrorFilter())
  app.listen(3000)
}

main()