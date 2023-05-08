import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

import { AppState, Linking, StyleSheet, Text, View } from 'react-native';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message'
// Import Screens
import SplashScreen from './SplashScreen';
// import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/Login';
import SignLoginScreen from './SignLogin';
import RegisterScreen from './RegisterScreen';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import CreateProofScreen from './DrawerScreens/CreateProofScreen';

//Import Redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
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
import Cardinfo from './Screen/Walletscreen/CardInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const linking = {
  prefixes: ["https://api.liquid.com.hk/", 'liquid://'],
};

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator
      // initialRouteName="Otpscreen"
      initialRouteName="OnbordingScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnbordingScreen"
        component={OnbordingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otpscreen"
        component={Otpscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignLoginScreen"
        component={SignLoginScreen}
        options={{ headerShown: false }}
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

const Preauth = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnbordingScreen"
    // initialRouteName="SplashScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OnbordingScreen"
        component={OnbordingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otpscreen"
        component={Otpscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignLoginScreen"
        component={SignLoginScreen}
        options={{ headerShown: false }}
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

}

const Postauth = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Otpscreen"
      // initialRouteName="OnbordingScreen"
      initialRouteName='Tabnavigationroute'
    >

      <Stack.Screen
        name="Tabnavigationroute"
        component={TabNavigationRoute}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Selfissue"
        component={Selfissue}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Testimonial"
        component={Testimonial}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settingscreen"
        component={Settingscreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Walletconnection"
        component={WalletconnectionScreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cardinfo"
        component={Cardinfo}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailAddress"
        component={EmailAddScreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recoverscreen"
        component={RecoverScreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanscreen"
        component={Scanscreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editdetail"
        component={Editdetail}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Walletpinscreen"
        component={WalletPinscreen}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
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
  );
}
const Rootnavigation = () => {
  const appstatus = useSelector(state => state?.appstate?.appState);
  const loginstatus = useSelector(state => state?.appstate?.login);
  const [login, setLogin] = useState(false)

  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
   const [splash, setSplash] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {

  //     setSplash(false)

  //   }, 5000);
  // })
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      dispatch({ type: 'CHANGE_STATE', payload: appState.current });
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
      let linkUrl = url.url;
      linkUrl = linkUrl + " ";
      if (linkUrl.includes('state=')) {
        let myState = getStringBetween(linkUrl, 'state=', '&code');
        let myCode = getStringBetween(linkUrl, '&code=', ' ');
        if (myState !== 'null') {
          getAuthToken(myState, myCode);
        } else {
          getProfile()
        }
      }
    });
  }, [])

  const getloginstatus = async () => {
    const login = await AsyncStorage.getItem('login')

    console.log("!!!!!!",login);
    if (login === "true") {
      console.log("HEllo true");
      dispatch({
        type: "SET_LOGIN",
        payload:true
      })

    } else {
      dispatch({
        type: "SET_LOGIN",
        payload: false
      })
    }
  
  }
  useEffect(() => {
    getloginstatus()
  }, [loginstatus])

  console.log("EEEE",loginstatus);

  const getAuthToken = async (state, code) => {

    let dataToSend = { state: state, code: code };

    axiosInstance
      .post(
        'iamsmart/getauthtokenformobile', dataToSend
      )
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          console.log("Request Profile Authority ", responseJson.data);
          if (responseJson.data.data.token && responseJson.data.data.token.length > 0) {
            getProfileForMobile();
          }
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  }

  const getProfileForMobile = () => {

    axiosInstance
      .get(
        'iamsmart/profilerequest', {
        params: {
          source: 'android',
        }
      }
      )
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          console.log("The Ticket Data ", responseJson.data);
          if (responseJson.data.data.ticketID && responseJson.data.data.ticketID.length > 0) {
            Linking.openURL('hk.gov.iamsmart.testapp://auth');
          }
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Somthing went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  }

  const getProfile = () => {
console.log("====================>")
    axiosInstance
      .get(
        'iamsmart/getProfile', {
        params: {
          source: 'android',
        }
      }
      )
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          let profileData = JSON.stringify(responseJson.data.profile);
          profileData = JSON.parse(profileData);
          console.log("Profile Data", profileData);
          dispatch({ type: 'ADD_PROFILE', payload: responseJson.data.profile.Eme });
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Somthing went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });

      });
  }

  return (
    <NavigationContainer linking={linking}>

      <Stack.Navigator >

        {/* {splash ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
        ) : (
        <> */}
          {loginstatus === true ? (
            <Stack.Screen name='Postauth' component={Postauth} options={{ headerShown: false }} />
          ) : (

            <Stack.Screen name='Preauth' component={Preauth} options={{ headerShown: false }} />
          )}
        {/* </>
      )}  */}

      </Stack.Navigator>

      <Toast position='bottom' />
    </NavigationContainer>
  );
};

export default Rootnavigation;
