// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

const ProofListingScreen = () => {
  const [listData, setListData] = useState();
  useEffect(() => {
    const getData = async () => {
      const getDid = await axios.get(`http://142.93.213.49:8000/api/getDid`);
      setListData(getDid?.data?.data?.items);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {listData?.map(res => {
            return <Text style={styles.titleStyle}>{res?.id}</Text>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProofListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  // textInputStyle: {
  //   flexDirection: 'row',
  //   height: 40,
  //   marginTop: 20,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   margin: 10,
  // },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
