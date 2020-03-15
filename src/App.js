import React from 'react';
import { StatusBar } from 'react-native';

import './config/Reactotron';

import Routes from './routes';

const App = () => {
  return (
    <>
      <Routes />

      <StatusBar backgroundColor="#1579c1" barStyle="light-content" />
    </>
  );
};

export default App;
