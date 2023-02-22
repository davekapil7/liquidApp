import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

import {AppState, Linking, StyleSheet, Text, View} from 'react-native';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './SplashScreen';
// import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/Login';
import SignLoginScreen from './SignLogin';
import RegisterScreen from './RegisterScreen';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import CreateProofScreen from './DrawerScreens/CreateProofScreen';

//Import Redux
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import OnbordingScreen from './Screen/OnbordingScreen';
import InfoScreen from './Screen/Info';
import Otpscreen from './Screen/Otp';
import TabNavigationRoute from './TabNavigation';
import Settingscreen from './Screen/Settings';
import WalletconnectionScreen from './Screen/Settings/Walletconnection';
import EmailAddScreen from './Screen/Settings/Emailaddress';
import Walletscreen from './Screen/Walletscreen';
import WalletPinscreen from './Screen/Settings/WalletPin';
import RecoverScreen from './Screen/Settings/Recover';
import Scanscreen from './Screen/Scanscreen';
import Editdetail from './Screen/Walletscreen/Editdetails';
import Selfissue from './Screen/Addscreen/Selfissue';
import Testimonial from './Screen/Addscreen/Testimonial';
import axiosInstance from './Constant/axios';

const Stack = createStackNavigator();

const linking = {
  prefixes: ["https://api.liquid.com.hk/", 'liquid://'],
};

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator
      //initialRouteName="Otpscreen"
      initialRouteName="OnbordingScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnbordingScreen"
        component={OnbordingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Otpscreen"
        component={Otpscreen}
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

const Rootnavigation = () => {
  const appstatus = useSelector(state => state?.appstate?.appState);

  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      dispatch({type: 'CHANGE_STATE', payload: appState.current});
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  function getStringBetween(str, start, end) {
    const result = str.match(new RegExp(start + "(.*)" + end));
    return result[1];
  }

  useEffect(() => {
    Linking.addEventListener('url', (url) => {
      console.log('this is the url: ', url);
      let linkUrl = url.url;
      linkUrl = linkUrl + " ";
      if(linkUrl.includes('state=')) {
        let myState = getStringBetween(linkUrl, 'state=', '&code');
        let myCode = getStringBetween(linkUrl, '&code=', ' ');
        console.log("Substring", myState);
        console.log("Subcode", myCode);
        getAuthToken(myState, myCode);
      }
    });
  }, [])

  const getAuthToken = async (state, code) => {

    let dataToSend = {state: state, code: code};

    axiosInstance
      .post(
        'iamsmart/getauthtokenformobile', dataToSend
      )
      .then(function (responseJson) {
        console.log("Data response for reuqest", responseJson);
        if (responseJson.status === 200) {
          console.log("Request Profile Authority ", responseJson.data);
        }
      })
      .catch(function (error) {
        //  setErrortext(responseJson?.data?.error);
        // Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
        //   backgroundColor: 'blue',
        // });
        // setLoading(false);
      });
  }

  return (
    <NavigationContainer  linking={linking}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
      //   initialRouteName='Tabnavigationroute'
      >
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="Tabnavigationroute"
          component={TabNavigationRoute}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Selfissue"
          component={Selfissue}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Testimonial"
          component={Testimonial}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settingscreen"
          component={Settingscreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Walletconnection"
          component={WalletconnectionScreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmailAddress"
          component={EmailAddScreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recoverscreen"
          component={RecoverScreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scanscreen"
          component={Scanscreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Editdetail"
          component={Editdetail}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Walletpinscreen"
          component={WalletPinscreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProofScreenStack"
          component={CreateProofScreen}
          options={{
            title: 'Proof Screen', //Set Header Title
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
    </NavigationContainer>
  );
};

export default Rootnavigation;
