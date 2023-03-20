import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { generateId } from "../helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Form = ({ task, setTask, tasks, setTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setTaskName(task.taskName);
    }
  }, [task]);

  const handleTask = () => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        console.log("Justo antes de almacenar", jsonValue);
        await AsyncStorage.setItem("tasks", jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    if (taskName === "") {
      setError(true);
      return;
    }
    setError(false);
    const taskObject = {
      taskName,
    };

    if (task.id) {
      taskObject.id = task.id;
      const tasksUpdated = tasks.map((taskState) =>
        taskState.id === task.id ? taskObject : taskState
      );

      setTasks(tasksUpdated);
      setTask({});
    } else {
      taskObject.id = generateId();

      setTasks([...tasks, taskObject]);

      storeData(tasks);
    }
    setTaskName("");
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Introduce una nueva tarea"
          value={taskName}
          onChangeText={setTaskName}
        />
        <Pressable onPress={handleTask} style={styles.btnNewTask}>
          <Text style={styles.btnNewTaskText}>{task.id ? "-" : "+"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    marginBottom: 30,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    flex: 11,
  },
  btnNewTask: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btnNewTaskText: {
    fontSize: 30,
  },
});
export default Form;
