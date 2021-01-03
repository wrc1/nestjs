import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  // When service is initialize, we going to inject UserRepository instance into the user userRepository parameter as an argument
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  signUp = async (authCredentials: AuthCredentialsDto): Promise<void> => {
    await this.userRepository.signUp(authCredentials);
  }

  signIn = async (authCredentials: AuthCredentialsDto): Promise<void> => {
    const username = await this.userRepository.validateUserPassword(authCredentials);
    if (!username) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
