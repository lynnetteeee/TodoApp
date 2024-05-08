/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ListsMenu from './src/screens/ListsMenu';
import TodoScreen from './src/screens/TodoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ListsMenu">
      <Stack.Screen name="ListsMenu" component={ListsMenu} />
      <Stack.Screen name="TodoScreen" component={TodoScreen} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
