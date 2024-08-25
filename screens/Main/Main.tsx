/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import Movies from '../Movies/Movies';
import Favorites from '../Favorites/Favorites';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';

import {AuthTokens, fetchAuthSession} from 'aws-amplify/auth';
import {useQuery} from '@tanstack/react-query';
import Splash from '../Splash/Splash';
import axios from '../../utils/axios';
import useFavoritedMoviesStore from '../../stores/favoritedMoviesStore';
import Header from '../../components/Header/Header';

const Tab = createBottomTabNavigator();

const Main = () => {
  const setFavoritedMovies = useFavoritedMoviesStore(
    state => state.setFavoritedMovies,
  );

  const {isFetching} = useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      setFavoritedMovies([]);

      const session = await fetchAuthSession({forceRefresh: true});
      return session?.tokens;
    },
    meta: {
      onSuccess: async (tokens?: AuthTokens) => {
        if (!tokens) {
          return;
        }

        axios.interceptors.request.clear();
        axios.interceptors.request.use(request => {
          request.headers.Authorization = tokens.idToken?.toString();
          return request;
        });
      },
    },
  });

  if (isFetching) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movies"
        screenOptions={{
          header() {
            return <Header />;
          },
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
  );
};

export default Main;
