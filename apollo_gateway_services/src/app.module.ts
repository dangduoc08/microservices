import {
  Module
} from '@nestjs/common'
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config'
import {
  GraphQLGatewayModule
} from '@nestjs/graphql'
import {
  configuration,
  ServicesConfiguration
} from './configuration'

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const services = configService.get<ServicesConfiguration>('services')
        return ({
          server: {
            cors: true
          },
          gateway: {
            serviceList: [
              { name: 'users', url: services?.users.url + '/graphql' },
              { name: 'bookings', url: services?.bookings.url + '/graphql' }
            ]
          }
        })
      }
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true,
      cache: true
    })
  ]
})
export class AppModule { }