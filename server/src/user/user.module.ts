import {Module, forwardRef} from '@nestjs/common';
import {UserController} from './adapter/in/user.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from 'src/user/domain/user.schema';
import {UserService} from './use-case/user.service';
import {UserRepository} from 'src/user/adapter/out/user.repository';

import {ProfileModule} from 'src/profile/profile.module';
import {TimeModule} from 'src/time/time.module';
import {UserServicePort} from "./application/port/in/user.service.port";
import {UserRepositoryPort} from "./application/port/out/user.repository.port";

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    forwardRef(() => TimeModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      useClass: UserService,
      provide: UserServicePort
    },
    {
      useClass: UserRepository,
      provide: UserRepositoryPort
    },
    UserRepository
  ],
  exports: [
    UserRepositoryPort,
    // 이부분 나중에 삭제해야 함...!
    UserRepository,
    MongooseModule
  ],
})
export class UserModule {
}
