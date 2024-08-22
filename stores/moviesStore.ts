import {create} from 'zustand';
import {Movie} from '../utils/api';

interface MoviesStore {
  search: string;
  movies: Movie[];
  toggleShowMore: (toggleMovie: Movie) => void;
  setSearch: (search: string) => void;
  setMovies: (movies: Movie[]) => void;
}

const useMoviesStore = create<MoviesStore>(set => ({
  search: 'Batman',
  movies: [],
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
}));

export default useMoviesStore;
