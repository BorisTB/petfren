import { Args, Query, Resolver } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './models/user'

@Resolver(of => User)
export class UsersResolver {
  constructor (private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user (@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id)

    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }
}
