import axios from "axios";


const BASE_URL = "http://localhost:8888";
const service = axios.create(
    {
        baseURL: BASE_URL,
        timeout: 15000
    }
);

/**
 * 请求前拦截器
 */
service.interceptors.request.use(
    function (config) {
        // config.headers["Authorized"] = "123";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * 请求后拦截
 */
service.interceptors.response.use(
    function (response) {
        let data = response.data;
        if (response.status == 200 && data.code == 0) {
            return Promise.reject(data);
        } else {
            console.log(data);
            return  response;
        }
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default service;