import {create} from 'zustand';
import {Movie} from '../utils/api';

interface MoviesStore {
  search: string;
  movies: Movie[];
  favorites: Movie[];
  toggleShowMore: (toggleMovie: Movie) => void;
  setSearch: (search: string) => void;
  setMovies: (movies: Movie[]) => void;
  addToFavorites: (movies: Movie) => void;
  removeFromFavorites: (movies: Movie) => void;
}

const useMoviesStore = create<MoviesStore>(set => ({
  search: 'Batman',
  movies: [],
  favorites: [],
  toggleShowMore: (toggleMovie: Movie) =>
    set(state => ({
      ...state,
      movies: state.movies.map(movie => {
        if (toggleMovie.imdbID === movie.imdbID) {
          return {...toggleMovie, showMore: !toggleMovie.showMore};
        }
        return {...movie, showMore: false};
      }),
    })),
  setSearch: (search: string) => set(state => ({...state, search})),
  setMovies: (movies: Movie[]) => set(state => ({...state, movies})),
  addToFavorites: (selectedMovie: Movie) =>
    set(state => {
      selectedMovie.favorite = true;
      return {
        ...state,
        favorites: [
          ...state.favorites,
          {...selectedMovie, favorite: true, showMore: false},
        ],
      };
    }),
  removeFromFavorites: (selectedMovie: Movie) =>
    set(state => {
      selectedMovie.favorite = false;
      return {
        ...state,
        favorites: state.favorites.filter(
          favoritedMovie => favoritedMovie.imdbID !== selectedMovie.imdbID,
        ),
      };
    }),
}));

export default useMoviesStore;
