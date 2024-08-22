import {Animated, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const ExpandableView = ({
  animatedKey,
  expand = true,
  duration = 500,
  children,
}: {
  animatedKey: string;
  expand?: boolean;
  duration?: number;
  children: React.ReactElement;
}) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: viewHeight * Number(expand),
      duration: duration,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand]);

  return (
    <Animated.View
      key={animatedKey}
      style={[styles.animatedContainer, {height: animatedHeight}]}>
      <View
        style={styles.wrapper}
        onLayout={event => {
          setViewHeight(event.nativeEvent.layout.height);
        }}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default ExpandableView;
