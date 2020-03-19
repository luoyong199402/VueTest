import service from "@/utils/request";


/**
 * 获取用户信息
 */
export function getUserInfo() {
    return service.request({
        method: "get",
        url: "/api/public/user"
    });
}