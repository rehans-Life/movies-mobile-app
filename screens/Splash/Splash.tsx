import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native';
import {success} from '../../globalStyles';

const Splash = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={success} size={30} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Splash;
