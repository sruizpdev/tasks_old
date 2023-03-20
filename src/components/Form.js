import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  SafeAreaView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import {generateId} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({task, setTask, tasks, setTasks, modalVisible, setModalVisible}) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setTaskName(task.taskName);
    }
  }, [task]);

  const handleTask = () => {
    const storeData = async value => {
      try {
        const jsonValue = JSON.stringify(value);
        console.log('Justo antes de almacenar', jsonValue);
        await AsyncStorage.setItem('tasks', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    if (taskName === '') {
      setError(true);
      return;
    }
    setError(false);
    const taskObject = {
      taskName,
    };

    if (task.id) {
      taskObject.id = task.id;
      const tasksUpdated = tasks.map(taskState =>
        taskState.id === task.id ? taskObject : taskState,
      );

      setTasks(tasksUpdated);
      setTask({});
    } else {
      taskObject.id = generateId();

      setTasks([...tasks, taskObject]);

      storeData(tasks);
    }
    setTaskName('');
    setModalVisible(false);
  };
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Introduce una nueva tarea"
            value={taskName}
            onChangeText={setTaskName}
          />
          <Pressable onPress={handleTask} style={styles.btnNewTask}>
            <Text style={styles.btnNewTaskText}>{task.id ? '-' : '+'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 20,
    borderRadius: 50,
    width: '80%',
  },
  btnNewTask: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNewTaskText: {fontWeight: 'bold', fontSize: 30, color: 'white'},
});
export default Form;
