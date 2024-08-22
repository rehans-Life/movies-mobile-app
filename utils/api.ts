import {AxiosError} from 'axios';
import axios from './axios';
import {MutateFunction, QueryFunction} from '@tanstack/react-query';

export interface APIError {
  message: string;
}

export interface FavoritedMovieId {
  movieId: string;
}

export interface MovieInfo {
  imdbID: string;
  Title: string;
}

export interface Movie extends MovieInfo {
  Poster: string;
  showMore: boolean;
}

export interface MovieData extends MovieInfo {
  Plot: string;
}

export const getMovies: QueryFunction<Movie[]> = async ({signal}) => {
  const response = await axios.get<{movies?: Movie[]}>('/movies', {
    signal,
  });

  const movies = response.data.movies || [];
  return movies;
};

export const getMovie: QueryFunction<MovieData> = async ({
  queryKey: [, id],
}) => {
  const response = await axios.get<{movie: MovieData}>(`/movies/${id}`);
  const movie = response.data.movie;
  return movie;
};

export const getFavoritedMovies: QueryFunction<FavoritedMovieId[]> = async ({
  queryKey: [],
  signal,
}) => {
  const response = await axios.get<{
    favoritedMovies?: FavoritedMovieId[];
  }>('/favorites', {
    signal,
  });
  console.log('Favorited Movies', response.data);
  const movies = response.data.favoritedMovies || [];
  return movies;
};

export const addToFavorites: MutateFunction<
  FavoritedMovieId,
  AxiosError<APIError>,
  FavoritedMovieId
> = async ({movieId}) => {
  const response = await axios.post<{movie: FavoritedMovieId}>(
    `/favorites/${movieId}`,
    null,
  );
  const movie = response.data.movie;
  console.log('ADDED MOVIE', response.data);
  return movie;
};

export const removeFromFavorites: MutateFunction<
  null,
  AxiosError<APIError>,
  FavoritedMovieId
> = async ({movieId}) => {
  await axios.delete(`/favorites/${movieId}`);
  return null;
};
