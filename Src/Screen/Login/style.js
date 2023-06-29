import { Platform, StyleSheet } from 'react-native';
import { COLOR } from '../../Constant/color';

export const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 24
  },
  cordContain: {
    flex: 1,
    padding: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabcontain: {
    width: "100%",

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tabview: { width: "40%", alignItems: "center" },
  borderview: { width: "100%", marginTop: 4, borderRadius: 8, backgroundColor: COLOR.PRIMARY, height: 4 },
  tabtext: {
    fontWeight: "400",
    lineHeight: 18
  },
  textinputView: {
    backgroundColor: COLOR.WHITE[100],
    borderRadius: 5,
    width: "100%",
    height: 41,
    //paddingVertical: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 15,
    marginTop: 15,
    color: COLOR.BLACK[100]
  },
  messagetext: {
    color: COLOR.BLACK[100],
    width: "100%", textAlign: "left"
  },
  infotext: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: '5%',
    color: COLOR.GRAY[500]
  },
  button: {
    width: 180,
    backgroundColor: COLOR.PRIMARY,
    height: 30,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    color: COLOR.WHITE[100],
    fontWeight: "700"
  },









  safeContainer: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
  },
  keyContainer: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    backgroundColor: COLOR.GRAY[200],
    padding: 10,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  starttext: {
    fontSize: 25,
    color: COLOR.BLACK[100],
    fontWeight: '700',
  },
  // tabView: {
  //   width: '95%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: '5%',
  // },
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

  buttonView: {
    width: 150,
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
