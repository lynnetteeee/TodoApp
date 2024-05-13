import React, {useState} from 'react';
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

export interface Task {
  id: number;
  description: string;
  is_done: boolean;
  listId: number;
}

interface TodoScreenRouteParams {
  listId: number;
  listTitle: string;
  todos: Task[];
  onUpdateTodos: (todos: Task[]) => void;
}

// placeholder for actual styles
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
    width: '100%',
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
  const {listId, listTitle, todos, onUpdateTodos} = params;

  const [tasks, setTasks] = useState<Task[]>(todos || []); // Initialize state with todos from params

  const handleAddTask = () => {
    const newTask: Task = {
      id: generateNewId(),
      description: newTaskDescription,
      is_done: false,
      listId: listId, // assign the same listId to each new task in the same list
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setModalVisible(false);
    setNewTaskDescription('');
    onUpdateTodos(updatedTasks);
  };

  const handleCompleteTask = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, is_done: !task.is_done};
      }
      return task;
    });
    setTasks(updatedTasks);
    onUpdateTodos(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>{listTitle}</Text>
      <Button
        color="#2f80a1"
        title="Add New Task +"
        onPress={() => setModalVisible(true)}
      />
      {tasks.map(task => (
        <View key={task.id} style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleCompleteTask(task.id)}>
            <Text
              style={[
                styles.taskDescription,
                task.is_done ? styles.taskTextDone : styles.taskText,
              ]}>
              {task.description}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
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
