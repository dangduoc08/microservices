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
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    // }),
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
        host: configService.get<PostgresConfiguration>('database')?.host,
        port: configService.get<PostgresConfiguration>('database')?.port,
        username: configService.get<PostgresConfiguration>('database')?.user,
        password: configService.get<PostgresConfiguration>('database')?.pwd,
        database: configService.get<PostgresConfiguration>('database')?.db,
        autoLoadModels: true,
        synchronize: true
      })
    }),
    UsersModule
  ]
})
export class AppModule { }