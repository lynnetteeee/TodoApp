import React, {createContext, useContext, useState, ReactNode} from 'react';
import {List} from '../screens/ListsMenu';
import {Task} from '../screens/TodoScreen';

// Defines the types of actions or operations you can perform in the context
interface TodoContextType {
  lists: List[];
  addList: (list: List) => void;
  updateTodos: (listId: number, updatedTodos: Task[]) => void;
  deleteList: (listId: number) => void;
}

// Creates context with undefined initial value but with the correct type
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider Props Type
interface TodoProviderProps {
  children: ReactNode;
}

// Provider component
export const TodoProvider = ({children}: TodoProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);

  // Adds a new list
  const addList = (list: List) => {
    setLists(prevLists => [...prevLists, list]);
  };

  // Updates todos in an existing list
  const updateTodos = (listId: number, updatedTodos: Task[]) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? {...list, todos: updatedTodos} : list,
      ),
    );
  };

  // Deletes a list
  const deleteList = (listId: number) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  };

  return (
    <TodoContext.Provider value={{lists, addList, updateTodos, deleteList}}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using the context
// To be used in TodoScreen and ListsMenu components
export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
