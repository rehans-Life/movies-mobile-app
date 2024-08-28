import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../Button/Button';
import userSelector from '../../utils/userSelector';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

const Header = () => {
  const {user, signOut} = useAuthenticator(userSelector);

  return (
    <View style={styles.header}>
      <Text style={styles.username}>{user.username}</Text>
      <Button
        text="Sign Out"
        buttonStyle={styles.signOutBtnStyle}
        onPress={() => signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  signOutBtnStyle: {
    backgroundColor: 'red',
  },
});

export default Header;
