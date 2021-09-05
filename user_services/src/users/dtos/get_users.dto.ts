import {
  IsNotEmpty,
  IsNumberString,
  IsNumber,
  Max
} from 'class-validator'

export abstract class GetUsersQueryDTO {
  @IsNumberString()
  @IsNotEmpty()
  abstract limit: number

  @IsNumberString()
  @IsNotEmpty()
  abstract offset: number
}

export abstract class UsersArgsDTO {
  @IsNumber()
  @Max(100)
  @IsNotEmpty()
  abstract limit: number

  @IsNumber()
  @IsNotEmpty()
  abstract offset: number
}