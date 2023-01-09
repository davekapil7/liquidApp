import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Src/SplashScreen';
// import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Src/LoginScreen';
import SignLoginScreen from './Src/SignLogin';
import RegisterScreen from './Src/RegisterScreen';
import DrawerNavigationRoutes from './Src/DrawerNavigationRoutes';
import CreateProofScreen from './Src/DrawerScreens/CreateProofScreen';

// Import redux
import {Provider} from 'react-redux';
import configureStore from './Store/store';
import Rootnavigation from './Src/Navigation';

const Stack = createStackNavigator();

const store = configureStore();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignLoginScreen"
        component={SignLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Rootnavigation />
    </Provider>
  );
};

export default App;
