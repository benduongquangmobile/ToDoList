import React, {useState} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet} from 'react-native';
import {mockTasks} from '../mockData/tasks';
import TaskCard from '../components/TaskCard';
import Fab from '../components/Fab';

const HomeScreen = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id.toString() !== id));
  };

  const handleEdit = (id: string, text: string) => {
    setTasks(
      tasks.map(task => (task.id.toString() === id ? {...task, text} : task)),
    );
  };

  const handleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id.toString() === id
          ? {...task, completed: !task.completed}
          : task,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskCard
              task={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Fab
          onPress={() => {
            // add new task
            const task = {
              id: tasks[tasks.length - 1].id + 1,
              text: 'New Task',
              completed: false,
            };
            setTasks([...tasks, task]);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
