import {
  PipeTransform,
  Injectable
} from '@nestjs/common'
import {
  GetUsersQueryDTO
} from './dtos'

@Injectable()
export class TransformGetUsersQuery implements PipeTransform {
  transform(value: GetUsersQueryDTO): GetUsersQueryDTO {
    return {
      limit: +value.limit,
      offset: +value.offset
    }
  }
}