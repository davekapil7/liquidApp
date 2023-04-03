import axiosInstance from '../Constant/axios';

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
      console.log('Error==>', error);
    });
};

export const sendToverification = async (email, id, iv) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    to: email,
    data: {
      email: 'hsbc@gmail.com',
      id: id,
      iv: iv,
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
      return false;
    });

  return res;
};

export const getProofdata = (verificationId, dispatch) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    `https://dev.liquid.com.hk/api/verifier/getRequest?verification_id=${verificationId}`,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result);
      console.log('Verification result ===> ', res?.data);
      dispatch({
        type: 'VERIFICATION_DATA',
        payload: res?.data,
      });
    })
    .catch(error => console.log('error', error));
};

export const createProofforOR = async id => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    item_id: id,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const result = await fetch(
    'http://localhost:8000/auth/create-proof-qr',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result);
      return res;
    })
    .catch(error => {
      console.log('ERRROR', error);
      return 'error';
    });

  return result;
};

export const updateVerification = async (verificationId, proofitem) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  console.log('PRRR', proofitem , verificationId);
  var raw = JSON.stringify({
    verification_id: verificationId,
    did: proofitem
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

 const result = await fetch(
    'https://api.liquid.com.hk/api/verifier/updateDIDForVerificationId',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      const resJson = JSON.parse(result)
      
      return resJson
    })
    .catch(error =>{return "error"});

    return result
};
