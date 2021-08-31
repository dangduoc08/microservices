import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  PrimaryKey
} from 'sequelize-typescript'

@Table({
  modelName: 'users'
})
export class UsersModel extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column(new DataType.CHAR(24))
  id: string = ''

  @Column(new DataType.CHAR(3))
  nation_code!: string

  @Column(DataType.TEXT)
  phone_number!: string

  @Column(DataType.TEXT)
  full_name!: string

  @AllowNull(false)
  @Column({
    type: DataType.TIME
  })
  created_at!: Date

  @AllowNull(false)
  @Column({
    type: DataType.TIME
  })
  updated_at!: Date
}