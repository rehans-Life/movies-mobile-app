import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Movie} from '../../utils/api';
import AIcon from 'react-native-vector-icons/AntDesign';
import {cardStyle} from '../../globalStyles';

const FavoritedMovieCard = ({movie}: {movie: Movie}) => {
  return (
    <View
      style={[
        styles.container,
        cardStyle({
          borderColor: 'red',
          shadowColor: 'rgba(255, 0, 0, 0.25)',
        }),
      ]}>
      <Text style={styles.title}>{movie.Title}</Text>
      <AIcon name={'heart'} size={24} color={'red'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
});

export default FavoritedMovieCard;
