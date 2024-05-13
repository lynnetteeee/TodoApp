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
import {Task} from './src/screens/TodoScreen';

export type RootStackParamList = {
  ListsMenu: undefined;
  TodoScreen: {
    listid: number;
    listTitle: string;
    todos: Task[];
    onUpdateTodos: (todos: Task[]) => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ListsMenu">
      <Stack.Screen name="ListsMenu" component={ListsMenu} />
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{title: 'Todo List'}}
      />
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
