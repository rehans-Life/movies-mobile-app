/* eslint-disable react-native/no-inline-styles */
import {View, Text, Button, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {getMovie, Movie} from '../../utils/api';
import useMoviesStore from '../../stores/moviesStore';
import {useQuery} from '@tanstack/react-query';
import Seperator from '../Seperator/Seperator';
import AIcon from 'react-native-vector-icons/AntDesign';
import ExpandableView from '../ExpandableView/ExpandableView';
import RotateIcon from '../RotateIcon/RotateIcon';
import {cardStyle, success} from '../../globalStyles';
import MovieDescription from '../MovieDescription/MovieDescription';

export default function MovieCard({
  movie,
  duration,
}: {
  movie: Movie;
  duration: number;
}) {
  const {addToFavorites, removeFromFavorites, toggleShowMore} = useMoviesStore(
    state => state,
  );
  const {data: movieData, isLoading} = useQuery({
    queryKey: ['movies', movie.imdbID],
    queryFn: getMovie,
  });

  return (
    <Pressable
      onPress={_ => {
        toggleShowMore(movie);
      }}>
      <View style={[styles.container, cardStyle({})]}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{movie.Title}</Text>
          <RotateIcon duration={duration} rotate={movie.showMore}>
            <AIcon name="caretup" color="black" />
          </RotateIcon>
        </View>
        <ExpandableView expand={movie.showMore} duration={duration}>
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
                  color={movie.favorite ? 'red' : success}
                  title={movie.favorite ? 'Unfavorite' : 'Favorite'}
                  onPress={e => {
                    e.stopPropagation();
                    if (movie.favorite) {
                      removeFromFavorites(movie);
                      return;
                    }
                    addToFavorites(movie);
                  }}
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
