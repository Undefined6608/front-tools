/**
 * type类型判断工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const isString = (o: unknown): o is string =>
  Object.prototype.toString.call(o).slice(8, -1) === "String";

const isNumber = (o: unknown): o is number =>
  Object.prototype.toString.call(o).slice(8, -1) === "Number";

const isObj = <T extends object>(o: unknown): o is T =>
  Object.prototype.toString.call(o).slice(8, -1) === "Object";

const isArray = <T>(o: unknown): o is T[] =>
  Object.prototype.toString.call(o).slice(8, -1) === "Array";

const isDate = (o: unknown): o is Date =>
  Object.prototype.toString.call(o).slice(8, -1) === "Date";

const isBoolean = (o: unknown): o is boolean =>
  Object.prototype.toString.call(o).slice(8, -1) === "Boolean";

const isFunction = (o: unknown): o is Function =>
  Object.prototype.toString.call(o).slice(8, -1) === "Function";

const isNull = (o: unknown): o is null =>
  Object.prototype.toString.call(o).slice(8, -1) === "Null";

const isUndefined = (o: unknown): o is undefined =>
  Object.prototype.toString.call(o).slice(8, -1) === "Undefined";

const isFalse = (o: unknown): boolean => {
  return (
    !o ||
    o === "null" ||
    o === "undefined" ||
    o === "false" ||
    (typeof o === "number" && isNaN(o)) ||
    o === "NaN"
  );
};

const isTrue = (o: unknown): boolean => !isFalse(o);

const isEmpty = (value: unknown): boolean => {
  if (value === undefined) {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (typeof value === "number") {
    return false;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isObj<Record<PropertyKey, unknown>>(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
};

const isIos = (): boolean => {
  const u = navigator.userAgent;
  return u.includes("iPhone") && !u.includes("iPad");
};

const isPc = (): boolean => {
  const u = navigator.userAgent;
  const agents = [
    "Android",
    "iPhone",
    "SymbianOs",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  return !agents.some(agent => u.includes(agent));
};

const getIEVersion = (userAgent: string): string | undefined => {
  const match = userAgent.match(/MSIE (\d+\.\d+);/);
  if (!match) return undefined;
  const version = parseFloat(match[1]);
  if (version >= 11) return "IE11";
  return `IE${version}`;
};

const browserType = (): string => {
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

const checkStr = (str: string, type: CheckStrType): boolean => {
  const patterns: Record<CheckStrType, RegExp | ((s: string) => boolean)> = {
    phone: /^1[3|4|5|7|8][0-9]{9}$/,
    tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
    card: /^\d{15}$|^\d{18}$/,
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
