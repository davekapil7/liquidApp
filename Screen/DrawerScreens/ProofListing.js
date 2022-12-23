// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';

const ProofListingScreen = () => {
  const [listData, setListData] = useState([]);
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  // const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = ({item, index}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('ProofScreenStack', {
          paramKey: item.id,
        })
      }
      style={{
        backgroundColor: '#C0C0C0',
        borderRadius: 5,
        height: 350,
        padding: 30,
        marginLeft: 25,
        marginRight: 25,
      }}>
      <Text style={{fontSize: 18, color: 'black'}}>
        Company Name: {item?.data?.credentialSubject?.company_name}
      </Text>
      <Text></Text>
      <Text style={{fontSize: 18, color: 'black'}}>
        Kerry ID: {item?.data?.credentialSubject?.kerry_id}
      </Text>
      <Text></Text>
      <Text style={{fontSize: 18, color: 'black'}}>
        Member Since: {item?.data?.credentialSubject?.member_since}
      </Text>
      <Text></Text>
      <Text style={{fontSize: 18, color: 'black'}}>
        Issuance Date: {new Date(item?.data?.issuanceDate).toLocaleDateString()}
      </Text>
      <Text></Text>
      <Button
        onPress={() =>
          navigation.navigate('ProofScreenStack', {
            paramKey: item.id,
          })
        }
        // onPress={onPressLearnMore}
        title="Create Proof"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {/* <Text style={{fontSize: 20, color: 'black'}}>
        Click To Create A Proof
      </Text> */}
    </Pressable>
  );

  useEffect(() => {
    const getData = async () => {
      const getDid = await axios.get(`http://142.93.213.49:8000/api/getDid`);
      const data = getDid?.data?.data?.items;
      const getRawData = data.forEach(element => {
        const event = new Date(element?.data?.issuanceDate).toLocaleString();
        console.log(event);
        setListData(element);
      });
      // console.log(getDid?.data?.data?.items);
      console.log(getRawData, 'getRawData');
      setListData(getDid?.data?.data?.items);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Carousel
          layout="default"
          // layoutCardOffset={'18'}
          ref={ref}
          data={listData}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
    // <SafeAreaView style={{flex: 1}}>
    //   <ScrollView style={styles.scrollView}>
    //     <View style={styles.container}>
    //       {listData?.map((res, i) => {
    //         console.log(res, 'test');
    //         return (
    //           <View key={i}>
    //             <Text
    //               key={i}
    //               style={styles.titleStyle}
    //               onPress={() =>
    //                 navigation.navigate('ProofScreenStack', {
    //                   paramKey: res.id,
    //                 })
    //               }>
    //               {res?.id}
    //             </Text>
    //           </View>
    //         );
    //       })}
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
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
    color: 'black',
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
    color: 'red',
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
