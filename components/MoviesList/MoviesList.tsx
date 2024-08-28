/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Seperator from '../Seperator/Seperator';
import {globalStyles} from '../../globalStyles';
import Input from '../Input/Input';

interface RenderMovie<T> {
  movie: T;
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

interface MovieListProps<T> {
  keyToBeExtracted?: string;
  heading: string;
  movies: T[];
  empty: React.ReactElement;
  renderMovie: (args: RenderMovie<T>) => React.ReactElement;
}

function isMovieSearchProps(obj: any): obj is MovieListWithSearchProps {
  if (!obj) {
    return false;
  }
  return obj.enableSearch === true && 'searchValue' in obj && 'onSearch' in obj;
}

export default function MoviesList<T>({
  keyToBeExtracted = 'imdbID',
  heading = 'Movies',
  empty,
  movies,
  renderMovie,
  ...props
}: MovieListProps<T> &
  (MovieListWithSearchProps | MovieListWithoutSearchProps)) {
  const listRef = useRef<FlatList>(null);

  return (
    <FlatList
      ref={listRef}
      contentContainerStyle={styles.listContentStyle}
      data={movies}
      keyExtractor={item => item[keyToBeExtracted]}
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
