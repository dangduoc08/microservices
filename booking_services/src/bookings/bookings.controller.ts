import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  UsePipes,
  HttpException,
  HttpStatus,
  Delete
} from '@nestjs/common'
import {
  BookingsService
} from './bookings.service'
import {
  Bookings as BookingsModel
} from './bookings.schema'
import {
  TransformGetBookingsQuery
} from './bookings.pipe'
import {
  GetBookingsQueryDTO,
  GetBookingParamDTO,
  UpdateBookingParamDTO,
  UpdateBookingBodyDTO,
  DeleteBookingParamDTO
} from './dtos'

@Controller({
  version: ['1'],
  path: 'bookings'
})
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService
  ) { }

  private throwError(e: unknown, code?: number) {
    if (e instanceof HttpException) {
      throw new HttpException(e?.message, e.getStatus())
    } else {
      const err: Error = e as Error
      throw new HttpException(err?.message, code ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UsePipes(TransformGetBookingsQuery)
  @Get()
  public async getBookings(
    @Query() { limit, offset }: GetBookingsQueryDTO
  ): Promise<{ bookings: BookingsModel[] } | void> {
    try {
      const bookings = await this.bookingsService.getBookings(limit, offset)

      return { bookings }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Get(':id')
  public async getBooking(
    @Param() { id }: GetBookingParamDTO
  ): Promise<{ booking: BookingsModel | null } | void> {
    try {
      const booking = await this.bookingsService.getBookingByID(id)

      return { booking }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Put(':id')
  public async updateBooking(
    @Param() { id }: UpdateBookingParamDTO,
    @Body() { status = '' }: UpdateBookingBodyDTO
  ): Promise<{ booking: BookingsModel | null } | void> {
    try {
      const booking = await this.bookingsService.updateBookingStatus(id, status)

      return { booking }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Delete(':id')
  public async deleteBooking(
    @Param() { id }: DeleteBookingParamDTO
  ): Promise<void> {
    try {
      return this.bookingsService.deleteBooking(id)
    } catch (err) {
      return this.throwError(err)
    }
  }
}