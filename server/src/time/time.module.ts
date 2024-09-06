import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from 'src/time/domain/schema/time.schema';
import { TimeService } from './use-case/time.service';
import { TimeController } from './adapter/in/time.controller';
import { TimeRepository } from 'src/time/adapter/out/time.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Time.name,
        schema: TimeSchema,
      },
    ]),
  ],
  providers: [TimeService, TimeRepository],
  controllers: [TimeController],
})
export class TimeModule {}
