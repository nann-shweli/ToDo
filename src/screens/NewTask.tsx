import {useState, useRef, useEffect} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

import {useNavigation} from '../hooks/useNavigation';
import {useDispatch} from 'react-redux';
import {addTask, updateTask} from '../redux/task/taskSlice';
import Screen from '../component/template/Screen';
import Button from '../component/Button';

const NewTask = ({route}: any) => {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [height, setHeight] = useState(40);

  const bodyInputRef = useRef(null);
  const taskId = route?.params?.data?.id;

  useEffect(() => {
    if (route?.params?.data) {
      setTitle(route.params.data.title || '');
      setBody(route.params.data.body || '');
    }
  }, [route?.params?.data]);

  const handleAddTask = () => {
    const newTask = {title, body};
    if (taskId) {
      dispatch(updateTask({id: taskId, ...newTask}));
    } else {
      dispatch(addTask(newTask));
    }
    setTitle('');
    setBody('');
    goBack();
  };

  useEffect(() => {
    if (bodyInputRef?.current) {
      bodyInputRef.current?.focus();
    }
  }, []);

  return (
    <Screen>
      <TextInput
        style={[styles.textArea, {height: Math.max(40, height)}]}
        multiline={false}
        placeholder="Input Title"
        placeholderTextColor="#999"
        textAlignVertical="top"
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
        onSubmitEditing={() => bodyInputRef.current?.focus()}
      />

      <TextInput
        ref={bodyInputRef}
        style={[styles.textArea, {height: Math.max(80, height)}]}
        multiline
        placeholderTextColor="#999"
        textAlignVertical="top"
        onContentSizeChange={event =>
          setHeight(event.nativeEvent.contentSize.height)
        }
        value={body}
        onChangeText={setBody}
        autoFocus={true}
      />

      <View style={styles.buttons}>
        <Button label="Add Task" onPress={handleAddTask} />
        <Button label="To Home" onPress={() => navigate('Home')} />
      </View>
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
    borderColor: '#ccc',
    padding: 10,
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 12,
  },
});

export default NewTask;
