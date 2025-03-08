import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import StatusBar from '../component/StatusBar';
import Home from '../screens/Home';
import NewTask from '../screens/NewTask';
import Header from './Header';
import Done from '../screens/Done';

export type RootStackParamList = {
  Home: undefined;
  NewTask: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const TaskHeader = (props: any) => (
  <Header
    {...props}
    rightComponent={() => <Done data={props?.route?.params} />}
  />
);

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewTask"
            component={NewTask}
            options={{
              title: 'Lists',
              header: TaskHeader,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
