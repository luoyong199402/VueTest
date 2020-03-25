import service from "@/utils/request";

/**
 * 增加分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function addInfo(data) {
    return service.request({
        method: "post",
        url: "/api/info/",
        data
    });
}

/**
 * 删除分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function deleteInfo(id) {
    return service.request({
        method: "delete",
        url: "/api/info/" + id
    });
}

/**
 * 修改分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function updateInfo(id, data) {
    return service.request({
        method: "put",
        url: "/api/info/" + id,
        data
    });
}

/**
 * 通过id查询分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function getInfoById(id) {
    return service.request({
        method: "get",
        url: "/api/info/" + id
    });
}

/**
 * 通过id查询分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function queryInfo(query) {
    return service.request({
        method: "get",
        params: query,
        url: "/api/info/page"
    });
}