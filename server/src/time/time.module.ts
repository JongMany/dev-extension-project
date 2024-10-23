import {Module, forwardRef} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TimeSchema, TimeSchemaModel} from 'src/time/domain/schema/time.schema';
import {TimeService} from './use-case/time.service';
import {TimeController} from './adapter/in/time.controller';
import {TimeRepository} from 'src/time/adapter/out/time.repository';
import {UserModule} from 'src/user/user.module';
import {TimeRepositoryPort} from "./application/port/out/time.respository.port";
import {TimeServicePort} from "./application/port/in/time.service.port";

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: TimeSchemaModel.name,
        schema: TimeSchema,
      },
    ]),
  ],
  providers: [{useClass: TimeService, provide: TimeServicePort}, {useClass: TimeRepository, provide: TimeRepositoryPort}, TimeRepository],
  controllers: [TimeController],
  exports: [
      TimeRepositoryPort
  ]
})
export class TimeModule {
}
