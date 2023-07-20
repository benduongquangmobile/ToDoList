import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Fab = (props: {onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.fab} {...props}>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 9999,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default Fab;
