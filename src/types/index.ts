export interface IEAnime {
    animeId: string;
    animeImg: string;
    animeTitle: string;
}


export interface IEpisodesList {
    episodeId: string;
    episodeNum: string;
    episodeUrl: string;
}

export interface IAnimeDetail {
    animeTitle: string;
    type: string;
    releasedDate: string;
    status: string;
    genres: string[];
    otherNames: string;
    synopsis: string;
    animeImg: string;
    totalEpisodes: string;
    episodesList: IEpisodesList[];
}
