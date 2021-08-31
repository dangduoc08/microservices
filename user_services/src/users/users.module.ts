import {
  Module
} from '@nestjs/common'
import {
  SequelizeModule
} from '@nestjs/sequelize'
import {
  UsersController
} from './users.controller'
import {
  UsersService
} from './users.service'
// import {
//   UserResolver
// } from './user.resolver'
import {
  UsersModel
} from './users.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      UsersModel
    ])
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    // UserResolver
  ]
})
export class UsersModule { }