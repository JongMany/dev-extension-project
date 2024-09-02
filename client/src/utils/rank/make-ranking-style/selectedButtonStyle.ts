import {RankDuration} from "@/models/rank/vo/duration.vo";

export function selectedButtonStyle(
    selectedDuration: RankDuration,
    duration: RankDuration
) {
  return selectedDuration === duration ? "font-bold" : "";
}