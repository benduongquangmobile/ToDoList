import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(task.text);

  const handleSave = () => {
    if (!currentText.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    onEdit(task.id.toString(), currentText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {text: 'Cancel'},
        {
          text: 'Delete',
          onPress: () => onDelete(task.id.toString()),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      {!isEditing ? (
        <TouchableOpacity
          style={styles.firstButton}
          onPress={() => onComplete(task.id.toString())}>
          <Text
            numberOfLines={3}
            style={task.completed ? styles.completedText : styles.text}>
            {task.text}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.editContainer}>
          <TextInput
            multiline
            style={styles.input}
            value={currentText}
            onChangeText={setCurrentText}
          />
        </View>
      )}
      <View style={styles.row}>
        {isEditing ? (
          <Button title="Save" onPress={handleSave} color="#4a90e2" />
        ) : (
          <Button
            title="Edit"
            onPress={() => setIsEditing(true)}
            color="#4a90e2"
          />
        )}
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstButton: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  completedText: {
    fontSize: 16,
    color: 'green',
    textDecorationLine: 'line-through',
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cccccc',
  },
  editContainer: {
    flex: 1,
  },
});

export default TaskCard;
