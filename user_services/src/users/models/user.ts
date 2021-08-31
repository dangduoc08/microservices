import {
  Field,
  ObjectType
} from '@nestjs/graphql'

@ObjectType()
export class UsersModel {
  @Field()
  _id!: string

  @Field()
  title!: string

  @Field({ nullable: true })
  description!: string

  @Field()
  creationDate!: Date
}