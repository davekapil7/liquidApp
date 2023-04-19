import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from './Constant/color';
import { getCarddata } from './Function/Apicall';
import { useSelector, useDispatch } from "react-redux";

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  const dispatch = useDispatch()
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     //Check if user_id is set or not
  //     //If not then send for Authentication
  //     //else send to Home Screen
  //     AsyncStorage.getItem('login').then(
  //       value =>{
        

  //         if(value !== null){
  //           console.log("Hello Splash");
  //           getCarddata(dispatch)
  //         }
          
  //         if(value === null){
  //           navigation.replace('OnbordingScreen' )
  //         }else{
  //           navigation.replace( 'Postauth' , {screen : 'Tabnavigationroute'})
  //         }
  //       }
  //       // navigation.replace('Auth'),
      
        
  //     );
  //   }, 5000);
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/liquid.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLOR.PRIMARY,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
