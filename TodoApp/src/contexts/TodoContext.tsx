import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {List} from '../screens/ListsMenu';
import {Task} from '../screens/TodoScreen';
import {
  SUCCESS_STATUS,
  getTodoLists,
  createTodoList,
  deleteTodoList,
  deleteTodo,
} from '../api/api';

interface TodoContextType {
  lists: List[];
  addList: (list: List) => void;
  updateTodos: (listId: number, updatedTodos: Task[]) => void;
  deleteList: (listId: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({children}: TodoProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    getTodoLists()
      .then(response => {
        setLists(response.data);
      })
      .catch(error => console.error('Error fetching todo lists', error));
  }, []);

  // Adds a new list
  const addList = async (list: List) => {
    const response = await createTodoList(list.id, list.name);
    if (response.status === SUCCESS_STATUS) {
      setLists(prevLists => [...prevLists, list]);
    } else {
      console.error('Error creating new list');
    }
  };

  // Updates todos in an existing list
  const updateTodos = (listId: number, updatedTodos: Task[]) => {
    console.log(`Updating todos for list ${listId}`);
    // Directly update the local state without making unnecessary API call
    setLists(prevLists => {
      const newLists = prevLists.map(list =>
        list.id === listId ? {...list, todos: updatedTodos} : list,
      );
      console.log('New lists state:', newLists);
      return newLists;
    });
  };

  // Deletes a list
  const deleteList = async (listId: number) => {
    try {
      const listToDelete = lists.find(list => list.id === listId);
      if (!listToDelete) {
        console.error('List not found');
        return;
      }
      // Delete all todo items in the list
      await Promise.all(listToDelete.todos.map(todo => deleteTodo(todo.id)));
      const response = await deleteTodoList(listId);
      if (response.status === SUCCESS_STATUS) {
        setLists(prevLists => prevLists.filter(list => list.id !== listId));
      } else {
        console.error('Error deleting list');
      }
    } catch (error) {
      console.error('Error in deleteList:', error);
    }
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
