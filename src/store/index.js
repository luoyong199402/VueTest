import Vue from 'vue';
import Vuex from 'vuex';
import cookieJS from 'cookie_js';
import {getUserInfo} from "@/api/user";

Vue.use(Vuex);

alert( localStorage.getItem("userInfo"))
console.log( localStorage.getItem("userInfo"))

const store = new Vuex.Store({
    state: {
        token: cookieJS.get("token.token", ""),
        createTime: cookieJS.get("token.createTime", ""),
        expirationDate: cookieJS.get("token.expirationDate", ""),
        userInfo: getLocalStorage("userInfo")
    },

    mutations: {
        setToken(state, tokenInfo) {
            state.token = tokenInfo.token;
            state.createTime = tokenInfo.createTime;
            state.expirationDate = tokenInfo.expirationDate;
            cookieJS.set({
                'token.token': tokenInfo.token,
                'token.createTime': tokenInfo.createTime,
                'token.expirationDate': tokenInfo.expirationDate
            }, {
                expires: tokenInfo.expirationDate - 60
            });
        },
        clearToken(state) {
            state.token = "";
            state.createTime = "";
            state.expirationDate = "";
            cookieJS.remove(['token.token', 'token.createTime', 'token.expirationDate']);
        },
        setUserInfo(state, tokenInfo) {
            state.userInfo = tokenInfo;
            localStorage.setItem("userInfo", JSON.stringify(tokenInfo))
        },
        clearUserInfo(state) {
            state.userInfo = {};
        }
    },

    actions: {
        setUserInfo({context}) {
            debugger;
            getUserInfo().then(function(response) {
                context.commit(response.data);
            });
        }
    }
});

const getLocalStorage = (key) => {
    return "{}";
}

export default store;