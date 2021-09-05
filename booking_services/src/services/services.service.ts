
import {
  Injectable
} from '@nestjs/common'
import {
  HttpService
} from '@nestjs/axios'
import {
  ConfigService
} from '@nestjs/config'
import {
  UsersService
} from './users'
import {
  ServicesConfiguration
} from '../configuration'

type Services = 'users'

type ServicesInstance<T extends Services>
  = T extends 'users'
  ? UsersService
  : undefined

@Injectable({})
export class ServicesService {
  private readonly servicesConfig: ServicesConfiguration | undefined
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.servicesConfig = this.configService.get('services')
  }

  public new(): ({ select<T extends Services>(type: T): ServicesInstance<T> }) | undefined {
    if (this.servicesConfig) {
      const {
        users
      } = this.servicesConfig
      const apiURLV1 = `${users.url}/v1`

      return ({
        select: <T extends Services>(type: T): ServicesInstance<T> => {
          switch (type) {
            case 'users':
              return new UsersService(this.httpService, apiURLV1) as unknown as ServicesInstance<T>
            default:
              return undefined as unknown as ServicesInstance<T>
          }
        }
      })
    }

    return
  }
}