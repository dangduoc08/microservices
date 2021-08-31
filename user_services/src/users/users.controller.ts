import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  UsePipes,
  HttpException,
  HttpStatus,
  Delete
} from '@nestjs/common'
import {
  UsersService
} from './users.service'
import {
  UsersModel
} from './users.model'
import {
  TransformGetUsersQuery
} from './users.pipe'
import {
  GetUsersQueryDTO,
  GetUserParamDTO,
  UpdateUserParamDTO,
  UpdateUserBodyDTO,
  DeleteUserParamDTO
} from './dtos'

@Controller({
  version: ['1'],
  path: 'users'
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  private throwError(e: unknown, code?: number) {
    if (e instanceof HttpException) {
      throw new HttpException(e?.message, e.getStatus())
    } else {
      const err: Error = e as Error
      throw new HttpException(err?.message, code ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UsePipes(TransformGetUsersQuery)
  @Get()
  public async getUsers(
    @Query() { limit, offset }: GetUsersQueryDTO
  ): Promise<{ users: UsersModel[] } | void> {
    try {
      const users = await this.usersService.getUsers(limit, offset)

      return { users }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Get(':id')
  public async getUser(
    @Param() { id }: GetUserParamDTO
  ): Promise<{ user: UsersModel } | void> {
    try {
      const user = await this.usersService.getUserByID(id)

      return { user }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Put(':id')
  public async updateUser(
    @Param() { id }: UpdateUserParamDTO,
    @Body() body: UpdateUserBodyDTO
  ): Promise<{ user: UsersModel } | void> {
    try {
      const userModel = new UsersModel()
      if (body.nation_code !== undefined) {
        userModel.nation_code = body.nation_code
      }
      if (body.full_name !== undefined) {
        userModel.full_name = body.full_name
      }
      if (body.phone_number !== undefined) {
        userModel.phone_number = body.phone_number
      }

      const user = await this.usersService.updateUser(id, userModel)

      return { user }
    } catch (err) {
      return this.throwError(err)
    }
  }

  @Delete(':id')
  public async deleteUser(
    @Param() { id }: DeleteUserParamDTO
  ): Promise<void> {
    try {
      return this.usersService.deleteUser(id)
    } catch (err) {
      return this.throwError(err)
    }
  }
}