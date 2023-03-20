import React, {useState} from 'react';

import {Text, StyleSheet, View, Button, Pressable} from 'react-native';

const Task = ({task, setTask, deleteTask}) => {
  const {id, taskName} = task;
  const [selected, setSelected] = useState(false);

  const handleCheckbox = () => {
    setSelected(true);
    setTimeout(() => {
      deleteTask(id);
      setSelected(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.taskText}> {taskName}</Text>
      </View>
      
      <View style={styles.btnContainer}>
        <Pressable onPress={() => setTask(task)} style={styles.btnEdit}>
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>

        <Pressable onPress={handleCheckbox} style={styles.btnDelete}>
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  taskText: {
    fontSize: 20,
    width: '70%',
  },
  btnEdit: {},
  btnDelete: {marginLeft: 10},
  btnText: {},
});
export default Task;
