import Router from './index';
import store from '../store/index'

// 白名单， 直接能访问的。
const whiteRouter = ["/login", "/login_page", "/register_page"]; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1


Router.beforeEach((to, from, next) => {
    // 判断是否登录
    if (store.state.token != null && store.state.token !== '') {
        next();
        return ;
    }

    // 判断是否处于白名单
    if (whiteRouter.indexOf(to.path) !== -1) {
        next();
        return ;
    }

    // 调整登录界面
    next("/login"); // 路由指向
});