import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '~/screens/Home';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'left',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: '#1579c1',
  },
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
