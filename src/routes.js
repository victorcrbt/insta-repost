import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import openInstagram from '~/util/openInstagram';

import Home from '~/screens/Home';
import Repost from '~/screens/Repost';

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
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Repost',
            headerRight: () => (
              <TouchableOpacity onPress={openInstagram}>
                <Text>
                  <Icon size={30} color="#fff" name="instagram" />
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Repost"
          component={Repost}
          options={{
            title: 'Repostar',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Icon name="chevron-left" size={30} color="#fff" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
