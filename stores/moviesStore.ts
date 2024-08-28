import {create} from 'zustand';
import {Movie} from '../utils/interfaces';

interface MoviesStore {
  search: string;
  showMoreMovieId: string;
  movies: Movie[];
  toggleShowMore: (toggleMovie: Movie) => void;
  setSearch: (search: string) => void;
  setMovies: (movies: Movie[]) => void;
}

const useMoviesStore = create<MoviesStore>(set => ({
  search: '',
  showMoreMovieId: '',
  movies: [],
  toggleShowMore: (toggleMovie: Movie) =>
    set(state => ({
      ...state,
      showMoreMovieId:
        state.showMoreMovieId === toggleMovie.imdbID ? '' : toggleMovie.imdbID,
    })),
  setSearch: (search: string) => set(state => ({...state, search})),
  setMovies: (movies: Movie[]) => set(state => ({...state, movies})),
}));

export default useMoviesStore;
