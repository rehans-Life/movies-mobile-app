/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ReactQueryProvider from './providers/ReactQueryProvider';
import Movies from './screens/Movies/Movies';
import Favorites from './screens/Favorites/Favorites';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ReactQueryProvider>
      <>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Movies"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: 'red',
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 500,
              },
            }}>
            <Tab.Screen
              name="Movies"
              component={Movies}
              options={{
                tabBarIcon: ({size, color}) => (
                  <AIcon name="camera" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={Favorites}
              options={{
                tabBarIcon: ({size, color}) => (
                  <AIcon name="star" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    </ReactQueryProvider>
  );
}

export default App;
