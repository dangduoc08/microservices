import {
  IsString,
  IsNotEmpty
} from 'class-validator'

export abstract class DeleteUserParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}
