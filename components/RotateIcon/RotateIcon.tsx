import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

const RotateIcon = ({
  rotate = true,
  duration = 500,
  children,
}: {
  rotate: boolean;
  duration: number;
  children: React.ReactElement;
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: 1 * Number(rotate),
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [rotate, duration, rotateValue]);

  const rotateDeg = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: rotateDeg,
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
};

export default RotateIcon;
