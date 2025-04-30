/**
 * 日期操作工具类
 * @authors 张杰
 * @date    2025-03-10
 */

// TODO: 格式化时间
const formatTime = (time = null, cFormat = "{y}-{m}-{d} {h}:{i}:{s}") => {
  if (time === null) return null;
  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const date = typeof time === "object" ? time : new Date(time);

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  return cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return result.length > 0 && value < 10 ? "0" + value : value || 0;
  });
};

// TODO: 转换秒数为字符串
const formatHMS = s => {
  if (s >= 3600) {
    return (
      Math.floor(s / 3600) +
      "h " +
      Math.floor((s % 3600) / 60) +
      "m " +
      (s % 60) +
      "s"
    );
  } else if (s >= 60) {
    return Math.floor(s / 60) + "m " + (s % 60) + "s";
  } else {
    return (s % 60) + "s";
  }
};

// TODO: 获得某月有多少天
const getMonthOfDay = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month === 2) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }
  return [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
};

// TODO: 获取某年的第一天
const getFirstDayOfYear = time => {
  const year = new Date(time).getFullYear();
  return new Date(`${year}-01-01T00:00:00`).getTime();
};

// TODO: 获取某年的最后一天
const getLastDayOfYear = time => {
  const year = new Date(time).getFullYear();
  const endDay = getMonthOfDay(`${year}-12-01`);
  return new Date(`${year}-12-${endDay}T23:59:59`).getTime();
};

// TODO: 获取某年有多少天
const getYearOfDay = time => {
  const firstDayYear = getFirstDayOfYear(time);
  const lastDayYear = getLastDayOfYear(time);
  const numSeconds = (lastDayYear - firstDayYear) / 1000;
  return Math.ceil(numSeconds / (24 * 3600));
};

// TODO: 获取某个日期是当年中的第几天
const getDayOfYear = time => {
  const firstDayYear = getFirstDayOfYear(time);
  const numSeconds = (new Date(time).getTime() - firstDayYear) / 1000;
  return Math.ceil(numSeconds / (24 * 3600));
};

// TODO: 获取某个星期在这一年的第几周
const getDayOfYearWeek = time => {
  const numDays = getDayOfYear(time);
  return Math.ceil(numDays / 7);
};

// TODO: 获取据当前时间差值

const getCurrentNowTime = (time, type) => {
  if (time === null) return null;
  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const date = typeof time === "object" ? time : new Date(time);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  const timeUnits = {
    seconds: diffSeconds,
    minutes: Math.floor(diffSeconds / 60),
    hours: Math.floor(diffSeconds / 3600),
    days: Math.floor(diffSeconds / 86400),
    weeks: Math.floor(diffSeconds / (86400 * 7)),
    months: Math.floor(diffSeconds / (86400 * 30)),
    years: Math.floor(diffSeconds / (86400 * 365)),
  };

  return timeUnits[type];
};

/**
 * TODO: 获取当前时间到指定时间的差值
 * @param {*} time 
 * @returns 
 */
const getCurrentNowTimeToType = time => {
  if (time === null) return null;
  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const date = typeof time === "object" ? time : new Date(time);

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "刚刚";
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else if (weeks < 52) {
    return `${weeks}周前`;
  } else {
    return `${years}年前`;
  }
};

// TODO: 时间加上/减去一段时间
const plusDays = (date, days, type = "time", referenceTime) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  if (referenceTime) {
    const reTime = new Date(referenceTime);
    if (days > 0) {
      if (result.getTime() > reTime.getTime()) {
        result.setTime(reTime.getTime());
      }
    } else {
      if (result.getTime() < reTime.getTime()) {
        result.setTime(reTime.getTime());
      }
    }
  }

  const year = result.getFullYear();
  const month = (result.getMonth() + 1).toString().padStart(2, "0");
  const day = result.getDate().toString().padStart(2, "0");
  const hours = result.getHours().toString().padStart(2, "0");
  const minutes = result.getMinutes().toString().padStart(2, "0");
  const seconds = result.getSeconds().toString().padStart(2, "0");

  if (type === "date") {
    return `${year}-${month}-${day}`;
  }
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// TODO: 导出所有函数
export default {
  formatTime,
  formatHMS,
  getMonthOfDay,
  getFirstDayOfYear,
  getLastDayOfYear,
  getYearOfDay,
  getDayOfYear,
  getDayOfYearWeek,
  getCurrentNowTime,
  getCurrentNowTimeToType,
  plusDays,
};
