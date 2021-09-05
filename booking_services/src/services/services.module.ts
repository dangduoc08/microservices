import {
  Module
} from '@nestjs/common'
import {
  HttpModule
} from '@nestjs/axios'
import {
  ServicesService
} from './services.service'

@Module({
  providers: [
    ServicesService
  ],
  imports: [
    HttpModule
  ],
  exports: [
    ServicesService
  ]
})
export class ServicesModule { }