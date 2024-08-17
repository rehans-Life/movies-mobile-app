import {StyleSheet, ViewStyle} from 'react-native';

export const success = '#33BB76';

export const globalStyles = StyleSheet.create({
  emptyText: {
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

interface ICardStyle {
  borderColor?: string;
  shadowColor?: string;
  backgroundColor?: string;
}

export function cardStyle({
  borderColor = 'black',
  shadowColor = 'grey',
  backgroundColor = 'white',
}: ICardStyle): ViewStyle {
  return {
    borderColor,
    backgroundColor,
    shadowColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  };
}
