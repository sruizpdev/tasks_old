import React from 'react';
import {StyleSheet, View,Text, Pressable} from 'react-native';
import Task from './Task';

const Tasks = ({setTask, tasks, deleteTask}) => {
  return (
   
      <View style={styles.container}>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            setTask={setTask}
            deleteTask={deleteTask}
          />
        ))}
      </View>
      
   
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default Tasks;
