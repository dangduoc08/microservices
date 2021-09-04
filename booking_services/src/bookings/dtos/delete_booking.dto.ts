import {
  IsString,
  IsNotEmpty
} from 'class-validator'

export abstract class DeleteBookingParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}
