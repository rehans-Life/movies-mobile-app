import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import ReactQueryProvider from './providers/ReactQueryProvider';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastConfig,
} from 'react-native-toast-message';

import {Amplify} from 'aws-amplify';
import Main from './screens/Main/Main';
import {USER_POOL_CLIENT_ID, USER_POOL_ID} from '@env';

const toastConfig: ToastConfig = {
  error: props => (
    <ErrorToast {...props} style={[styles.toast, styles.toastError]} />
  ),
  success: props => (
    <SuccessToast {...props} style={[styles.toast, styles.toastSuccess]} />
  ),
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: USER_POOL_CLIENT_ID!,
      userPoolId: USER_POOL_ID!,
      identityPoolId: '',
      loginWith: {
        username: true,
        email: true,
      },
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      signUpVerificationMethod: 'code',
      mfa: {
        status: 'off',
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
});

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  return (
    <ReactQueryProvider>
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Main />
        <Toast config={toastConfig} />
      </>
    </ReactQueryProvider>
  );
}

const styles = StyleSheet.create({
  toastError: {borderLeftColor: 'red'},
  toastSuccess: {borderLeftColor: 'green'},
  toast: {borderLeftColor: 'red', width: '95%'},
});

export default withAuthenticator(App);
