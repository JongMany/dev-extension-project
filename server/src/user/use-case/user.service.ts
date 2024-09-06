import { Injectable } from '@nestjs/common';
import {UserServicePort} from "../application/port/in/user.service.port";
import {UserRepositoryPort} from "../application/port/out/user.repository.port";

@Injectable()
// export class UserService{
export class UserService implements UserServicePort{
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async getUserNickNameByEmail(email: string) {
    const user = await this.userRepositoryPort.findUserByEmail(email);
    if (user) {
      return user.get('nickname');
    }
    return null;
  }
}
