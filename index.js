/**
 * 通用工具类
 * @authors 张杰
 * @date    2025-03-10
 */

import base from "./baseUtils";
import array from "./arrayUtil";
import date from "./dateUtil";
import number from "./numberUtil";
import storage from "./storageUtil";
import stringUtil from "./stringUtil";
import typeUtil from "./typeUtil";
import regex from "./regexUtil";
import uuid from "./uuidUtil";
import documentUtil from "./documentUtil";

// TODO: 导出所有的工具类
const utils = {
  // TODO: 基础方法
  base: base,
  // TODO: 数组工具类
  array: array,
  // TODO: 日期工具类
  date: date,
  // TODO: 数字工具类
  number: number,
  // TODO: 本地存储工具类
  storage: storage,
  // TODO: 字符串工具类
  string: stringUtil,
  // TODO: 类型检测工具类
  type: typeUtil,
  // TODO: 正则表达式工具类
  regex: regex,
  // TODO: UUID
  uuid: uuid,
  // TODO: document工具
  document: documentUtil,
};

// TODO: 导出入口函数
export default utils;
