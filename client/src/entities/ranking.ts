export interface RankEntity {
  totalDuration: number;
  email: string;
  nickname: string;
}

export type Rank = {
  email: string;
  nickname: string;
  developmentTime: number;
};

export type MyRankEntity = {
  rank: number;
  email: string;
  nickname: string;
  totalDuration: number;
};
export type MyRank = {
  rank: number;
  email: string;
  nickname: string;
  developmentTime: number;
};
