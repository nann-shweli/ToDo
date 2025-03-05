import {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {useNavigation} from '../hooks/useNavigation';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/task/taskSlice';
import Screen from '../component/template/Screen';
import Button from '../component/Button';

const NewTask = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [height, setHeight] = useState(40);

  const handleAddTask = () => {
    const newTask = {title, body};
    dispatch(addTask(newTask));
    setTitle('');
    setBody('');
  };

  return (
    <Screen>
      <TextInput
        style={[styles.textArea, {height: Math.max(40, height)}]}
        multiline
        placeholder="Task Title"
        placeholderTextColor="#999"
        textAlignVertical="top"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.textArea, {height: Math.max(80, height)}]}
        multiline
        placeholder="Task Details"
        placeholderTextColor="#999"
        textAlignVertical="top"
        onContentSizeChange={event =>
          setHeight(event.nativeEvent.contentSize.height)
        }
        value={body}
        onChangeText={setBody}
      />

      <Button label="Add Task" onPress={handleAddTask} />
      <Button label="To Home" onPress={() => navigate('Home')} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default NewTask;
