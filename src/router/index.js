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
        },
        {
            name: "Info",
            path: "/info",
            mata: {
                name:"信息管理",
                icon: "info"
            },
            component: Index,
            children: [
                {
                    path: "/info/list",
                    name: "InfoList",
                    meta: {
                        name: "信息列表"
                    },
                    component: () => import("../components/info/InfoList")
                },
                {
                    path: "/info/type",
                    name: "InfoType",
                    meta: {
                        name: "信息分类"
                    },
                    component: () => import("../components/info/InfoType")
                }
            ]
        },

        /**
         * 控制台信息
         */
        {
            path: "/console",
            name: "Console",
            redirect: "index",
            meta: {
                name: "控制台",
                icon: "console"
            },
            component: Index,
            children: [
                {
                    path: "/index",
                    name: "Index",
                    meta: {
                        name: "首页"
                    },
                    component: () => import("../components/console/Console")
                }
            ]
        },

        /**
         * 用户管理
         */
        {
            path: "/user",
            name: "User",
            meta: {
                name: "用户管理",
                icon: "user"
            },
            component: Index,
            children: [
                {
                    path: "/userIndex",
                    name: "UserIndex",
                    meta: {
                        name: "用户列表"
                    },
                    component: () => import("../components/user/Index")
                }
            ]
        }
    ]
})