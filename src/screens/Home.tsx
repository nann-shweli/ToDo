import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '../hooks/useNavigation';
import Screen from '../component/template/Screen';
import Button from '../component/Button';
import SwipeableItem from '../component/SwipeableItem';
import {deleteTask} from '../redux/task/taskSlice';

const Home = () => {
  const {navigate} = useNavigation();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const containerStyle = useMemo(() => ({paddingTop: top}), [top]);

  const handleEdit = (item: object) => {
    navigate('NewTask', {data: item});
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask({id}));
  };

  const renderItem = ({item}: any) => {
    return (
      <SwipeableItem
        key={item.id}
        item={item}
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item.id)}
      />
    );
  };

  return (
    <Screen isScroll={false} style={containerStyle}>
      <View style={styles.container}>
        <Text style={styles.header}>Notes</Text>
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          style={styles.flatlist}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
      <View style={styles.button}>
        <Button label="Add New Task" onPress={() => navigate('NewTask')} />
      </View>
    </Screen>
  );
};

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatlist: {
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FCFCFC',
    marginTop: 24,
  },
  separator: {
    height: 0.4,
    backgroundColor: '#ccc',
    marginHorizontal: 12,
  },
  button: {flex: 1, justifyContent: 'flex-end'},
});

export default Home;
