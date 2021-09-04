import {
  PipeTransform,
  Injectable
} from '@nestjs/common'
import {
  GetBookingsQueryDTO
} from './dtos'

@Injectable()
export class TransformGetBookingsQuery implements PipeTransform {
  transform(value: GetBookingsQueryDTO): GetBookingsQueryDTO {
    return {
      limit: +value.limit,
      offset: +value.offset
    }
  }
}
