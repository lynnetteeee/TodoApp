import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// placeholder for actual styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ListsMenu = () => {
  return (
    <View style={styles.container}>
      <Text>This page will be used for the menu of all lists!</Text>
    </View>
  );
};
export default ListsMenu;
