/**
 * string字符串操作工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const stringUtils = {
  /**
   * TODO: 去除空格
   * @param {String} str - 要处理的字符串
   * @param {Number} type - 1-所有空格 2-前后空格 3-前空格 4-后空格
   * @return {String}
   */
  trim: (str, type = 1) => {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },

  /**
   * TODO: 转换大小写
   * @param {String} str - 要处理的字符串
   * @param {Number} type - 1-首字母大写  2-首字母小写  3-大小写转换  4-全部大写  5-全部小写
   * @return {String}
   */
  changeCase: (str, type = 4) => {
    switch (type) {
      case 1:
        return str.replace(
          /\b\w+\b/g,
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      case 2:
        return str.replace(
          /\b\w+\b/g,
          (word) => word.charAt(0).toLowerCase() + word.slice(1).toUpperCase()
        );
      case 3:
        return str
          .split("")
          .map((char) =>
            /[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  },

  /**
   * TODO: 检测密码强度
   * @param {String} str - 要检查的密码
   * @return {Number} - 密码强度等级
   */
  checkPwd: (str) => {
    let Lv = 0;
    if (str.length < 6) {
      return Lv;
    }
    if (/[0-9]/.test(str)) Lv++;
    if (/[a-z]/.test(str)) Lv++;
    if (/[A-Z]/.test(str)) Lv++;
    if (/[\\.|-|_]/.test(str)) Lv++;
    return Lv;
  },

  /**
   * TODO: 隐藏手机号码
   * @param {String} tel - 要处理的手机号码
   * @return {String} - 隐藏后的手机号码
   */
  hiddenTel: (tel) => {
    return tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  },

  /**
   * TODO: 隐藏邮箱
   * @param {String} email - 要处理的手机号码
   * @return {String} - 隐藏后的手机号码
   */
  hiddenEmail: (email) => {
    const [localPart, domain] = email.split("@");
    const hiddenLocalPart =
      localPart.length > 2
        ? localPart[0] + "****" + localPart[localPart.length - 1]
        : localPart.replace(/./g, "*"); // 若本地部分长度小于2，则全部替换为*
    return hiddenLocalPart && domain
      ? `${hiddenLocalPart}@${domain || ""}`
      : "";
  },

  /**
   * TODO: 过滤html代码(把<>转换)
   * @param {String} str - 要处理的字符串
   * @return {String} - 过滤后的字符串
   */
  filterTag: (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/ /g, "&nbsp;");
  },

  /**
   * TODO: UUID去掉横线
   */
  removeHyphensFromUUID: (uuid) => {
    return uuid.replace(/-/g, "");
  },
};

export default stringUtils;
