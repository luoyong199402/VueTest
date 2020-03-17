import Vue from 'vue';
import Vuex from 'vuex';
import cookieJS from 'cookie_js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: cookieJS.get("token.token", ""),
        createTime: cookieJS.get("token.createTime", ""),
        expirationDate: cookieJS.get("token.expirationDate", "")
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
        }
    }
});

export default store;