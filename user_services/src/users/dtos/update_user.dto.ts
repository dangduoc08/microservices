import {
  IsString,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

export abstract class UpdateUserBodyDTO {
  @IsString()
  @IsOptional()
  abstract full_name?: string

  @IsString()
  @IsOptional()
  abstract phone_number?: string

  @IsString()
  @IsOptional()
  abstract nation_code?: string
}

export abstract class UpdateUserParamDTO {
  @IsString()
  @IsNotEmpty()
  abstract id: string
}