import {
  IsString,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

export abstract class UpdateBookingBodyDTO {
  @IsString()
  @IsOptional()
  abstract status?: string
}

export abstract class UpdateBookingParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}