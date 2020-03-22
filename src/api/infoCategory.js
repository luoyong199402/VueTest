import service from "@/utils/request";

/**
 * 增加分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function addInfoCategory(data) {
    return service.request({
        method: "post",
        url: "/api/info/category",
        data
    });
}

/**
 * 增加分类信息
 * @param data 分类数据
 * @returns {*}
 */
export function deleteInfoCategory(id) {
    return service.request({
        method: "delete",
        url: "/api/info/category/" + id
    });
}


/**
 * 获取指定层级的分类
 */
export function getInfoCategoryListByLevel(level) {
    return service.request({
        method: "get",
        url: "/api/info/category/level/" + level
    });
}

/**
 * 获取分类的所有子节点
 */
export function getInfoCategoryListByParentId(parentId) {
    return service.request({
        method: "get",
        url: "/api/info/category/parentId/" + parentId
    });
}


