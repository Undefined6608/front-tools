/**
 * 日期操作工具类
 * @authors 张杰
 * @date    2025-03-10
 */

import dayjs from "dayjs";

/**
 * 格式化时间，支持自定义格式
 * @param time 时间，可以是时间戳（秒/毫秒）、字符串或Date对象，默认当前时间
 * @param cFormat 格式字符串，支持{y}年 {m}月 {d}日 {h}时 {i}分 {s}秒 {a}星期，默认"{y}-{m}-{d} {h}:{i}:{s}"
 * @returns 格式化后的字符串或null
 */
const formatTime = (
  time: TimeType = undefined,
  cFormat: FormatTimeString = "{y}-{m}-{d} {h}:{i}:{s}"
): string => {
  if (time === null) return "";

  // 秒级时间戳转换为毫秒
  if (String(time).length === 10) {
    time = +Number(time) * 1000;
  }

  const date = time instanceof Date ? time : new Date(time || "");

  // 取出各时间单位
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  // 替换格式字符串中的占位符
  return cFormat.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result, key: keyof typeof formatObj) => {
      const value = formatObj[key];
      // 星期用中文表示
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      // 小于10的数字补0
      return result.length > 0 && value < 10 ? "0" + value : value.toString();
    }
  );
};

/**
 * 将秒数转换为 "Xh Xm Xs" 格式字符串
 * @param s 秒数
 * @returns 格式化字符串
 */
const formatHMS = (s: number): string => {
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

/**
 * 获取某个月的天数，考虑闰年
 * @param time 日期时间，可以是字符串、数字、Date
 * @returns 天数
 */
const getMonthOfDay = (time: TimeType): number => {
  const date = new Date(time as string | number | Date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // 2月根据闰年规则判断
  if (month === 2) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }
  // 31天月份
  return [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
};

/**
 * 获取某年第一天时间戳（毫秒）
 * @param time 日期
 * @returns 时间戳
 */
const getFirstDayOfYear = (time: TimeType): number => {
  const year = new Date(time as string | number | Date).getFullYear();
  return new Date(`${year}-01-01T00:00:00`).getTime();
};

/**
 * 获取某年最后一天时间戳（毫秒）
 * @param time 日期
 * @returns 时间戳
 */
const getLastDayOfYear = (time: TimeType): number => {
  const year = new Date(time as string | number | Date).getFullYear();
  const endDay = getMonthOfDay(`${year}-12-01`);
  return new Date(`${year}-12-${endDay}T23:59:59`).getTime();
};

/**
 * 获取某年共有多少天，考虑闰年
 * @param time 日期
 * @returns 天数
 */
const getYearOfDay = (time: TimeType): number => {
  const firstDayYear = getFirstDayOfYear(time);
  const lastDayYear = getLastDayOfYear(time);
  const numSeconds = (lastDayYear - firstDayYear) / 1000;
  return Math.ceil(numSeconds / (24 * 3600));
};

/**
 * 获取某个日期是当年中的第几天
 * @param time 日期
 * @returns 天数
 */
const getDayOfYear = (time: TimeType): number => {
  const firstDayYear = getFirstDayOfYear(time);
  const numSeconds =
    (new Date(time as string | number | Date).getTime() - firstDayYear) / 1000;
  return Math.ceil(numSeconds / (24 * 3600));
};

/**
 * 获取某个日期是当年中的第几周
 * @param time 日期
 * @returns 周数
 */
const getDayOfYearWeek = (time: TimeType): number => {
  const numDays = getDayOfYear(time);
  return Math.ceil(numDays / 7);
};

/**
 * 获取当前时间与指定时间的差值
 * @param time 指定时间，支持秒/毫秒时间戳、Date等
 * @param type 差值单位，支持秒、分、小时、天、周、月、年
 * @returns 差值数量，或null
 */
const getCurrentNowTime = (
  time: TimeType,
  type: TimeUnit
): number | undefined => {
  if (time === null) return undefined;
  if (String(time).length === 10) {
    time = +Number(time) * 1000;
  }

  const date = time instanceof Date ? time : new Date(time || "");
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeUnits: Record<TimeUnit, number> = {
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
 * 获取当前时间到指定时间的差值描述字符串，如“刚刚”，“5分钟前”等
 * @param time 指定时间
 * @returns 描述字符串或null
 */
const getCurrentNowTimeToType = (time: TimeType): string | undefined => {
  if (time === null) return undefined;
  if (String(time).length === 10) {
    time = +Number(time) * 1000;
  }

  const date = time instanceof Date ? time : new Date(time || "");

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
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

/**
 * 在指定日期基础上增加或减少天数，返回格式化字符串
 * @param date 起始日期，支持字符串、时间戳、Date对象
 * @param days 增加（正数）或减少（负数）天数
 * @param type 返回类型，"date"返回年月日，"time"返回完整日期时间字符串
 * @param referenceTime 可选，限定结果不能超过该时间
 * @returns 格式化日期字符串
 */
const plusDays = (
  date: TimeType,
  days: number,
  type: PlusDaysType = "time",
  referenceTime?: TimeType
): string => {
  const result = new Date(date as string | number | Date);
  result.setDate(result.getDate() + days);

  if (referenceTime) {
    const reTime = new Date(referenceTime as string | number | Date);
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

/**
 * 生成时间列表
 * @param startTime 开始时间（如 '2025-06-27 08:00'）
 * @param endTime 结束时间（如 '2025-06-27 12:00'）
 * @param interval 间隔分钟数（如 30）
 * @param format 返回的时间格式（默认 'YYYY-MM-DD HH:mm'）
 * @returns 时间字符串数组
 */
const generateTimeList = (
  startTime: string,
  endTime: string,
  interval: number,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string[] => {
  const result: string[] = [];

  let current = dayjs(startTime);
  const end = dayjs(endTime);

  while (current.isBefore(end) || current.isSame(end)) {
    result.push(current.format(format));
    current = current.add(interval, "minute");
  }

  return result;
};

// TODO: 获取当前时间
const getCurrentTime = (format: string = "YYYY-MM-DD HH:mm:ss"): string => {
  return dayjs().format(format);
};

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
  generateTimeList,
  getCurrentTime,
};
