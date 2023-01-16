import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import {wallettype} from '../../Constant/json';

const Walletscreen = () => {
  const [selectedtype, setSelectedType] = useState(0);

  console.log("%%%%%%%%%%%%%%%",selectedtype);
  return (
    <View style={styles.safeContainer}>
      <LinearGradient
        start={{x: 0.0, y: 0.4}}
        end={{x: 0.85, y: 0.5}}
        locations={[0, 0.9]}
        // start={{x: 0.0, y: 0.4}}
        // end={{x: 0.8, y: 0.5}}
        // locations={[0, 0.9]}
       // colors={['#5d0981', '#e30cd1']}
        colors={['#454dbc', '#bd59fa']}
        style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.titletext}>{STR.WALLET.TITLE}</Text>
            <Text style={styles.welcometext}>{STR.WALLET.WELCOME}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon
                name="line-scan"
                size={25}
                type="material-community"
                color={COLOR.WHITE[100]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon
                name="settings-outline"
                size={25}
                type="ionicon"
                color={COLOR.WHITE[100]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <ScrollView >
            <View style={styles.tabcontain}>
            {wallettype.map((type, i) => {
              return (
                <TouchableOpacity
                  style={{
                    ...styles.tabView,
                    backgroundColor:
                      selectedtype === i ? COLOR.BLUE[300] : COLOR.BLUE[200],
                    borderTopLeftRadius: selectedtype === 0 && selectedtype === i ? 10 : 0,
                    borderBottomLeftRadius: selectedtype === 0 && selectedtype === i ? 10 : 0,
                    borderBottomRightRadius: selectedtype === 3 && selectedtype === i ? 10 : 0,
                    borderTopRightRadius: selectedtype === 3 && selectedtype === i ? 10 : 0,
                  }}
                  onPress={() => setSelectedType(i)}>
                  <Text>{type.title}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Walletscreen;
