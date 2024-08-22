import {View} from 'react-native';
import React from 'react';
import Skeleton, {SkeletonProps} from '../Skeleton/Skeleton';
import Seperator from '../Seperator/Seperator';

interface SkeletonListProps extends SkeletonProps {
  seperatorHeight?: number;
  number: number;
}

const SkeletonList = ({
  height,
  borderRadius,
  seperatorHeight,
  width,
  number,
}: SkeletonListProps) => {
  return (
    <View>
      {Array(number)
        .fill(0)
        .map((_, i) => (
          <View key={i}>
            <Skeleton
              height={height}
              width={width}
              borderRadius={borderRadius}
            />
            <Seperator height={seperatorHeight} />
          </View>
        ))}
    </View>
  );
};

export default SkeletonList;
