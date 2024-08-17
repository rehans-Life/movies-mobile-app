import {ViewStyle, Pressable, TextStyle, StyleSheet, Text} from 'react-native';
import React from 'react';

const Button = ({
  text,
  buttonStyle,
  textStyle,
  onPress,
}: {
  text?: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 500,
  },
});

export default Button;
