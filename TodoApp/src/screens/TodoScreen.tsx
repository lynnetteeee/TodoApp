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

const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This page will be used to view each todo list!</Text>
    </View>
  );
};

export default TodoScreen;
