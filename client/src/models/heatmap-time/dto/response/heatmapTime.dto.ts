export interface HeatmapProgramTimeResponseDTO {
  date: string;
  time: number;
  // CalHeatmap 라이브러리의 타입 호환을 위해 넣음
  [x: string]: string | number | undefined;
}

