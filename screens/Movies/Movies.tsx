import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import useMoviesStore from '../../stores/moviesStore';
import {getFavoritedMovies, getMovies} from '../../utils/api';
import {FavoritedMovieId, Movie} from '../../utils/interfaces';
import {globalStyles} from '../../globalStyles';
import MoviesList from '../../components/MoviesList/MoviesList';
import MovieCard from '../../components/MovieCard/MovieCard';
import SkeletonList from '../../components/SkeletonList/SkeletonList';
import useFavoritedMoviesStore from '../../stores/favoritedMoviesStore';

export default function Movies() {
  const movies = useMoviesStore(state => state.movies);
  const search = useMoviesStore(state => state.search);
  const setSearch = useMoviesStore(state => state.setSearch);
  const setMovies = useMoviesStore(state => state.setMovies);

  const {setFavoritedMovies} = useFavoritedMoviesStore();

  const favoritedMoviesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoritedMovies,
    meta: {
      onSuccess: (favoritedMovies: FavoritedMovieId[]) => {
        setFavoritedMovies(favoritedMovies);
      },
    },
  });

  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    enabled: favoritedMoviesQuery.isFetched,
    meta: {
      onSuccess: (newMovies: Movie[]) => {
        setMovies(
          newMovies.map((movie, index) => {
            return {
              ...movie,
              showMore: index === 0,
            };
          }),
        );
      },
    },
  });

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.Title.match(new RegExp(`^${search}`, 'i')),
    );
  }, [search, movies]);

  return (
    <View style={globalStyles.container}>
      <MoviesList
        enableSearch
        heading="All Movies"
        searchLabel="Search for Movies"
        searchPlaceholder="Search By Name"
        searchValue={search}
        onSearch={setSearch}
        movies={filteredMovies}
        renderMovie={({movie}) => {
          const duration = 300;
          return <MovieCard movie={movie} duration={duration} />;
        }}
        empty={
          moviesQuery.isFetching || favoritedMoviesQuery.isLoading ? (
            <SkeletonList number={6} height={60} borderRadius={10} />
          ) : (
            <Text style={globalStyles.emptyText}>
              • No Movies Found with the name "{search}"
            </Text>
          )
        }
      />
    </View>
  );
}
