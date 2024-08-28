export interface IProgramData {
  fileName: string;
  programDay: string; // 프로그램을 한 날
  programDuration: number; // 프로그램을 한 시간 (ms 단위)
  programLanguage: string; // 프로그램 언어
  programmingTime: number; // 프로그램을 한 시각
  project: string[];
}
