import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Modal, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';

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

const ListsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [lists, setLists] = useState<{id: number; name: string}[]>([]);

  const [lastListId, setLastListId] = useState(0);

  const handleAddList = () => {
    const newList = {
      id: lastListId + 1,
      name: newListName,
    };
    setLists(currentLists => [...currentLists, newList]);
    setLastListId(newList.id);
    setModalVisible(false);
    setNewListName('');
  };

  const handleDeleteList = (id: number) => {
    setLists(currentLists => currentLists.filter(list => list.id !== id));
  };

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ListsMenu'>>();

  // check if there is at least one list, then include header "Your Todo Lists"
  // then map through the lists to display them
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
                listid: list.id,
                listTitle: list.name,
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
          <Text style={styles.inputDescription}>
            You may add your individual tasks later!
          </Text>
          <Button color="#2f80a1" title="Create List" onPress={handleAddList} />
        </View>
      </Modal>
    </View>
  );
};

export default ListsMenu;
