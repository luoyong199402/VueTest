import Vue from 'vue';
import Router from 'vue-router';

import Index from "@/components/index/Index";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "Index",
            hidden: true,
            meta: {
                name: "主页"
            }
        },
        {
            path: "/index",
            name: "Index",
            hidden: true,
            meta: {
                name: "首页"
            },
            component: Index
        },
        {
            path: "/login",
            name: "Login",
            hidden: true,
            meta: {
                name: "登录"
            },
            component: () => import("@/components/login/Login"),
            children: [
                {
                    path: "/",
                    name: "loginPage",
                    component: () => import("@/components/login/LoginPage")
                }, {
                    path: "/login_page",
                    name: "loginPage",
                    component: () => import("@/components/login/LoginPage")
                },
                {
                    path: "/register_page",
                    name: "registerPage",
                    component: () => import("@/components/login/RegisterPage")
                }
            ]
        }
    ]
})