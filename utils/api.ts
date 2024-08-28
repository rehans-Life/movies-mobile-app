import {AxiosError} from 'axios';
import axios from './axios';
import {MutateFunction, QueryFunction} from '@tanstack/react-query';
import {APIError, FavoritedMovieId, Movie, MovieData} from './interfaces';

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
  console.log('ADDED MOVIE', response.data);

  const movie = response.data.movie;
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
