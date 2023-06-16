import { StyleSheet } from 'react-native';
import { COLOR } from '../../Constant/color';

export const styles = StyleSheet.create({
  titletext: {
    fontSize: 24,
    fontWeight: "600"
  },
  infotext: {
    textAlign: "center",
    marginTop: 25
  },
  buttontext: {
color:COLOR.WHITE[100],
fontWeight:"700"
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: 30,
    backgroundColor: COLOR.PRIMARY,
    width: 180,
    borderRadius: 12,
    alignItems: "center", justifyContent: "center"
  },


  safeContainer: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
    justifyContent: "flex-end"
    //  justifyContent:"center"
    // justifyContent: 'center',
  },
  swiperView: {
    height: "85%",
  },

  desctext: {
    width: "85%",
    textAlign: "center", marginTop: 10,
    lineHeight: 20,
    fontSize: 16,
    color: COLOR.BLACK[100]
  },
  introtext: {
    marginTop: 15,
    fontSize: 16,
    color: COLOR.BLACK[100],
    fontWeight: "bold"
  },
  otpContainer: {
    width: "100%",
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "black",
    borderWidth: 1,
    borderColor: '#A3A9BC',
    borderRadius: 10,
    alignSelf: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    width: "14%",
    height: 50,
    marginHorizontal: 4,
  },


});
