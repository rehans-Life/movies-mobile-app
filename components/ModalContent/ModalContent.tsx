import {View, Text, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';

interface ModalContentProps {
  heading: string;
  description: string;
  actions: ReactElement[];
  containerStyle?: ViewStyle;
  headingStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  actionsStyle?: ViewStyle;
}

const ModalContent = ({
  heading,
  description,
  actions,
  containerStyle = {},
  headingStyle = {},
  descriptionStyle = {},
  actionsStyle = {},
}: ModalContentProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {heading && <Text style={[styles.heading, headingStyle]}>{heading}</Text>}
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
      <View style={[styles.actions, actionsStyle]}>{actions}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
    paddingVertical: 25,
    paddingHorizontal: 15,
    shadowColor: 'grey',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    rowGap: 12,
  },
  heading: {fontSize: 20, fontWeight: 'bold', color: 'black'},
  description: {fontSize: 15, fontWeight: '400', color: 'black'},
  actions: {flexDirection: 'row', columnGap: 14},
});

export default ModalContent;
