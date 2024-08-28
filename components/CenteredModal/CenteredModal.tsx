import {StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CenteredModal = ({
  children,
  onPressedOut,
}: {
  children: React.ReactElement;
  onPressedOut?: () => void;
}) => {
  return (
    <Pressable onPress={onPressedOut} style={styles.pressebleContainer}>
      <Pressable onPress={e => e.stopPropagation()}>{children}</Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressebleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});

export default CenteredModal;
