import {
  Module
} from '@nestjs/common'
import {
  MongooseModule
} from '@nestjs/mongoose'
import {
  BookingsController
} from './bookings.controller'
import {
  BookingsService
} from './bookings.service'
import {
  BookingsResolver
} from './bookings.resolver'
import {
  Bookings,
  BookingsSchema
} from './bookings.schema'
import {
  ServicesModule
} from '../services'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookings.name, schema: BookingsSchema }
    ]),
    ServicesModule
  ],
  controllers: [
    BookingsController
  ],
  providers: [
    BookingsService,
    BookingsResolver
  ]
})
export class BookingsModule { }