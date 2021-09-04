import {
  IsString,
  IsNotEmpty
} from 'class-validator'

export abstract class GetBookingParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}
