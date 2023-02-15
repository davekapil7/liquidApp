import axios from "axios";
//import config from "../config/config";
//import http from "stream-http";
const server_url = "https://api.liquid.com.hk/api/";


//const httpAgent = new http.Agent({ keepAlive: true });

const axiosInstance = axios.create({
    baseURL: server_url,
    origin:true,
    withCredentials:true,
   // httpAgent:httpAgent,
    headers:{
     "Access-Control-Allow-Origin":"http://142.93.213.49:8000/",
    },
  });

  export default axiosInstance;