import axiosInstance from '../Constant/axios';
import axiosLocal from '../Constant/axioslocal';
import Toast from 'react-native-toast-message'

export const getAuthToken = (state, code) =>{
  let dataToSend = {state: state, code: code};

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
          text1NumberOfLines:2 //number of how many lines you want
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
          text1NumberOfLines:2 //number of how many lines you want
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
          text1NumberOfLines:2 //number of how many lines you want
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
        dispatch({type: 'ADD_CARDS', payload: responseJson?.data?.data?.items});
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
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
    });
};

export const sendToverification = async (verificationId , email) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    to: email,
    data: {
      verificaitonId : verificationId
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
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
      return false;
    });

  return res;
};

export const getProofdata = (verificationId, dispatch) => {
const res =   axiosInstance
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
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
      return "error"
    });

    return res
};
export const createProofforOR = async id => {
  let dataToSend = {item_id: id};
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
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
      //Hide Loader
      return 'error';
    
    });

  return result;
};

export const updateVerification = async (verificationId, proofitem) => {
  console.log("%%%%%",verificationId , proofitem);
  let dataToSend = {verification_id: verificationId, did: proofitem};

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
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
      return 'error';
   
    });

  return result;
};
