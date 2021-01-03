import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    console.log(bcrypt);
    const { username, password } = authCredentials;
    const newUser = new User();
    newUser.username = username;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username is already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    const isValid = await user.validatePassword(password);
    if (user && isValid) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password:string, salt:string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  // get user

  // create user

  // delete user

  // update user

}
