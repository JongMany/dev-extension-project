import {TimeEntity} from "../domain/entity/time.entity";
import Time from "../domain/model/time.model";
import {Optional} from "typescript-optional";

export default class TimeMapper {
  public static toDomain(timeEntity: TimeEntity): Optional<Time> {
    if (!timeEntity) {
      return Optional.empty<Time>();
    }
    const timeModel = new Time(
        timeEntity.id,
        timeEntity.programDuration,
        timeEntity.programDay,
        timeEntity.programmingDate,
        timeEntity.apiKey,
        timeEntity.programLanguage,
        timeEntity.fileName,
        timeEntity.project
    );
    return Optional.of(timeModel);
  }

  public static toDomains(timesEntity: TimeEntity[]): Time[] {
    const timeModels = new Array<Time>();
    timesEntity.forEach((timeEntity) => {
      const timeModel = this.toDomain(timeEntity);
      timeModels.push(timeModel.get())
    })
    return timeModels;
  }
}


