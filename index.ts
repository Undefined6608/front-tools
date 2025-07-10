/**
 * 通用工具类入口
 * @authors 张杰
 * @date    2025-03-10
 */

import array from "./arrayUtil";
import base from "./baseUtil";
import chart from "./chartUtil";
import commonUtil from "./commonUtil";
import date from "./dateUtil";
import documentUtil from "./documentUtil";
import number from "./numberUtil";
import regex from "./regexUtil";
import storage from "./storageUtil";
import stringUtil from "./stringUtil";
import typeUtil from "./typeUtil";
import uuid from "./uuidUtil";

// 给工具集定义接口，假设你已经给每个工具模块导出了对应类型，
// 否则需要单独导入它们的类型来组合
export interface Utils {
  base: typeof base;
  array: typeof array;
  date: typeof date;
  number: typeof number;
  storage: typeof storage;
  string: typeof stringUtil;
  type: typeof typeUtil;
  regex: typeof regex;
  uuid: typeof uuid;
  common: typeof commonUtil;
  document: typeof documentUtil;
  chart: typeof chart;
}

// 创建工具集对象并指定类型
const utils: Utils = {
  base,
  array,
  date,
  number,
  storage,
  string: stringUtil,
  type: typeUtil,
  regex,
  uuid,
  common: commonUtil,
  document: documentUtil,
  chart,
};

export default utils;
