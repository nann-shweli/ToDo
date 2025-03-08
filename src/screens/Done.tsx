import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {addTask, updateTask} from '../redux/task/taskSlice';
import {useNavigation} from '../hooks/useNavigation';

const Done = ({data}: any) => {
  const dispatch = useDispatch();
  const {goBack} = useNavigation();

  const handleDone = () => {
    const newTask = {
      title: data?.title,
      body: data?.body,
      createdAt: new Date().toISOString(),
    };
    if (data?.taskId) {
      dispatch(updateTask({id: data?.taskId, ...newTask}));
    } else {
      dispatch(addTask(newTask));
    }
    goBack();
  };

  return (
    <TouchableOpacity onPress={handleDone}>
      <Text style={styles.container}>Done</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {fontSize: 13},
});

export default Done;
