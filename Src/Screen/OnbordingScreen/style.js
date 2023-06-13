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
  swipercontainer : {
    flex: 1,
   // backgroundColor:COLOR.WHITE[100], 
   alignSelf:"center",
       alignItems: 'center',
    justifyContent: 'center',
    width:"75%",
  },
  image : {width: '80%', height: '30%'},
  titletext:{
    fontSize:12,
    fontWeight:"700",
  color:COLOR.BLACK[100],
  marginTop:20,
  },

  desctext:{
    width:"85%",
    textAlign:"center",marginTop:20,
    fontWeight:"400",
    lineHeight:20,
    fontSize:12,
    color:COLOR.BLACK[100]
  },
  introtext:{
    marginTop:20,
    fontSize:12,
    color:COLOR.BLACK[100],
    fontWeight:"700"
  },
  button : {
    width:180,
    backgroundColor: COLOR.PRIMARY,
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
