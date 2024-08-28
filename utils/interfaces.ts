export interface APIError {
  message: string;
}

export interface FavoritedMovieId {
  movieId: string;
}

export interface MovieInfo {
  imdbID: string;
  Title: string;
  Poster: string;
}

export interface Movie extends MovieInfo {
  showMore: boolean;
}

export interface MovieData extends MovieInfo {
  Plot: string;
}
