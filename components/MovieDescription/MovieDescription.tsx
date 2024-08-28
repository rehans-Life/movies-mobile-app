import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Skeleton from '../Skeleton/Skeleton';
import interpolate from '../../utils/interpolate';

const MovieDescription = ({
  isLoading,
  description,
}: {
  isLoading: boolean;
  description?: string;
}) => {
  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              height={8}
              borderRadius={2}
              width={`${interpolate(0.8, 1, Math.random()) * 100}%`}
            />
          ))}
        <Skeleton height={8} borderRadius={2} width={'60%'} />
      </View>
    );
  }
  return <Text style={styles.desc}>{description}</Text>;
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'column',
    rowGap: 5,
  },
  desc: {
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
  },
});

export default MovieDescription;
