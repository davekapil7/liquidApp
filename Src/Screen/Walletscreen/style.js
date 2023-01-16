import {StyleSheet} from 'react-native';
import {COLOR} from '../../Constant/color';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
   // backgroundColor: COLOR.PRIMARY,
  },
  headerContainer:{
    marginTop:25,
    paddingHorizontal:25,
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between"
  },
  titletext:{
    fontSize:25,
    color:COLOR.WHITE[100],
    fontWeight:"bold"
  },
  titletext:{
    fontSize:25,
    color:COLOR.WHITE[100],
    fontWeight:"bold"
  },
  welcometext:{
    fontSize:17,
    marginTop:3,
    color:COLOR.WHITE[100],
    fontWeight:"400"
  },

  container:{
    backgroundColor:COLOR.BLUE[100],marginTop:15,
    flex:1,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    padding:8,
    paddingTop:15
  },
  tabcontain:{
    flexDirection:"row",
    backgroundColor:COLOR.BLUE[200],
    borderRadius:10
   // paddingVertical:10
  },
  tabView:{
    paddingHorizontal:10,
    paddingVertical:10

  },
 
});
