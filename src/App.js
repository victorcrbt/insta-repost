import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Hello, World!</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
