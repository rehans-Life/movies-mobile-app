import {create} from 'zustand';
import {FavoritedMovieId} from '../utils/interfaces';

interface FavoritedMovieStore {
  favorites: FavoritedMovieId[];
  setFavoritedMovies: (movies: FavoritedMovieId[]) => void;
  addToFavorites: (movieId: string) => void;
  removeFromFavorites: (movieId: string) => void;
}

const useFavoritedMoviesStore = create<FavoritedMovieStore>(set => ({
  favorites: [],
  setFavoritedMovies(movies) {
    set(state => ({...state, favorites: movies}));
  },
  addToFavorites(movieId) {
    set(state => ({
      ...state,
      favorites: [...state.favorites, {movieId: movieId}],
    }));
  },
  removeFromFavorites(movieId) {
    set(state => ({
      ...state,
      favorites: state.favorites.filter(
        favoritedMovie => favoritedMovie.movieId !== movieId,
      ),
    }));
  },
}));

export default useFavoritedMoviesStore;
