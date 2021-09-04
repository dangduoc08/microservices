import {
  Resolver,
  Query,
  Args
} from '@nestjs/graphql'
import {
  UsersModel
} from './users.model'
import {
  UsersService
} from './users.service'
import {
  GetUsersQueryDTO
} from './dtos'

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Query()
  async users(
    @Args() { limit, offset }: GetUsersQueryDTO
  ): Promise<UsersModel[]> {
    return this.usersService.getUsers(limit, offset)
  }
}