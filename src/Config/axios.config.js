import axios from 'axios';
import { BASE_URL } from "./env";

// // 基础url
axios.defaults.baseURL = BASE_URL;

// // 拦截器配置
axios.interceptors.request.use(function(config){
    
    return config;

},function(error){

    return Promise.reject(error);

});

export default axios;