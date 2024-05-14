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
import {TodoProvider} from './src/contexts/TodoContext';

export type RootStackParamList = {
  ListsMenu: undefined;
  TodoScreen: {
    listId: number;
    listTitle: string;
    todos: Task[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <TodoProvider>
      <Stack.Navigator initialRouteName="ListsMenu">
        <Stack.Screen name="ListsMenu" component={ListsMenu} />
        <Stack.Screen
          name="TodoScreen"
          component={TodoScreen}
          options={{title: 'Todo List'}}
        />
      </Stack.Navigator>
    </TodoProvider>
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
