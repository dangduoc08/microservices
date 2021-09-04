import {
  Model,
  Types
} from 'mongoose'
import {
  Injectable
} from '@nestjs/common'
import {
  InjectModel
} from '@nestjs/mongoose'
import {
  Bookings,
  BookingsDocument
} from './bookings.schema'

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Bookings.name) private readonly bookingsModel: Model<BookingsDocument>
  ) { }

  public async getBookings(limit: number, offset: number): Promise<Bookings[]> {
    return this.bookingsModel.find()
      .skip(offset)
      .limit(limit)
  }

  public async getBookingByID(id: string | Types.ObjectId): Promise<Bookings | null> {
    return this.bookingsModel.findById(id)
  }

  public async updateBookingStatus(id: string | Types.ObjectId, status: string): Promise<Bookings | null> {
    return this.bookingsModel.findByIdAndUpdate(id, {
      status
    }, { new: true })
  }

  public async deleteBooking(id: string | Types.ObjectId): Promise<void> {
    this.bookingsModel.findByIdAndDelete(id)
  }

}