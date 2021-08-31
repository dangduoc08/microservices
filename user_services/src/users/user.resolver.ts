// import {
//   Resolver,
//   Query,
//   Args
// } from '@nestjs/graphql'
// import {
//   UsersModel
// } from './models/user'
// import {
//   UsersService
// } from './users.service'
// import {
//   GetUserArgs
// } from './dto/args/get_user.args'
// import {
//   GetUsersArgs
// } from './dto/args/get_users.args'

// @Resolver(() => UsersModel)
// export class UserResolver {
//   constructor(
//     private readonly usersService: UsersService
//   ) { }

//   @Query(() => UsersModel, { name: 'user', nullable: true })
//   async getUser(@Args() getUserArgs: GetUserArgs): Promise<UsersModel> {
//     return this.usersService.getUser()
//   }

//   @Query(() => [UsersModel], { name: 'users', nullable: 'items' })
//   async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<UsersModel[]> {
//     return this.usersService.getUsers()
//   }
// }