import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Walletscreen from './Screen/Walletscreen';
import {Tabbar} from './Custometab';
import Addscreen from './Screen/Addscreen';
import Contactscreen from './Screen/Contactscreen';
import Servicescreen from './Screen/Servicescreen';

const Tab = createBottomTabNavigator();

export default function TabNavigationRoute() {
  return (
    <Tab.Navigator
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{headerShown:false}}
      initialRouteName="Walletscreen">
        <Tab.Screen name="Addscreen" component={Addscreen} />
      <Tab.Screen name="Walletscreen" component={Walletscreen} />
      
      <Tab.Screen name="Contactscreen" component={Contactscreen} />
      <Tab.Screen name="Servicescreen" component={Servicescreen} />
    </Tab.Navigator>
  );
}
