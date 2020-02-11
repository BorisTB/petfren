import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './models/user'
import { CreateUserInput } from './dto/CreateUserInput'

@Injectable()
export class UsersService {
  constructor (@InjectModel('User') private readonly userModel: Model<User>) {}

  async create (createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput)
    return createdUser.save()
  }

  async findOneById (id: string): Promise<User> {
    return this.userModel.findOneById(id)
  }

  async findAll (): Promise<User[]> {
    return this.userModel.find().exec()
  }
}
