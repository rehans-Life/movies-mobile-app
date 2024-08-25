import {AxiosError} from 'axios';
import {APIError} from './interfaces';
import Toast from 'react-native-toast-message';
import {StyleSheet} from 'react-native';

export default function errorHandler(error: AxiosError<APIError>) {
  const heading = 'An Error Occured!';
  if (error.response) {
    const data = error.response.data;

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    if (data) {
      Toast.show({
        type: 'error',
        text1: heading,
        text2: data.message,
        text1Style: styles.text1Style,
        text2Style: styles.text2Style,
      });
    }
  } else if (error.request) {
    console.log(error.request);

    Toast.show({
      type: 'error',
      text1: heading,
      text2: 'Something went wrong please try again later.',
      text1Style: styles.text1Style,
      text2Style: styles.text2Style,
    });
  } else {
    console.log(error.message);

    Toast.show({
      type: 'error',
      text1: heading,
      text2: error.message,
      text1Style: styles.text1Style,
      text2Style: styles.text2Style,
    });
  }
}

const styles = StyleSheet.create({
  text1Style: {
    fontSize: 16,
  },
  text2Style: {
    fontSize: 14,
  },
});
