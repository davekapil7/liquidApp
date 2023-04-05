import axios from "axios";
//import config from "../config/config";
//import http from "stream-http";
const server_url = "http://localhost:8000/";


//const httpAgent = new http.Agent({ keepAlive: true });

const axiosLocal = axios.create({
    baseURL: server_url,
    origin:true,
    withCredentials:true,
   // httpAgent:httpAgent,
    headers:{
     "Access-Control-Allow-Origin":"http://localhost:8000/",
    },
  });

  export default axiosLocal;