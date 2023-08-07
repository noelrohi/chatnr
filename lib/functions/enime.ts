export const enimeFN = [
  {
    name: "get_recently_released_anime_episode",
    description: "Get the recent released anime episode.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "The number of episodes to return. Defaults to 10.",
        },
      },
      required: [],
    },
  },
  {
    name: "get_popular_anime",
    description: "Get the most popular animes.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description:
            "The number of anime to return. Defaults to 5. Maximum is 10",
        },
      },
      required: [],
    },
  },
];

export const enime = {
  recent: async () => {
    const response = await fetch("https://api.enime.moe/recent", {
      next: {
        revalidate: 60 * 5,
      },
    });
    const { data } = (await response.json()) as Main;
    return data.map((d) => {
      return {
        episode_title: d.title,
        anime_title: d.anime.title,
        current_episode: d.anime.currentEpisode,
      };
    });
  },
  popular: async () => {
    const response = await fetch("https://api.enime.moe/popular", {
      next: {
        revalidate: 60 * 5,
      },
    });
    const { data }: { data: Datum2[] } = await response.json();
    return data.map((anime) => {
      return {
        title: anime.title,
        current_episode: anime.currentEpisode,
        score: anime.averageScore,
      };
    });
  },
};

export interface Main {
  data: Datum1[];
  meta: Meta;
}

export interface Datum2 {
  id: string;
  slug: string;
  anilistId: number;
  coverImage: string;
  bannerImage: string;
  status: Status;
  title: Title;
  mappings: Mappings;
  currentEpisode: number;
  next: Date;
  synonyms: string[];
  countryOfOrigin: CountryOfOrigin;
  lastEpisodeUpdate: Date | null;
  seasonInt: number;
  description: string;
  duration: number;
  averageScore: number;
  popularity: number;
  color: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
  format: Format;
  lastChecks: { [key: string]: number };
  genre: string[];
}

export interface Datum1 {
  id: string;
  animeId: string;
  number: number;
  title: null | string;
  image: null | string;
  introStart: null;
  introEnd: null;
  filler: null;
  createdAt: Date;
  updatedAt: Date;
  airedAt: Date;
  titleVariations: TitleVariations | null;
  description: null | string;
  anime: Anime;
  sources: Source[];
}

export interface Anime {
  id: string;
  slug: string;
  anilistId: number;
  coverImage: string;
  bannerImage: null | string;
  status: Status;
  season: string;
  title: Title;
  mappings: Mappings;
  currentEpisode: number;
  next: Date;
  synonyms: string[];
  countryOfOrigin: CountryOfOrigin;
  lastEpisodeUpdate: Date;
  seasonInt: number | null;
  description: null | string;
  duration: number | null;
  averageScore: number | null;
  popularity: number;
  color: string;
  year: number | null;
  createdAt: Date;
  updatedAt: Date;
  format: Format;
  lastChecks: { [key: string]: number };
  genre: string[];
}

export enum CountryOfOrigin {
  CN = "CN",
  Jp = "JP",
}

export enum Format {
  Ona = "ONA",
  Tv = "TV",
  TvShort = "TV_SHORT",
}

export interface Mappings {
  mal: number;
  anidb?: number;
  kitsu?: number;
  anilist: number;
  thetvdb?: number;
  anisearch?: number;
  livechart?: number;
  "notify.moe"?: string;
  "anime-planet": string;
}

export enum Status {
  Releasing = "RELEASING",
}

export interface Title {
  native: string;
  romaji: string;
  english: null | string;
  userPreferred: string;
}

export interface Source {
  id: string;
  website: Website;
  url: string;
  priority: number;
  subtitle: boolean;
}

export enum Website {
  Gogoanime = "Gogoanime",
}

export interface TitleVariations {
  native?: string;
  english: string;
  japanese?: string;
}

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: null;
  next: number;
}
