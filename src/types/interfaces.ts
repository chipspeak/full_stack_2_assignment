// Type definitions for the application (Most are self-explanatory but I've left comments for watchProviders and the interfaces that use it)
export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    backdrop_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    playlist?: boolean;
    genre_ids?: number[];
    cast?: MovieCastMember[];
  }

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  }

  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }

  export interface MovieBackdrop {
    file_path: string;
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
    backdrop: MovieBackdrop;
  }

  export type FilterOption = "title" | "genre";

  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }
  
  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface MovieCastMember {
    id: number;
    name: string;
    profile_path?: string;
  }
  
  // Watch Providers object for use in other interfaces
  export interface WatchProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }
  
  // This outlines the format of the availability types available from the response (flatrate is all we'll use for now but the others are included for potential future use)
  export interface RegionWatchProviders {
    link: string; // This is the direct link to the tmdb movie page
    flatrate?: WatchProvider[]; // This is the array of providers that offer the movie as part of a subscription
    rent?: WatchProvider[]; // This is the array of providers that offer the movie as a rental
    buy?: WatchProvider[]; // This is the array of providers that offer the movie for purchase
  }
  
  // This is the format of the response and the one we'll be using within our component
  export interface MovieWatchProvidersResponse {
    id: number;
    results: {
      IE?: RegionWatchProviders;
      GB?: RegionWatchProviders;
      [key: string]: RegionWatchProviders | undefined;
    };
  }

  export interface ActorDetailsProps {
    id: number;
    name: string;
    biography: string;
    profile_path?: string;
    birthday?: string;
    deathday?: string;
    known_for_department: string;
    popularity: number;
    place_of_birth?: string;
    also_known_as?: string[];
  }
  
// Tv section

// Type definitions for the application (TV show related)
export interface BaseTvShowProps {
  name: string;
  id: number;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  favourite?: boolean;
  playlist?: boolean;
  cast?: TvShowCastMember[];
}

export interface TvShowDetailsProps extends BaseTvShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string;
}

export interface DiscoverTvShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

export interface TvShowCastMember {
  id: number;
  name: string;
  profile_path?: string;
}

export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action: (tvShow: BaseTvShowProps) => React.ReactNode;
}

export interface TVShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
}

export interface TVShowsContextType {
  favourites: number[];
  playlists: number[];
  addToFavourites: (id: number) => void;
  addToPlaylists: (id: number) => void;
}

// This outlines the format of the availability types available from the response (flatrate is all we'll use for now but the others are included for potential future use)
export interface TvShowRegionWatchProviders {
  link: string; // This is the direct link to the tmdb TV show page
  flatrate?: WatchProvider[]; // This is the array of providers that offer the TV show as part of a subscription
  rent?: WatchProvider[]; // This is the array of providers that offer the TV show as a rental
  buy?: WatchProvider[]; // This is the array of providers that offer the TV show for purchase
}

// This is the format of the response and the one we'll be using within our component
export interface TvShowWatchProvidersResponse {
  id: number;
  results: {
    IE?: TvShowRegionWatchProviders;
    GB?: TvShowRegionWatchProviders;
    [key: string]: TvShowRegionWatchProviders | undefined;
  };
}

export interface TvImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}


// Auth 

export interface AuthContextInterface {
  token: string | null;
  authenticate: ((username: string, password: string) => void);
  signout: () => void;
}