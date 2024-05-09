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

// placeholder for actual styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: {
    color: '255263',
    fontSize: 18,
    flex: 1,
  },
  taskTextDone: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

const TodoScreen = () => {
  interface Task {
    id: number;
    description: string;
    is_done: boolean;
    todo_list_id: number;
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastTaskId, setLastTaskId] = useState(0);

  interface TodoScreenRouteParams {
    listid: number;
    listTitle: string;
  }
  const route = useRoute();
  const params = route.params as TodoScreenRouteParams;
  const {listid, listTitle} = params;

  const handleAddTask = () => {
    const newTask = {
      id: lastTaskId + 1,
      description: newTaskDescription,
      is_done: false,
      todo_list_id: listid,
    };
    setTasks(currentTasks => [...currentTasks, newTask]);
    setLastTaskId(lastTaskId + 1);
    setModalVisible(false);
    setNewTaskDescription('');
  };

  // allow toggling
  const handleCompleteTask = (id: number) => {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id === id) {
          return {...task, is_done: !task.is_done};
        }
        return task;
      }),
    );
  };

  const taskHeader = tasks.length > 0 ? <Text>Tasks:</Text> : null;

  return (
    <View style={styles.container}>
      <Text>{listTitle}</Text>
      <Button
        color="#2f80a1"
        title="Add New Task +"
        onPress={() => setModalVisible(true)}
      />
      {taskHeader}
      {tasks.map(task => (
        <View key={task.id}>
          <Text style={task.is_done ? styles.taskTextDone : styles.taskText}>
            {task.description}
          </Text>
          <TouchableOpacity onPress={() => handleCompleteTask(task.id)} />
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View>
          <TextInput
            placeholder="Enter task description"
            onChangeText={text => setNewTaskDescription(text)}
            value={newTaskDescription}
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      </Modal>
    </View>
  );
};

export default TodoScreen;
