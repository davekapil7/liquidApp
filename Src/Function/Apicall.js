import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../Constant/axios';
import axiosLocal from '../Constant/axioslocal';
import Toast from 'react-native-toast-message'
import { Linking, Platform } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

export const getAuthToken = (state, code) => {
  let dataToSend = { state: state, code: code };

  axiosInstance
    .post('iamsmart/getauthtokenformobile', dataToSend)
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        console.log('Request Profile Authority ', responseJson.data);
        if (
          responseJson.data.data.token &&
          responseJson.data.data.token.length > 0
        ) {
          getProfileForMobile();
        }
      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
}

export const getProfileForMobile = () => {
  axiosInstance
    .get('iamsmart/profilerequest', {
      params: {
        source: 'android',
      },
    })
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        console.log('The Ticket Data ', responseJson.data);
        if (
          responseJson.data.data.ticketID &&
          responseJson.data.data.ticketID.length > 0
        ) {
          Linking.openURL('hk.gov.iamsmart.testapp://auth');
        }
      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
};

export const getProfile = (dispatch) => {
  axiosInstance
    .get('iamsmart/getProfile', {
      params: {
        source: 'android',
      },
    })
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        let profileData = JSON.stringify(responseJson.data.profile);
        profileData = JSON.parse(profileData);
        console.log('Profile Data', profileData);
        // dispatch({
        //   type: 'ADD_PROFILE',
        //   payload: responseJson.data.profile.Eme,
        // });
        dispatch({ type: 'ADD_IMSMARTDATA', payload: responseJson.data.profile.Eme });
      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
};

export const getCarddata = dispatch => {
  axiosInstance
    .get('api/getDid')
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        console.log(
          'Card data',
          JSON.stringify(responseJson?.data?.data?.items),
        );
        dispatch({ type: 'ADD_CARDS', payload: responseJson?.data?.data?.items });
      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
};

export const sendToverification = async (verificationId, email) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    to: email,
    data: {
      verificaitonId: verificationId
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = fetch(
    'https://api.liquid.com.hk/api/mail/transferDID',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result);

      const RESDATA = res?.data?.data;
      const ARRkEY = Object.keys(RESDATA);
      const found = ARRkEY.findIndex(element => element === 'accepted');
      if (found === -1) {
        return false;
      } else {
        return true;
      }
    })
    .catch(error => {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      return false;
    });

  return res;
};

export const getProofdata = (verificationId, dispatch) => {
  const res = axiosInstance
    .get(`/verifier/getRequest?verification_id=${verificationId}`)
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        // console.log('Prrof data', JSON.stringify(responseJson?.data?.data));
        const res = responseJson?.data?.data;

        console.log('###', res);
        dispatch({
          type: 'VERIFICATION_DATA',
          payload: res,
        });

        return res

      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      return "error"
    });

  return res
};
export const createProofforOR = async id => {
  let dataToSend = { item_id: id };
  // console.log(dataToSend, 'fshsh');
  const result = axiosInstance
    .post('auth/create-proof-qr', dataToSend)
    .then(function (responseJson) {
      console.log('Verified user', responseJson.data, 'responce');
      return responseJson.data;
    })
    .catch(error => {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      //Hide Loader
      return 'error';

    });

  return result;
};

export const updateVerification = async (verificationId, proofitem) => {
  console.log("%%%%%", verificationId, proofitem);
  let dataToSend = { verification_id: verificationId, did: proofitem };

  const result = axiosInstance
    .post('/verifier/updateDIDForVerificationId', dataToSend)
    .then(function (responseJson) {
      console.log('Verified user', responseJson.data, 'responce');
      return responseJson.data;
    })
    .catch(error => {
      //Hide Loader
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      return 'error';

    });

  return result;
};


///NEw flow 

export const otplogin = async (email, dispatch) => {

  if (email.length > 0) {
    let dataToSend = { email: email };

    const result = await axiosInstance
      .post('/auth/login', dataToSend)
      .then(function (responseJson) {
        console.log(responseJson.status, 'ressss', dataToSend);

        // If server response message same as Data Matched
        if (responseJson.status === 200) {
          console.log("#####",);


          return true

        } else {
          console.log('Please check your email id');
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Something went wrong Please check your email`,
            visibilityTime: 2000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });

          // Alert.alert('Please check your email');
          console.log('Please check your email id or password');
          return false
        }
      })
      .catch(function (error) {

        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong Please check your network connection or after sme time`,
          visibilityTime: 2000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
        return false
      });

    return result

  }
}

export const passwordlogin = async (email, password,fingerauth, dispatch) => {

  if (email.length > 0) {
    let dataToSend = {
      email: email,
      password: password
    };

    const result = await axiosInstance
      .post('/auth/LoginByPassword', dataToSend)
      .then(function (responseJson) {
        console.log(responseJson.status, 'ressss', dataToSend);

        // If server response message same as Data Matched
        console.log("!!!!",responseJson.data?.data);
        if (responseJson.status === 200) {
console.log("!!!HEllologin");
         // handlebiomatric(dispatch, responseJson)
         if(fingerauth === true){
          handlebiomatric(dispatch, responseJson)
         }else{

        
         dispatch({
          type: "ADD_PROFILE",
          payload: responseJson.data?.user
        })
        AsyncStorage.setItem('login', 'true');
  
        AsyncStorage.setItem('loginExpiry', responseJson.data.expires);
  
        AsyncStorage.setItem(
          'isIamSmartCreated',
          JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
        );
        dispatch({
          type: "SET_LOGIN",
          payload: true
        })
      }

        } else {
          console.log('Please check your email id');
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Something went wrong Please check your email`,
            visibilityTime: 2000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });

          // Alert.alert('Please check your email');
          console.log('Please check your email id or password');
          return false
        }
      })
      .catch(function (error) {

        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong Please check your network connection or after sme time`,
          visibilityTime: 2000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
        return false
      });

    return result

  }
}

export const loginotp = async (otp,fingerauth, dispatch, cardlength) => {

  let dataToSend = { otp: otp };

  const result = await axiosInstance
    .post('auth/verify-otp', dataToSend)
    .then(function (responseJson) {
      console.log('Verified user', responseJson.data, 'responce');
      if (responseJson?.data?.data === 'Authorized') {

       // handlebiomatric(dispatch, responseJson);
       console.log("@@@@@@@@@@@@@@@", fingerauth);
if(fingerauth === true){
handlebiomatric(dispatch , responseJson)
}else{


       dispatch({
        type: "ADD_PROFILE",
        payload: responseJson.data?.user
      })
      AsyncStorage.setItem('login', 'true');

      AsyncStorage.setItem('loginExpiry', responseJson.data.expires);

      AsyncStorage.setItem(
        'isIamSmartCreated',
        JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
      );
      dispatch({
        type: "SET_LOGIN",
        payload: true
      })
    }

        if (cardlength === 0) {
          getCarddata(dispatch);
        }

      } else {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Please Enter right OTP`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      }
    })
    .catch(error => {
      //Hide Loader

      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Please enter right otp`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
}

export const createcompanyrequest = async (id, name) => {


  let dataToSend = { company_name: name, ci_number: id };

  const result = axiosInstance
    .post('company/request_company', dataToSend)
    .then(function (responseJson) {

      return responseJson
    })
    .catch(error => {
      console.log("Errror", error);
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      //Hide Loader
      return 'error';

    });

  return result;
};

export const getCompanydetail = async (dispatch) => {
  const result = await axiosInstance
    .get(`/company/getCompany`)
    .then(function (responseJson) {
      console.log("Company detail", responseJson?.data?.result);
      if (responseJson.status === 200) {

        const res = responseJson?.data?.result;
        dispatch({
          type: "ADD_COMPANY_DETAIL",
          payload: res
        })

        return res

      }
    })
    .catch(function (error) {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      return "error"
    });


  return result
}

export const holderverification = async (dummydata) => {


  let dataToSend = dummydata

  const result = axiosInstance
    .post('/company/verify/shareHolder', dataToSend)
    .then(function (responseJson) {
      console.log("##########", responseJson);
      return responseJson?.status
    })
    .catch(error => {
      console.log("Errror", error);
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Something went wrong , Please try again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
      //Hide Loader
      return 'error';

    });

  return result;
};

///// Im smart data 

export const iAMSmartCall = async () => {
  axiosInstance
    .get('iamsmart/IAMSMART_login', {
      params: {
        source: 'android',
        redirect_uri: 'https://api.liquid.com.hk/mobile/redirect',
      },
    })
    .then(function (responseJson) {
      if (responseJson.status === 200) {
        // dispatch({ type: 'ADD_CARDS', payload: responseJson?.data?.data?.items });
        console.log('Response for jump', responseJson.data.data);
        //  setLoader(true);

        let iAmSmartRes = responseJson?.data?.data;
        console.log("H!");
        if (iAmSmartRes.url && iAmSmartRes.url.length > 0) {
          console.log("HEllo", iAmSmartRes.url)
          Linking.openURL(iAmSmartRes.url);
        }
      }
    })
    .catch(function (error) {

      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
        text2: `Somthing Went Wrong Scan Again`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines: 2 //number of how many lines you want
        }
      });
    });
};

export const handlebiomatric = async (dispatch, responseJson) => {

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const senceravailable = (await rnBiometrics.isSensorAvailable()).available


  if(senceravailable === true){


  console.log("!!!!!!!!!!",responseJson.data);
  if (Platform.OS === "android") {


    await rnBiometrics.isSensorAvailable().then(resultObject => {
      rnBiometrics
        .simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then(resultObject => {
          const { success } = resultObject;

          if (success) {

            dispatch({
              type: "ADD_PROFILE",
              payload: responseJson.data?.user
            })
            AsyncStorage.setItem('login', 'true');

            AsyncStorage.setItem('loginExpiry', responseJson.data.expires);

            AsyncStorage.setItem(
              'isIamSmartCreated',
              JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
            );
            dispatch({
              type: "SET_LOGIN",
              payload: true
            })

            // dispatch({
            //   type: "SET_LOGIN",
            //   payload: true
            // })
            // navigation.navigate('Postauth' ,{screen: 'Tabnavigationroute'});
          } else {

            Toast.show({
              topOffset: 100,
              type: "error",
              text1: "ERROR",
              text2: `Fingerprint not exist or were deleted . Please add fingerprint in system`,
              visibilityTime: 3000,
              props: {
                text1NumberOfLines: 2 //number of how many lines you want
              }
            });
          }
        })
        .catch(e => {
          //   Alert.alert('Fail login with senser . Please try with login');
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Fail login with senser . Please try with login`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });
          AsyncStorage.removeItem('login');
          dispatch({
            type: "SET_LOGIN",
            payload: false
          })
        });
    });

  } else {
    const { biometryType } = await rnBiometrics.isSensorAvailable()

    if (biometryType === BiometryTypes.FaceID) {
      //do something fingerprint specific
      rnBiometrics
        .simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then(resultObject => {
          const { success } = resultObject;

          if (success) {

            dispatch({
              type: "ADD_PROFILE",
              payload: responseJson.data?.user
            })
            AsyncStorage.setItem('login', 'true');

            AsyncStorage.setItem('loginExpiry', responseJson.data.expires);

            AsyncStorage.setItem(
              'isIamSmartCreated',
              JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
            );
            dispatch({
              type: "SET_LOGIN",
              payload: true
            })

            // dispatch({
            //   type: "SET_LOGIN",
            //   payload: true
            // })
            // navigation.navigate('Postauth' ,{screen: 'Tabnavigationroute'});
          } else {

            Toast.show({
              topOffset: 100,
              type: "error",
              text1: "ERROR",
              text2: `Fingerprint not exist or were deleted . Please add fingerprint in system`,
              visibilityTime: 3000,
              props: {
                text1NumberOfLines: 2 //number of how many lines you want
              }
            });
          }
        })
        .catch(e => {
          //   Alert.alert('Fail login with senser . Please try with login');
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Fail login with senser . Please try with login`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });
          AsyncStorage.removeItem('login');
          dispatch({
            type: "SET_LOGIN",
            payload: false
          })
        });
    }
  }

}else{

  dispatch({
    type: "ADD_PROFILE",
    payload: responseJson.data?.user
  })
  AsyncStorage.setItem('login', 'true');

  AsyncStorage.setItem('loginExpiry', responseJson.data.expires);

  AsyncStorage.setItem(
    'isIamSmartCreated',
    JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
  );
  dispatch({
    type: "SET_LOGIN",
    payload: true
  })


}
};
