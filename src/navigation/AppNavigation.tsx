import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Home from '../screen/Home';

export type RootStackParamList = {
  Home: undefined;
  Details: {city: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
