import {
  IsString,
  IsNotEmpty
} from 'class-validator'

export abstract class GetUserParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}
