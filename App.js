import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
// import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import SignLoginScreen from './Screen/SignLogin';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import CreateProofScreen from './Screen/DrawerScreens/CreateProofScreen';

// Import redux 
import { Provider } from 'react-redux';
import configureStore from './Store/store';
import Rootnavigation from './Screen/Navigation';


const Stack = createStackNavigator();

const store = configureStore()

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
<Provider store={store} >
    <Rootnavigation />
    </Provider>
  );
};

export default App;
