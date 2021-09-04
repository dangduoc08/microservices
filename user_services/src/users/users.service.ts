import {
  Injectable
} from '@nestjs/common'
import {
  InjectModel
} from '@nestjs/sequelize'
import {
  QueryTypes
} from 'sequelize'
import {
  UsersModel
} from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private readonly usersModel: UsersModel
  ) { }

  public async getUsers(limit: number, offset: number): Promise<UsersModel[]> {
    return this.usersModel.sequelize?.query<UsersModel>(
      `SELECT * FROM ${UsersModel.getTableName()} LIMIT ${limit} OFFSET ${offset}`,
      {
        type: QueryTypes.SELECT
      }
    )
  }

  public async getUserByID(id: string): Promise<UsersModel> {
    const userModels: Array<UsersModel> = await this.usersModel.sequelize.query<UsersModel>(
      `SELECT * FROM ${UsersModel.getTableName()} WHERE id = '${id}' LIMIT 1`,
      {
        type: QueryTypes.SELECT
      }
    )
    return userModels?.[0] ?? null
  }

  public async updateUser(id: string, user: UsersModel): Promise<UsersModel> {
    const validKeys = [
      'nation_code',
      'full_name',
      'phone_number'
    ]

    let updateString = ''

    for (const key in user) {
      const value = user[key as string as keyof UsersModel]
      if (validKeys.includes(key) && value !== undefined) {
        updateString += key + '=' + `'${value}'`
      }
    }

    const userModels: Array<UsersModel> = await this.usersModel.sequelize.query<UsersModel>(
      `UPDATE ${UsersModel.getTableName()} SET ${updateString} WHERE id = '${id}' RETURNING *`,
      {
        type: QueryTypes.SELECT
      }
    )

    return userModels?.[0] ?? null
  }

  public async deleteUser(id: string): Promise<void> {
    return this.usersModel.sequelize.query(
      `DELETE FROM ${UsersModel.getTableName()} WHERE id = '${id}'`,
      {
        type: QueryTypes.DELETE
      }
    )
  }
}