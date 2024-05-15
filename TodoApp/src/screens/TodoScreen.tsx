import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {generateNewId} from '../utils/idGenerator';
import {useTodos} from '../contexts/TodoContext';
import {
  SUCCESS_STATUS,
  createTodo,
  updateTodo,
  getSpecificListWithTodos,
} from '../api/api';

export interface Task {
  id: number;
  description: string;
  is_done: boolean;
  listId: number;
}

interface TodoScreenRouteParams {
  listId: number;
  listTitle: string;
}

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  modalView: {
    marginTop: '50%',
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: 250,
    marginBottom: 15,
    borderBottomWidth: 1,
    padding: 5,
    color: 'black',
  },
  inputDescription: {
    marginBottom: 15,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    color: '#a2a3a2',
    fontSize: 12,
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#daebf2',
    elevation: 3,
  },
  taskDescription: {
    color: '#255263',
    paddingLeft: 15,
    paddingVertical: 5,
    fontSize: 18,
  },
  taskText: {
    color: '#255263',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

const TodoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const route = useRoute();
  const params = route.params as TodoScreenRouteParams;
  const {listId, listTitle} = params;
  const {lists, updateTodos} = useTodos();
  const currentList = lists.find(list => list.id === listId) ?? {
    id: listId,
    name: listTitle,
    todos: [],
  };

  useEffect(() => {
    getSpecificListWithTodos(listId)
      .then(response => {
        updateTodos(listId, response.data.todos || []);
      })
      .catch((error: any) => console.error('Error fetching todos', error));
  }, [listId, updateTodos]);

  const handleAddTask = async () => {
    try {
      const newTaskId = generateNewId();
      const newTask: Task = {
        id: newTaskId,
        description: newTaskDescription,
        is_done: false,
        listId: listId,
      };
      const response = await createTodo(
        newTask.id,
        newTask.description,
        newTask.is_done,
        newTask.listId,
      );
      if (response.status === SUCCESS_STATUS) {
        const updatedTasks = [...currentList.todos, newTask];
        updateTodos(listId, updatedTasks);
        setModalVisible(false);
        setNewTaskDescription('');
      } else {
        console.error('Failed to create new task:', response);
      }
    } catch (error: any) {
      console.error(
        'Error in handleAddTask:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const handleCompleteTask = async (id: number) => {
    const specificTask = currentList.todos.find(task => task.id === id);
    if (!specificTask) {
      console.error('Task not found');
      return;
    }
    const response = await updateTodo(
      id,
      specificTask.description,
      !specificTask.is_done,
      listId,
    );
    if (response.status === SUCCESS_STATUS) {
      const specificList = await getSpecificListWithTodos(listId);
      updateTodos(listId, specificList.data.todos);
    } else {
      console.error('Error updating task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>{listTitle}</Text>
      <Button
        color="#2f80a1"
        title="Add New Task +"
        onPress={() => setModalVisible(true)}
      />
      {currentList.todos && currentList.todos.length > 0 ? (
        currentList.todos.map(task => (
          <TouchableOpacity
            key={task.id}
            style={styles.buttonContainer}
            onPress={() => handleCompleteTask(task.id)}>
            <Text
              style={[
                styles.taskDescription,
                task.is_done ? styles.taskTextDone : styles.taskText,
              ]}>
              {task.description}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No tasks available</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Enter task description"
            value={newTaskDescription}
            onChangeText={setNewTaskDescription}
          />
          <Button title="Add Task" onPress={handleAddTask} color="#2f80a1" />
        </View>
      </Modal>
    </View>
  );
};

export default TodoScreen;
