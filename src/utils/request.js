import axios from "axios";
import { Message } from 'element-ui';
import store from '../store/index';

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
        config.headers["Authorized"] = store.state.token;
        return config;
    },
    function (error) {
        Message({
            message: '请求接口失败！ ' + error,
            type: 'warning'
        });
        return Promise.reject(error);
    }
);

/**
 * 请求后拦截
 */
service.interceptors.response.use(
    function (response) {
        let data = response.data;
        if (response.status == 200) {
            return response;
        } else {
             Message({
                    message: '服务端处理请求失败！ ' + response.data.msg,
                    type: 'warning'
            });
            console.log(data);
            return Promise.reject(data);
        }
    },
    function (error) {
        let msg = error;
        if (error.response && error.response.data && error.response.data.msg) {
            msg = error.response.data.msg;
        }
        Message({
            message: '服务端处理请求失败！ ' + msg,
            type: 'warning'
        });
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;