import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField
} from '@nestjs/graphql'
import {
  Bookings as BookingsModel
} from './bookings.schema'
import {
  BookingsService
} from './bookings.service'
import {
  GetBookingsArgsDTO
} from './dtos'
import {
  ServicesService
} from '../services'
import {
  UsersModel
} from '../services/users'

@Resolver('Booking')
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly servicesService: ServicesService
  ) { }

  @Query('bookings')
  public async getBookings(
    @Args() { limit, offset }: GetBookingsArgsDTO
  ): Promise<BookingsModel[]> {
    return this.bookingsService.getBookings(limit, offset)
  }

  @ResolveField('customerID')
  public getCustomer(
    @Parent() { customerID }: BookingsModel
  ): Promise<UsersModel> {
    const services = this.servicesService.new()
    const usersService = services?.select('users')

    return new Promise((resolve) => {
      usersService?.getUserById(customerID.toString()).subscribe(next => {
        resolve(next.data.user)
      })
    })
  }
}