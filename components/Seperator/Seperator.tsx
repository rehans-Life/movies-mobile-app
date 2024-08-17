import {View} from 'react-native';
import React from 'react';

export default function Seperator({height = 15}: {height?: number}) {
  return <View style={{height}} />;
}
