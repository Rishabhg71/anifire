export interface IEAnime {
  currentPage: number;
  hasNextPage: boolean;
  results: IEResult[];
}

export interface IEResult {
  id: string;
  title: string;
  url: string;
  image: string;
  type: string;
  hasSub: boolean;
  hasDub: boolean;
}

export interface IEpisodesList {
  id: string;
  dubId: string;
  number: number;
  isFiller: boolean;
}

export interface IAnimeDetail {
  title: string;
  url: string;
  jpTitle: string;
  genres: any[];
  image: string;
  description: string;
  type: string;
  studios: string[];
  releaseDate: string;
  status: string;
  score: number;
  premiered: string;
  duration: string;
  views: number;
  otherNames: string[];
  hasSub: boolean;
  hasDub: boolean;
  totalEpisodes: number;
  episodes: IEpisodesList[];
}

export interface IEWatchEpisodeSource {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface IWatchEpisode {
  headers: {
    Referer: string;
    "User - Agent": string;
  };
  sources: IEWatchEpisodeSource[];
  embedURL: string;
  intro: {
    start: number;
    end: number;
  };
}
