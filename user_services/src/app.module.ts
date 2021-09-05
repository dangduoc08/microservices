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
  PostgresConfiguration
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
        host: configService.get<PostgresConfiguration>('database.postgres')?.host,
        port: configService.get<PostgresConfiguration>('database.postgres')?.port,
        username: configService.get<PostgresConfiguration>('database.postgres')?.user,
        password: configService.get<PostgresConfiguration>('database.postgres')?.pwd,
        database: configService.get<PostgresConfiguration>('database.postgres')?.db,
        autoLoadModels: true,
        synchronize: true,
        define: {
          underscored: true
        }
      })
    }),
    UsersModule
  ]
})
export class AppModule { }