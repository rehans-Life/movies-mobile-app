import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input({
  label,
  placeholder,
  value,
  setValue,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <View style={styles.inputContainer}>
      {styles.label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={newValue => setValue(newValue)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderColor: 'black',
  },
});
