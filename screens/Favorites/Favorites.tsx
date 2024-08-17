/* eslint-disable react-native/no-inline-styles */
import {View, Text, Modal, Pressable} from 'react-native';
import React, {useMemo, useState} from 'react';
import useMoviesStore from '../../stores/moviesStore';
import {globalStyles, success} from '../../globalStyles';
import MoviesList from '../../components/MoviesList/MoviesList';
import FavoritedMovieCard from '../../components/FavoritedMovieCard/FavoritedMovieCard';
import CenteredModal from '../../components/CenteredModal/CenteredModal';
import Button from '../../components/Button/Button';
import {Movie} from '../../utils/api';
import ModalContent from '../../components/ModalContent/ModalContent';

const Favorites = () => {
  const {favorites, removeFromFavorites} = useMoviesStore(state => state);

  const [search, setSearch] = useState('');
  const [movieToBeUnFavorited, setMovieToBeUnFavorited] = useState<Movie>();

  const filteredFavoritedMovies = useMemo(() => {
    return favorites.filter(
      ({Title}) => !search || Title.match(new RegExp(`^${search}`, 'i')),
    );
  }, [favorites, search]);

  return (
    <View style={globalStyles.container}>
      <Modal
        visible={Boolean(movieToBeUnFavorited)}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setMovieToBeUnFavorited(undefined);
        }}>
        <CenteredModal onPressedOut={() => setMovieToBeUnFavorited(undefined)}>
          <ModalContent
            heading="Are you Sure?"
            description="Are you sure you want to unfavorite this movie."
            actions={[
              <Button
                key="yes"
                text="Yes"
                onPress={() => {
                  if (movieToBeUnFavorited) {
                    removeFromFavorites(movieToBeUnFavorited);
                  }
                  setMovieToBeUnFavorited(undefined);
                }}
                buttonStyle={{
                  backgroundColor: success,
                  minWidth: 100,
                }}
              />,
              <Button
                key="cancel"
                text="Cancel"
                onPress={() => setMovieToBeUnFavorited(undefined)}
                buttonStyle={{
                  backgroundColor: 'red',
                  minWidth: 100,
                }}
              />,
            ]}
          />
        </CenteredModal>
      </Modal>
      <MoviesList
        movies={filteredFavoritedMovies}
        enableSearch
        heading="Favorited Movies"
        searchValue={search}
        onSearch={setSearch}
        searchLabel="Search for Movies"
        searchPlaceholder="Filter By Name"
        renderMovie={({movie}) => {
          return (
            <Pressable
              onPress={() => {
                setMovieToBeUnFavorited(movie);
              }}>
              <FavoritedMovieCard movie={movie} />
            </Pressable>
          );
        }}
        empty={
          <Text style={globalStyles.emptyText}>
            • You have not favorited any movies yet.
          </Text>
        }
      />
    </View>
  );
};

export default Favorites;
