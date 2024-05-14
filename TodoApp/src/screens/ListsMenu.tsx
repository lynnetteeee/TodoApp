import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  // NativeEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {Task} from './TodoScreen';
// import {eventEmitter} from '../utils/eventEmitter';
import {useTodos} from '../contexts/TodoContext';

export interface List {
  id: number;
  name: string;
  todos: Task[];
}

const styles = StyleSheet.create({
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#daebf2',
    elevation: 3,
  },
  listTitleText: {
    color: '#255263',
    paddingLeft: 15,
    paddingVertical: 5,
    fontSize: 18,
  },
  deleteButton: {
    paddingRight: 15,
    paddingVertical: 5,
    marginLeft: 10,
    fontSize: 18,
    color: '#255263',
    textAlign: 'right',
  },
  deleteButtonText: {
    color: 'grey',
    fontSize: 18,
  },
});

// const eventEmitter = new NativeEventEmitter();

const ListsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const {lists, addList, deleteList} = useTodos();
  // const [lastListId, setLastListId] = useState(0);

  // useEffect(() => {
  //   if (lists.length > 0) {
  //     setLastListId(lists[lists.length - 1].id);
  //   }
  // }, [lists]);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ListsMenu'>>();

  // useEffect(() => {
  //   const updateTodosListener = eventEmitter.addListener(
  //     'updateTodos',
  //     (event: {listId: number; updatedTodos: Task[]}) => {
  //       const {listId, updatedTodos} = event;
  //       setLists(currentLists => {
  //         const newLists = currentLists.map(list => {
  //           if (list.id === listId) {
  //             // shallow copy the other params, only change todos
  //             return {...list, todos: updatedTodos};
  //           }
  //           return list;
  //         });
  //         console.log('Updated lists: ', newLists);
  //         return newLists; // new state that React will set
  //       });
  //     },
  //   );
  //   return () => {
  //     updateTodosListener.remove();
  //   };
  // }, []);

  const handleAddList = () => {
    const newListId =
      lists.reduce((maxId, list) => Math.max(list.id, maxId), 0) + 1;
    const newList: List = {
      id: newListId,
      name: newListName,
      todos: [],
    };
    addList(newList);
    setModalVisible(false);
    setNewListName('');
  };

  const handleDeleteList = (id: number) => {
    deleteList(id);
  };

  // const handleUpdateTodos = (listId: number, updatedTodos: Task[]) => {
  //   setLists(currentLists =>
  //     currentLists.map(list => {
  //       if (list.id === listId) {
  //         return {...list, todos: updatedTodos};
  //       }
  //       return list;
  //     }),
  //   );
  // };

  const listsHeader = lists.length ? (
    <Text style={styles.header}>Your Todo Lists</Text>
  ) : null;

  return (
    <View style={styles.container}>
      <Button
        color="#2f80a1"
        title="Create New List +"
        onPress={() => setModalVisible(true)}
      />
      {listsHeader}
      {lists.map(list => (
        <View key={list.id} style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TodoScreen', {
                listId: list.id,
                listTitle: list.name,
                todos: list.todos,
              })
            }>
            <Text style={styles.listTitleText} numberOfLines={2}>
              {list.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteList(list.id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>x</Text>
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
            placeholder="Enter the name of your new list"
            value={newListName}
            onChangeText={setNewListName}
          />
          <Button color="#2f80a1" title="Create List" onPress={handleAddList} />
        </View>
      </Modal>
    </View>
  );
};

export default ListsMenu;
