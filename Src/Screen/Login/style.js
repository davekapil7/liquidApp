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
    marginTop:15,
    color:COLOR.BLACK[100]
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
    color:COLOR.GRAY[300]
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
