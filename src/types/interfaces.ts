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
    watchProviders?: WatchProvider;
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
    link: string;
    flatrate?: WatchProvider[];
    rent?: WatchProvider[];
    buy?: WatchProvider[];
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
  
  