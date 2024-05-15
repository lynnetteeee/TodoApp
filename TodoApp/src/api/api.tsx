import axios from 'axios';
import {Alert} from 'react-native';

const apiClient = axios.create({
  baseURL: 'https://ttm-todo-sample.herokuapp.com/api',
});

export const SUCCESS_STATUS = 200;

// ------------------------ used in TodoContext.tsx ------------------------

// Handles GET requests to fetch todo lists.
export const getTodoLists = () => {
  return apiClient.get('/todo-lists');
};

// Handles POST requests to create a new todo list.
// "todos" parameter not needed, as it is supposed to be empty for a new list.
export const createTodoList = (id: number, name: string) => {
  return apiClient.post('/todo-lists', {id, name});
};

// Handles DELETE requests to remove an existing todo list.
export const deleteTodoList = (id: number) => {
  return apiClient.delete(`/todo-lists/${id}`);
};

// ------------------------ used in TodoScreen.tsx ------------------------

// Handles GET requests to fetch todos for a specific list.
export const getSpecificListWithTodos = (todo_list_id: number) => {
  return apiClient.get(`/todo-lists/${todo_list_id}`);
};

// Handles PUT requests to update an existing todo.
// Needed when there is a change in "is_done" parameter.
export const updateTodo = (
  todo_id: number,
  description: string,
  is_done: boolean,
  todo_list_id: number,
) => {
  return apiClient.put(`/todos/${todo_id}`, {
    id: todo_id,
    description,
    is_done,
    todo_list_id,
  });
};

// Handles POST requests to create a new todo within a list.
// The actual posting is to a "global" list of all todos, identified by unique todo_id.
export const createTodo = (
  todo_id: number,
  description: string,
  is_done: boolean,
  todo_list_id: number,
) => {
  try {
    return apiClient.post('/todos', {
      id: todo_id,
      description,
      is_done,
      todo_list_id,
    });
  } catch (error: any) {
    Alert.alert('Error creating todo:', error.message);
    throw error;
  }
};

// Handles DELETE requests to remove an existing todo.
export const deleteTodo = (id: number) => {
  return apiClient.delete(`/todos/${id}`);
};

// ------------------------ others included for completeness ------------------------

// Handles PUT requests to update an existing list.
// Note: ONLY allows updating the name of the list, not the todos.
export const updateTodoList = (id: number, name: string) => {
  return apiClient.put(`/todo-lists/${id}`, {id, name});
};

// Handles GET requests to fetch a specific todo.
export const getSpecificTodo = (id: number) => {
  return apiClient.get(`/todos/${id}`);
};
