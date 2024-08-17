import {Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';

interface SkeletonProps {
  height: number;
  width?: number;
  borderRadius?: number;
}

const Skeleton = ({height, width, borderRadius}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 500,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {opacity, height: height, width, borderRadius: borderRadius},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'gray',
  },
});

export default Skeleton;
