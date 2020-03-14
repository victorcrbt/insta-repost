import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import openInstagram from '~/util/openInstagram';

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
  headerRightContainerStyle: {
    marginRight: 15,
  },
  headerRight: () => (
    <TouchableOpacity onPress={openInstagram}>
      <Text>
        <Icon size={30} color="#fff" name="instagram" />
      </Text>
    </TouchableOpacity>
  ),
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Repost" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
