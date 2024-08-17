import {useQuery, keepPreviousData} from '@tanstack/react-query';
import React from 'react';
import {View, Text} from 'react-native';
import useMoviesStore from '../../stores/moviesStore';
import {getMovies, Movie} from '../../utils/api';
import {globalStyles} from '../../globalStyles';
import MoviesList from '../../components/MoviesList/MoviesList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Seperator from '../../components/Seperator/Seperator';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Movies() {
  const {movies, favorites, setMovies, search, setSearch} = useMoviesStore(
    state => state,
  );

  const {isFetching} = useQuery({
    queryKey: ['movies', search],
    queryFn: getMovies,
    placeholderData: keepPreviousData,
    meta: {
      onSuccess: (newMovies: Movie[]) => {
        setMovies(
          newMovies.map((movie, index) => {
            return {
              ...movie,
              showMore: index === 0,
              favorite: favorites.some(
                favoritedMovie => movie.imdbID === favoritedMovie.imdbID,
              ),
            };
          }),
        );
      },
    },
  });

  return (
    <View style={globalStyles.container}>
      <MoviesList
        enableSearch
        heading="All Movies"
        searchLabel="Search for Movies"
        searchPlaceholder="Search By Name"
        searchValue={search}
        onSearch={setSearch}
        movies={movies}
        renderMovie={({movie}) => {
          const duration = 300;
          return <MovieCard movie={movie} duration={duration} />;
        }}
        empty={
          isFetching ? (
            <View>
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <View key={i}>
                    <Skeleton height={60} borderRadius={10} />
                    <Seperator />
                  </View>
                ))}
            </View>
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
