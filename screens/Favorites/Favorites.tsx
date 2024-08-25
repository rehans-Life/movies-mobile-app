/* eslint-disable react-native/no-inline-styles */
import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, success} from '../../globalStyles';
import MoviesList from '../../components/MoviesList/MoviesList';
import FavoritedMovieCard from '../../components/FavoritedMovieCard/FavoritedMovieCard';
import CenteredModal from '../../components/CenteredModal/CenteredModal';
import Button from '../../components/Button/Button';
import {getFavoritedMovies} from '../../utils/api';
import {FavoritedMovieId} from '../../utils/interfaces';
import ModalContent from '../../components/ModalContent/ModalContent';
import {useMutation, useQuery} from '@tanstack/react-query';
import {removeFromFavorites as removeFromFavoritesFN} from '../../utils/api';
import SkeletonList from '../../components/SkeletonList/SkeletonList';
import useFavoritedMoviesStore from '../../stores/favoritedMoviesStore';
import Toast from 'react-native-toast-message';

const Favorites = () => {
  const {favorites, removeFromFavorites, setFavoritedMovies} =
    useFavoritedMoviesStore(state => state);

  const [movieToBeUnFavorited, setMovieToBeUnFavorited] =
    useState<FavoritedMovieId>();

  const {isFetching} = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoritedMovies,
    meta: {
      onSuccess: (favoritedMovies: FavoritedMovieId[]) => {
        setFavoritedMovies(favoritedMovies);
      },
    },
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: removeFromFavoritesFN,
    onSuccess() {
      if (!movieToBeUnFavorited) {
        return;
      }
      removeFromFavorites(movieToBeUnFavorited.movieId);
      setMovieToBeUnFavorited(undefined);
    },
  });

  const onCloseModal = () => {
    if (!removeFromFavoritesMutation.isPending) {
      setMovieToBeUnFavorited(undefined);
    }
  };

  const onUnFavoriteMovie = () => {
    if (movieToBeUnFavorited) {
      removeFromFavoritesMutation.mutate(movieToBeUnFavorited);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Modal
        visible={Boolean(movieToBeUnFavorited)}
        transparent
        animationType="fade"
        onRequestClose={onCloseModal}>
        <CenteredModal onPressedOut={onCloseModal}>
          <ModalContent
            heading="Are you Sure?"
            description="Are you sure you want to unfavorite this movie."
            actions={[
              <Button
                disabled={removeFromFavoritesMutation.isPending}
                key="yes"
                text="Yes"
                onPress={onUnFavoriteMovie}
                buttonStyle={{
                  backgroundColor: success,
                  minWidth: 100,
                }}
              />,
              <Button
                key="cancel"
                text="Cancel"
                onPress={onCloseModal}
                buttonStyle={{
                  backgroundColor: 'red',
                  minWidth: 100,
                }}
              />,
            ]}
          />
        </CenteredModal>
        <Toast />
      </Modal>
      <MoviesList
        keyToBeExtracted="movieId"
        movies={favorites}
        enableSearch={false}
        heading="Favorited Movies"
        renderMovie={({movie}) => {
          return (
            <FavoritedMovieCard
              movie={movie}
              onPress={() => setMovieToBeUnFavorited(movie)}
            />
          );
        }}
        empty={
          isFetching ? (
            <SkeletonList number={6} height={60} borderRadius={10} />
          ) : (
            <Text style={globalStyles.emptyText}>
              • You have not favorited any movies yet.
            </Text>
          )
        }
      />
    </View>
  );
};

export default Favorites;
