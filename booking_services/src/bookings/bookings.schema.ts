import mongoose from 'mongoose'
import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose'

export type BookingsDocument = Bookings & Document

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
export class Bookings {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true
  })
  _id!: mongoose.Types.ObjectId

  @Prop({
    type: [
      { type: mongoose.Types.ObjectId }
    ]
  })
  treatmentPackages!: Array<mongoose.Types.ObjectId>;

  @Prop({
    type: String
  })
  note!: string

  @Prop({
    type: String
  })
  status!: string

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true
  })
  customerID!: mongoose.Types.ObjectId

  @Prop()
  createdAt!: Date

  @Prop()
  updatedAt!: Date
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings)