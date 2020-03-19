import service from "@/utils/request";

/**
 * 获取验证码
 */
export function getSms(data) {
    return service.request({
        method: "post",
        url: "/api/public/code",
        data
    });
}

/**
 * 登录
 */
export function login(data) {
    return service.request({
        method: "post",
        url: "/api/login",
        data
    })
}

/**
 * 退出登录
 */
export function logout() {
    return service.request({
        method: "post",
        url: "/api/logout",
        data: {}
    })
}

/**
 * 注册
 */
export function register(data) {
    return service.request({
        method: "post",
        url: "/api/public/user",
        data
    })
}


