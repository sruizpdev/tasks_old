import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import Form from "./src/components/Form";
import Tasks from "./src/components/Tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("tasks");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.log(e);
      }
    };
    getData().then((response) => setTasks(response));
  }, []);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks([...updatedTasks]);
  };

  useEffect(() => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("tasks", jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(tasks);
  }, [tasks]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>nueva tarea</Text>
        </Pressable>
      </View>
      <View>
        <Form
          task={task}
          setTask={setTask}
          tasks={tasks}
          setTasks={setTasks}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <View style={styles.tasksContainer}>
        <ScrollView>
          <Tasks setTask={setTask} tasks={tasks} deleteTask={deleteTask} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    marginVertical: 30,

    backgroundColor: "green",
  },
  tasksContainer: { backgroundColor: "yellow" },
  footer: {
    backgroundColor: "red",
  },
  title: { textAlign: "center", fontSize: 30, color: "grey" },
});
