export type ProgrammingActiveData = {
  date: string;
  duration:number;
  language: string; // 전체 | 다른 프로그래밍 언어
}

export type ProgrammingActiveDataPerLanguage = Record<string, ProgrammingActiveData[]>

export type EntireLanguageDurationTrendVO = {
  data: ProgrammingActiveData[],
  option: "ALL"
};

export type SeparateLanguageDurationTrendVO = {
  data: ProgrammingActiveDataPerLanguage;
  option: "LANGUAGE"
}