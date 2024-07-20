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
  
  