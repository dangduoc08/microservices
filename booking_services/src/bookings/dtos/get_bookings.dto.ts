import {
  IsNotEmpty,
  IsNumberString
} from 'class-validator'

export abstract class GetBookingsQueryDTO {
  @IsNumberString()
  @IsNotEmpty()
  abstract limit: number

  @IsNumberString()
  @IsNotEmpty()
  abstract offset: number
}
