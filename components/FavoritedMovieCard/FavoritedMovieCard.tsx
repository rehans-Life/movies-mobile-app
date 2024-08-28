import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import React from 'react';
import {getMovie} from '../../utils/api';
import {FavoritedMovieId} from '../../utils/interfaces';
import AIcon from 'react-native-vector-icons/AntDesign';
import {cardStyle} from '../../globalStyles';
import {useQuery} from '@tanstack/react-query';
import Skeleton from '../Skeleton/Skeleton';

const FavoritedMovieCard = ({
  movie,
  onPress,
}: {
  movie: FavoritedMovieId;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const {data: movieData, isLoading} = useQuery({
    queryKey: ['movies', movie.movieId],
    staleTime: Infinity,
    queryFn: getMovie,
  });

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          cardStyle({
            borderColor: 'red',
            shadowColor: 'rgba(255, 0, 0, 0.25)',
          }),
        ]}>
        <View style={styles.textContainer}>
          {isLoading ? (
            <Skeleton height={16} borderRadius={2} width={'75%'} />
          ) : (
            <Text style={styles.title}>{movieData?.Title}</Text>
          )}
        </View>
        <AIcon name={'heart'} size={24} color={'red'} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 5,
  },
  textContainer: {flex: 1},
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default FavoritedMovieCard;
