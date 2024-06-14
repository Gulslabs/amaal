import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  /**
   * 
   * @param payload 
   * @returns 
   */
  async findOrCreateUser(payload: any): Promise<User> {
    console.log(`payload: ${JSON.stringify(payload)}`);
    console.log(`payload email: ${payload.email}`);
    let user = null;
    user = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      user = new User();
      user.email = payload.email;
      user.firstName = payload.firstName;
      user.lastName = payload.lastNAme;
      user.picture = payload.picture;
      user = await this.userRepo.save(user);
      console.log(`New User Created; UserId: ${user.id}}`);
    } else {
      console.log(`User Found; UserId: ${user.id}`);
    }
    return user;
  }
}
