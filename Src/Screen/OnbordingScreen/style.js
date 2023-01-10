import {StyleSheet} from 'react-native';
import {COLOR} from '../../Constant/color';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
  },
  container: {
    flex: 1,
    alignItems: 'center',
   // justifyContent: 'center',
  },
  swiperView:{
    height:"85%",
  },
  titletext:{
    fontSize:16,
    fontWeight:"bold",
  color:COLOR.BLACK[100],
  marginTop:15,
  },
  desctext:{
    width:"85%",
    textAlign:"center",marginTop:10,
    lineHeight:20,
    fontSize:16,
    color:COLOR.BLACK[100]
  },
  introtext:{
    marginTop:15,
    fontSize:16,
    color:COLOR.BLACK[100],
    fontWeight:"bold"
  }

 
});
