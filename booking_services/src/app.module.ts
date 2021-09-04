import {
  join
} from 'path'
import {
  Module
} from '@nestjs/common'
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config'
import {
  GraphQLModule
} from '@nestjs/graphql'
import {
  MongooseModule
} from '@nestjs/mongoose'
import {
  BookingsModule
} from './bookings'
import {
  configuration,
  MongoDBConfiguration
} from './configuration'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['src/**/*.gql'],
      definitions: {
        path: join(__dirname, 'graphql.ts'),
        outputAs: 'interface'
      }
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true,
      cache: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<MongoDBConfiguration>('databases.mongodb')?.uri
      })
    }),
    BookingsModule
  ]
})
export class AppModule { }