import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '../hooks/useNavigation';
import Screen from '../component/template/Screen';
import Button from '../component/Button';

const Home = () => {
  const {navigate} = useNavigation();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const {top} = useSafeAreaInsets();

  const containerStyle = useMemo(() => {
    return {
      paddingTop: top,
    };
  }, [top]);

  const renderItem = ({item}: any) => {
    return (
      <View key={item.index} style={styles.taskItem}>
        <Text style={styles.taskTitle}>
          {item.title.trim() ? item.title : item.body.split('\n')[0].trim()}
        </Text>
      </View>
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
        />
      </View>
      <Button label="Add New Task" onPress={() => navigate('NewTask')} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatlist: {
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F7F7F7',
    marginTop: 24,
  },
  taskItem: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 0.4,
    borderColor: '#ccc',

    borderRadius: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
