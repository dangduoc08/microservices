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
  SequelizeModule
} from '@nestjs/sequelize'
import {
  UsersModule
} from './users'
import {
  configuration,
  DatabaseConfiguration
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
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<DatabaseConfiguration>('database')?.host,
        port: configService.get<DatabaseConfiguration>('database')?.port,
        username: configService.get<DatabaseConfiguration>('database')?.user,
        password: configService.get<DatabaseConfiguration>('database')?.pwd,
        database: configService.get<DatabaseConfiguration>('database')?.db,
        autoLoadModels: true,
        synchronize: true
      })
    }),
    UsersModule
  ]
})
export class AppModule { }