import {
  Resolver,
  Query,
  Args
} from '@nestjs/graphql'
import {
  Bookings
} from './bookings.schema'
import {
  BookingsService
} from './bookings.service'
import {
  GetBookingsQueryDTO
} from './dtos'

@Resolver('Booking')
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService
  ) { }

  @Query()
  async bookings(
    @Args() { limit, offset }: GetBookingsQueryDTO
  ): Promise<Bookings[]> {
    return this.bookingsService.getBookings(limit, offset)
  }
}