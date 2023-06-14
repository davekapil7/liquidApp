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
    justifyContent: 'center',
    backgroundColor:COLOR.WHITE[100]
  },
  cardView: {
    backgroundColor: COLOR.SECONDRY,
    paddingHorizontal:30,
    
    padding: 20,
    borderRadius: 20,
    width: '85%',
    height:"65%",
    alignItems: 'center',
    justifyContent:"space-between"
  },
  starttext: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight:36,
    color: COLOR.BLACK[100],
    textAlign: 'center',
  },
  securetext :{
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.BLACK[100],
    lineHeight:18,

    textAlign: 'center',
  },
  protecttext:{
    fontSize: 13,
    fontWeight: '600',
    color: COLOR.BLACK[100],
    marginTop: 15,

    textAlign: 'center',
  },
  button : {
    width: 180,
    backgroundColor: COLOR.PRIMARY,
    height: 30,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  tabbar: {
    width: '48%',
    alignItems: 'center',
    borderBottomWidth: 4,
    paddingBottom: 5,
    borderBottomColor: COLOR.GRAY[300],
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR.GRAY[300],
  },
  tabtitle: {
    color: COLOR.GRAY[300],
    fontWeight: '400',
    fontSize: 17,
  },
  registerView: {
    width: '90%',
    marginTop: 10,
  },
  textinputView: {
    backgroundColor: COLOR.WHITE[100],
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  numberView: {
    width: '100%',
    height: 45,
    backgroundColor: COLOR.WHITE[100],
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
  },
  prenumber: {
    width: '20%',
    borderRightWidth: 0.7,
    alignItems: 'center',
  },
  passtext: {
    marginTop: 10,
  },
  passview: {
    flexDirection: 'row',
    backgroundColor: COLOR.WHITE[100],
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
  },
  passinput: {
    flex: 1,
  },
  infotext: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: '5%',
  },
  buttonView: {
    width: '70%',
    backgroundColor: COLOR.GREEN[100],
    alignSelf: 'center',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 15,
  },
  bottontext: {
    color: COLOR.WHITE[100],
    fontSize: 12,
  },
});
