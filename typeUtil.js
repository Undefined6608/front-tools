/**
 * type类型判断工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const isString = o =>
  Object.prototype.toString.call(o).slice(8, -1) === "String"; // 是否字符串
const isNumber = o =>
  Object.prototype.toString.call(o).slice(8, -1) === "Number"; // 是否数字
const isObj = o => Object.prototype.toString.call(o).slice(8, -1) === "Object"; // 是否对象
const isArray = o => Object.prototype.toString.call(o).slice(8, -1) === "Array"; // 是否数组
const isDate = o => Object.prototype.toString.call(o).slice(8, -1) === "Date"; // 是否时间
const isBoolean = o =>
  Object.prototype.toString.call(o).slice(8, -1) === "Boolean"; // 是否boolean
const isFunction = o =>
  Object.prototype.toString.call(o).slice(8, -1) === "Function"; // 是否函数
const isNull = o => Object.prototype.toString.call(o).slice(8, -1) === "Null"; // 是否为null
const isUndefined = o =>
  Object.prototype.toString.call(o).slice(8, -1) === "Undefined"; // 是否为undefined

/**
 * TODO: 是否不存在
 * @param {*} o
 * @returns
 */
const isFalse = o => {
  return (
    !o || o === "null" || o === "undefined" || o === "false" || o === "NaN"
  );
};

/**
 * TODO: 是否存在
 * @param {*} o
 * @returns
 */
const isTrue = o => !isFalse(o);

// TODO： 是否为空
export function isEmpty(value) {
  if (value == null) {
    // null 或 undefined
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (typeof value === "number") {
    return false; // 数字永远不是空的，比如 0 也不是空
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false; // 其他类型（比如函数、布尔值）默认不是空
}

const isIos = () => {
  // 是否ios
  const u = navigator.userAgent;
  return u.indexOf("iPhone") > -1 && u.indexOf("iPad") === -1;
};

const isPc = () => {
  // 是否为pc端
  const u = navigator.userAgent;
  const agents = [
    "Android",
    "iPhone",
    "SymbianOs",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  return !agents.some(agent => u.indexOf(agent) > -1);
};

const getIEVersion = userAgent => {
  const match = userAgent.match(/MSIE (\d+\.\d+);/);
  if (!match) return null;
  const version = parseFloat(match[1]);
  if (version >= 11) return "IE11";
  return `IE${version}`; // IE10, IE9, IE8, IE7
};

const browserType = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("compatible") && userAgent.includes("MSIE")) {
    return getIEVersion(userAgent) || "IE7以下";
  }

  const browserMap = [
    { keyword: "Edge", name: "Edge" },
    { keyword: "Opera", name: "Opera" },
    { keyword: "Firefox", name: "FF" },
    { keyword: "Safari", name: "Safari", exclude: "Chrome" },
    { keyword: "Chrome", name: "Chrome", require: "Safari" },
  ];

  return (
    browserMap.find(
      browser =>
        userAgent.includes(browser.keyword) &&
        (!browser.exclude || !userAgent.includes(browser.exclude)) &&
        (!browser.require || userAgent.includes(browser.require))
    )?.name || "Unknown"
  );
};

const checkStr = (str, type) => {
  const patterns = {
    phone: /^1[3|4|5|7|8][0-9]{9}$/,
    tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
    card: /^\d{15}|\d{18}$/,
    pwd: /^[a-zA-Z]\w{5,17}$/,
    postal: /^[1-9]\d{5}(?!\d)/,
    QQ: /^[1-9][0-9]{4,9}$/,
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    money: /^\d*(?:\.\d{0,2})?$/,
    URL: /(http|ftp|https):\/\/[\w-_]+(\.[\w-_]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?/,
    IP: /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/,
    number: /^[0-9]+$/,
    english: /^[a-zA-Z]+$/,
    chinese: /^[\u4E00-\u9FA5]+$/,
    lower: /^[a-z]+$/,
    upper: /^[A-Z]+$/,
    HTML: /<("[^"]*"|'[^']*'|[^'">])*>/,
    date: s =>
      /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(s) ||
      /^(\d{4})-(\d{2})-(\d{2})$/.test(s),
  };

  const pattern = patterns[type];
  if (!pattern) return true;
  return typeof pattern === "function" ? pattern(str) : pattern.test(str);
};

export default {
  isString,
  isNumber,
  isObj,
  isArray,
  isDate,
  isBoolean,
  isFunction,
  isNull,
  isUndefined,
  isFalse,
  isTrue,
  isEmpty,
  isIos,
  isPc,
  browserType,
  checkStr,
};
