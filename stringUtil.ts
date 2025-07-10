/**
 * string字符串操作工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const stringUtils = {
  /**
   * TODO: 去除空格
   * @param str 要处理的字符串
   * @param type 1-所有空格 2-前后空格 3-前空格 4-后空格
   * @returns 处理后的字符串
   */
  trim: (str: string, type: 1 | 2 | 3 | 4 = 1): string => {
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
   * @param str 要处理的字符串
   * @param type 1-首字母大写  2-首字母小写  3-大小写转换  4-全部大写  5-全部小写
   * @returns 处理后的字符串
   */
  changeCase: (str: string, type: 1 | 2 | 3 | 4 | 5 = 4): string => {
    switch (type) {
      case 1:
        return str.replace(
          /\b\w+\b/g,
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        );
      case 2:
        return str.replace(
          /\b\w+\b/g,
          (word) => word.charAt(0).toLowerCase() + word.slice(1).toUpperCase(),
        );
      case 3:
        return str
          .split("")
          .map((char) => (/[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase()))
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
   * @param str 要检查的密码
   * @returns 密码强度等级（0-4）
   */
  checkPwd: (str: string): number => {
    let Lv = 0;
    if (str.length < 6) {
      return Lv;
    }
    if (/[0-9]/.test(str)) Lv++;
    if (/[a-z]/.test(str)) Lv++;
    if (/[A-Z]/.test(str)) Lv++;
    if (/[\.\-\_]/.test(str)) Lv++;
    return Lv;
  },

  /**
   * TODO: 隐藏手机号码
   * @param tel 要处理的手机号码
   * @returns 隐藏后的手机号码
   */
  hiddenTel: (tel: string): string => {
    return tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  },

  /**
   * TODO: 隐藏邮箱
   * @param email 要处理的邮箱地址
   * @returns 隐藏后的邮箱
   */
  hiddenEmail: (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (!domain) return "";
    const hiddenLocalPart =
      localPart.length > 2
        ? localPart[0] + "****" + localPart[localPart.length - 1]
        : localPart.replace(/./g, "*"); // 若本地部分长度小于2，则全部替换为*
    return `${hiddenLocalPart}@${domain}`;
  },

  /**
   * TODO: 过滤html代码(把<>转换)
   * @param str 要处理的字符串
   * @returns 过滤后的字符串
   */
  filterTag: (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/ /g, "&nbsp;");
  },
};

export default stringUtils;
