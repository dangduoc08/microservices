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
  UsersArgsDTO,
  GetUserParamDTO
} from './dtos'

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Query('users')
  public async getUsers(
    @Args() { limit, offset }: UsersArgsDTO
  ): Promise<UsersModel[]> {
    return this.usersService.getUsers(limit, offset)
  }

  @Query('user')
  public async getUserByID(
    @Args() { id }: GetUserParamDTO
  ): Promise<UsersModel> {
    return await this.usersService.getUserByID(id)
  }
}