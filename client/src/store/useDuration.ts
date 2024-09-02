import { create } from "zustand";
import {Duration} from "@/models/rank/vo/duration.vo";

type State = {
  duration: Duration;
};
type Action = {
  setDuration: (duration: State["duration"]) => void;
};

// 기간을 저장하는 상태를 관리하는 useDuration
export const useDuration = create<State & Action>((set) => ({
  duration: "WEEK",
  setDuration: (duration) => set({ duration }),
}));
