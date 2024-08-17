/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Seperator from '../Seperator/Seperator';
import {Movie} from '../../utils/api';
import {globalStyles} from '../../globalStyles';
import Input from '../Input/Input';

interface RenderMovie {
  movie: Movie;
  index: number;
  flatList: FlatList | null;
}

interface MovieListWithSearchProps {
  enableSearch: true;
  searchValue: string;
  onSearch: (search: string) => void;
  searchPlaceholder?: string;
  searchLabel?: string;
}

interface MovieListWithoutSearchProps {
  enableSearch: false;
}

interface MovieListProps {
  heading: string;
  movies: Movie[];
  empty: React.ReactElement;
  renderMovie: (args: RenderMovie) => React.ReactElement;
}

function isMovieSearchProps(obj: any): obj is MovieListWithSearchProps {
  if (!obj) {
    return false;
  }
  return obj.enableSearch === true && 'searchValue' in obj && 'onSearch' in obj;
}

export default function MoviesList({
  heading = 'Movies',
  empty,
  movies,
  renderMovie,
  ...props
}: MovieListProps & (MovieListWithSearchProps | MovieListWithoutSearchProps)) {
  const listRef = useRef<FlatList>(null);

  return (
    <FlatList<Movie>
      ref={listRef}
      contentContainerStyle={styles.listContentStyle}
      data={movies}
      keyExtractor={({imdbID}) => imdbID}
      renderItem={({item: movie, index}) => {
        return renderMovie({movie, index, flatList: listRef.current});
      }}
      ItemSeparatorComponent={() => <Seperator />}
      ListHeaderComponent={
        <View style={styles.listHeaderStyle}>
          <Text style={globalStyles.heading}>{heading}</Text>
          {isMovieSearchProps(props) && (
            <Input
              label={props.searchLabel}
              placeholder={props.searchPlaceholder}
              value={props.searchValue}
              setValue={props.onSearch}
            />
          )}
        </View>
      }
      ListEmptyComponent={empty}
    />
  );
}

const styles = StyleSheet.create({
  listContentStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  listHeaderStyle: {
    rowGap: 10,
    marginBottom: 25,
  },
});
