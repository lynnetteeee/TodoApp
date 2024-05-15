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
// NOTE: "todos" parameter not needed, initialised as [] by default.
export const createTodoList = (id: number, name: string) => {
  return apiClient.post('/todo-lists', {id, name});
};

// Handles DELETE requests to remove an existing todo list.
export const deleteTodoList = (id: number) => {
  return apiClient.delete(`/todo-lists/${id}`);
};

// ------------------------ used in TodoScreen.tsx ------------------------

// Handles GET requests to fetch todos for a specific todo-list.
export const getSpecificListWithTodos = (todo_list_id: number) => {
  return apiClient.get(`/todo-lists/${todo_list_id}`);
};

// Handles PUT requests to update an existing todo.
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

// Handles POST requests to create a new todo in a "global" list of all todos.
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
