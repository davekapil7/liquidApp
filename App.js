import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import redux
import {Provider} from 'react-redux';
import configureStore from './Store/store';
import Rootnavigation from './Src/Navigation';
import OnbordingScreen from './Src/Screen/OnbordingScreen/style';

const Stack = createStackNavigator();

const store = configureStore();


const App = () => {
  return (
    <Provider store={store}>
      <Rootnavigation />
    </Provider>
  );
};

export default App;
