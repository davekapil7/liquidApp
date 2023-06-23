import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../Constant/axios';
import axiosLocal from '../Constant/axioslocal';
import Toast from 'react-native-toast-message'

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

export const login = async (email, dispatch) => {

  if (email.length > 0) {
    let dataToSend = { email: email };

    const result = await axiosInstance
      .post('/auth/login', dataToSend)
      .then(function (responseJson) {
        console.log(typeof responseJson.status, 'ressss');

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

export const loginotp = async (otp, dispatch, cardlength) => {
  console.log("OTP", otp);


  let dataToSend = { otp: otp };

  const result = await axiosInstance
    .post('auth/verify-otp', dataToSend)
    .then(function (responseJson) {
      console.log('Verified user', responseJson.data, 'responce');
      if (responseJson?.data?.data === 'Authorized') {

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

        if (cardlength === 0) {
          getCarddatA(dispatch);
        }

        //   navigation.navigate('Postauth' ,{screen: 'Tabnavigationroute'});

        //   handlebiomatric();
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

export const getCompanydetail = () => {
  const res = axiosInstance
    .get(`/company/getCompany`)
    .then(function (responseJson) {
      console.log("Company detail", responseJson?.data);
      if (responseJson.status === 200) {

        const res = responseJson?.data?.data;


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
}


///// Im smart data 


