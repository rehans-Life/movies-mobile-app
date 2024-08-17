import axios from './axios';
import {QueryFunction} from '@tanstack/react-query';

const API_KEY = '1dc76819';

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  favorite: boolean;
  showMore: boolean;
}

export interface MovieData {
  Plot: string;
}

export const getMovies: QueryFunction<Movie[]> = async ({
  queryKey: [, search],
  signal,
}) => {
  const response = await axios.get<{Search?: Movie[]}>(
    `/?s=${search}&apikey=${API_KEY}`,
    {
      signal,
    },
  );
  const movies = response.data.Search || [];
  return movies;
};

export const getMovie: QueryFunction<MovieData> = async ({
  queryKey: [, id],
}) => {
  const response = await axios.get<MovieData>(`/?i=${id}&apikey=${API_KEY}`);
  const movie = response.data;
  return movie;
};
