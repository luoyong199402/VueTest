/**
 * 过滤特殊字符
 */
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 */
export function validateNull(value) {
    return (value == null || value.length == 0);
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value) ? true : false;
}

/**
 * 验证字符串最大长度
 */
export function validateMaxLength(value, length) {
    return value.length <= length;
}


/**
 * 验证字符串的长度为固定值
 */
export function validateEqLength(value, length) {
    return value.length == length;
}

/**
 * 验证字符串最小长度
 */
export function validateMinLength(value, length) {
    return value.length >= length;
}

/**
 * 验证字符串为数字
 */
export function validateNumber(value) {
    let reg = /^-?d+$/;
    return reg.test(value) ? true : false;
}

/**
 * 数据为一般数据 （数字 + 字母大小写）
 * @param value
 * @returns {boolean}
 */
export function validateCode(value) {
    let reg = /^[A-Za-z0-9]+$/;
    return reg.test(value) ? true : false;
}