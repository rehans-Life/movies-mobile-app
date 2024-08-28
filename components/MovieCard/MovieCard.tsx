/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import React, {useMemo} from 'react';
import {
  addToFavorites as addToFavoritesFn,
  getMovie,
  removeFromFavorites as removeFromFavoritesFn,
} from '../../utils/api';
import {Movie} from '../../utils/interfaces';
import useMoviesStore from '../../stores/moviesStore';
import {useMutation, useQuery} from '@tanstack/react-query';
import Seperator from '../Seperator/Seperator';
import AIcon from 'react-native-vector-icons/AntDesign';
import ExpandableView from '../ExpandableView/ExpandableView';
import RotateIcon from '../RotateIcon/RotateIcon';
import {cardStyle, success} from '../../globalStyles';
import MovieDescription from '../MovieDescription/MovieDescription';
import useFavoritedMoviesStore from '../../stores/favoritedMoviesStore';

export default function MovieCard({
  movie,
  duration,
}: {
  movie: Movie;
  duration: number;
}) {
  const toggleShowMore = useMoviesStore(state => state.toggleShowMore);
  const showMoreMovieId = useMoviesStore(state => state.showMoreMovieId);

  const expand = showMoreMovieId === movie.imdbID;

  const {addToFavorites, removeFromFavorites, favorites} =
    useFavoritedMoviesStore(state => state);

  const {data: movieData, isLoading} = useQuery({
    queryKey: ['movies', movie.imdbID],
    staleTime: Infinity,
    queryFn: getMovie,
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: removeFromFavoritesFn,
    onSuccess: () => removeFromFavorites(movie.imdbID),
  });

  const addToFavoritesMutation = useMutation({
    mutationFn: addToFavoritesFn,
    onSuccess: () => addToFavorites(movie.imdbID),
  });

  const isFavorited = useMemo(() => {
    return favorites.some(({movieId}) => movieId === movie.imdbID);
  }, [favorites, movie]);

  function toggleFavorite(e: GestureResponderEvent) {
    e.stopPropagation();
    if (isFavorited) {
      removeFromFavoritesMutation.mutate({
        movieId: movie.imdbID,
      });
      return;
    }
    addToFavoritesMutation.mutate({
      movieId: movie.imdbID,
    });
  }

  function onExpand() {
    toggleShowMore(movie);
  }

  return (
    <Pressable onPress={onExpand}>
      <View style={[styles.container, cardStyle({})]}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{movie.Title}</Text>
          <RotateIcon duration={duration} rotate={expand}>
            <AIcon name="caretup" color="black" />
          </RotateIcon>
        </View>
        <ExpandableView
          animatedKey={movie.imdbID}
          expand={expand}
          duration={duration}>
          <>
            <Seperator />
            <View
              style={{
                flexDirection: 'row',
                columnGap: 10,
              }}>
              <Image source={{uri: movie.Poster}} style={styles.poster} />
              <View style={styles.info}>
                <Text style={styles.title}>{movie.Title}</Text>
                <MovieDescription
                  isLoading={isLoading}
                  description={movieData?.Plot}
                />
                <Button
                  disabled={
                    removeFromFavoritesMutation.isPending ||
                    addToFavoritesMutation.isPending
                  }
                  color={isFavorited ? 'red' : success}
                  title={isFavorited ? 'Unfavorite' : 'Favorite'}
                  onPress={toggleFavorite}
                />
              </View>
            </View>
          </>
        </ExpandableView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    columnGap: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 5,
  },
  cardTitle: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  desc: {
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
  },
  poster: {
    height: '100%',
    width: 125,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    rowGap: 10,
  },
  btn: {
    width: 'auto',
  },
});
