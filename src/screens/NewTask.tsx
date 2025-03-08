import {useState, useRef, useEffect} from 'react';
import {TextInput, StyleSheet, View, Keyboard, Text} from 'react-native';

import {useNavigation} from '../hooks/useNavigation';
import {format} from 'date-fns';

const NewTask = ({route}: any) => {
  const {setParams} = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const bodyInputRef = useRef(null);
  const taskId = route?.params?.data?.id;

  useEffect(() => {
    setParams({
      title,
      body,
      taskId,
    });
  }, [title, body, taskId, setParams]);

  useEffect(() => {
    if (route?.params?.data) {
      setTitle(route.params.data.title || '');
      setBody(route.params.data.body || '');
    }
  }, [route?.params?.data]);

  useEffect(() => {
    if (bodyInputRef?.current) {
      bodyInputRef.current?.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        multiline={false}
        placeholder="Input Title"
        placeholderTextColor="#999"
        textAlignVertical="top"
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
        onSubmitEditing={() => bodyInputRef.current?.focus()}
      />
      <Text style={styles.date}>
        {format(new Date(), 'dd MMM yyyy h:mm a')}
      </Text>
      <TextInput
        ref={bodyInputRef}
        style={styles.bodyInput}
        multiline
        placeholderTextColor="#999"
        textAlignVertical="top"
        value={body}
        onChangeText={setBody}
        onBlur={Keyboard.dismiss}
        autoFocus={true}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  bodyInput: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  date: {fontSize: 11, marginBottom: 4, color: '#999'},
});

export default NewTask;
