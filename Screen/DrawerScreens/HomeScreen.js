// Import React and Component
import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  useEffect(() => {
    const getData = async () => {
      const dId = await axios.get(`http://142.93.213.49:8000/api/getDid`);
      console.log(dId, 'did');
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
              color: 'grey',
            }}>
            Welcome To Liquid HK
            {/* {'\n\n'}
            This is the Home Screen */}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          visit us
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          https://liquid.com.hk/
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
