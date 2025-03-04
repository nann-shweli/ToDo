import {Button, Text, View, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Helo</Text>
      <View>
        <Button title="Hello" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Home;
