import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.useReactNative()
    .configure({ host: '10.0.0.93' })
    .connect();

  tron.clear();

  console.tron = tron;
}
