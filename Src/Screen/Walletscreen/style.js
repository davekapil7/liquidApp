import { StyleSheet } from 'react-native';
import { COLOR } from '../../Constant/color';

export const styles = StyleSheet.create({

  emailtext: {
    fontSize: 15,
    color: COLOR.BLACK[100],
    marginTop: 8
  },
  letstext: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 15
  },
  letsmesg: {
    textAlign: "center", marginTop: 15
  },












  safeContainer: {
    flex: 1,
    height: "100%",
    //backgroundColor: COLOR.PRIMARY,
  },
  headerContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  subtitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14
  },
  titletext: {
    fontSize: 25,
    color: COLOR.WHITE[100],
    fontWeight: "bold"
  },
  inputbox: {
    width: '95%',
    alignSelf: "center",
    borderRadius: 10,
    minHeight: 75,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLOR.BLUE[400],
    padding: 15,
  },
  lastbox: {
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLOR.BLUE[400],
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    minHeight: 30,
    padding: 10
  },
  inputtitle: {
    fontSize: 14,
    color: COLOR.GRAY[100],
    fontWeight: '700',
  },
  inputtext: { color: 'black', fontSize: 18 },

  welcometext: {
    fontSize: 17,
    marginTop: 3,
    color: COLOR.WHITE[100],
    fontWeight: "400"
  },

  container: {
    backgroundColor: COLOR.BLUE[100],
    // backgroundColor:"pink",
    marginTop: 15,
    flex: 1,
    height: "100%",

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 8,
    paddingTop: 15
  },
  tabcontain: {
    flexDirection: "row",
    backgroundColor: COLOR.BLUE[200],
    borderRadius: 10,
    height: 40
    // paddingVertical:10
  },
  tabView: {
    paddingHorizontal: 15,
    paddingVertical: 10

  },
  button: {
    flexDirection: 'row',
    paddingTop: 4.375,
    paddingBottom: 4.375,
    borderWidth: 1,
    borderColor: '#2b7367',
    backgroundColor: '#2B7366',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 17.5,
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    width: '72%',
    borderRadius: 10
  },
  imageContainer: {
    width: '18%',
    marginRight: 10
  },
  textContainer: {
    width: '82%'
  },
  ImageIconStyle: {
    height: '100%',
    resizeMode: 'contain',
  },

});
