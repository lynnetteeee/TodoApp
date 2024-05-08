import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Modal, TextInput} from 'react-native';

// placeholder for actual styles of the containers added for each todo list
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
    padding: 10,
  },
});

const ListsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    console.log('List to add:', newListName);
    setModalVisible(false);
    setNewListName('');
  };

  return (
    <View style={styles.container}>
      <Button
        color="#3c9cc2"
        title="Create New List +"
        onPress={() => setModalVisible(true)}
      />
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
            placeholder="Enter new todo-list name"
            value={newListName}
            onChangeText={setNewListName}
          />
          <Button color="#3c9cc2" title="Add List" onPress={handleAddList} />
        </View>
      </Modal>
    </View>
  );
};

export default ListsMenu;
