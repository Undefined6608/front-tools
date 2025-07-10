// TODO: 不存在
const IS_FIND = -1;

/** 判断数组中是否包含某个值 */
function contains<T>(arr: T[], val: T): boolean {
  return arr.indexOf(val) !== IS_FIND;
}

/**
 * 通用排序函数
 * @param arr 要排序的数组
 * @param ele 要排序的字段名
 * @param typeStore 排序方式：date/number/other
 * @param type 排序方向：1升序，2降序，3随机
 * @param isBase 是否为基本类型数组
 */
function sort(
  arr: string[],
  ele: never,
  typeStore: "date" | "other",
  type: 1 | 2 | 3,
  isBase: true
): string[];
function sort(
  arr: number[],
  ele: never,
  typeStore: "number",
  type: 1 | 2 | 3,
  isBase: true
): number[];
function sort<T>(
  arr: T[],
  ele: keyof T,
  typeStore: "date" | "other" | "number",
  type: 1 | 2 | 3,
  isBase?: false
): T[];
function sort<T>(
  arr: T[],
  ele: keyof T,
  typeStore: "date" | "other" | "number",
  type: 1 | 2 | 3,
  isBase = false
): T[] {
  if (type === 3) return shuffleArray(arr);

  switch (typeStore) {
    case "date":
      return isBase
        ? (sortByDateBase(arr as string[], type) as T[])
        : sortByDate(arr, ele, type);
    case "other":
      return isBase
        ? (sortByOtherBase(arr as string[]) as T[])
        : sortByOther(arr, ele);
    default:
      return isBase
        ? (sortByNumberBase(arr as number[], type) as T[])
        : sortByNumber(arr, ele, type);
  }
}

/**
 * 参考字符串顺序对对象数组排序
 */
function sortByReference<T extends Record<K, string>, K extends keyof T>(
  arr: T[],
  ele: K,
  reference: string[],
  isInclude = false
): T[] {
  return arr.slice().sort((a, b) => {
    const indexA = getReferenceIndex(a[ele], reference, isInclude);
    const indexB = getReferenceIndex(b[ele], reference, isInclude);
    return indexA !== IS_FIND && indexB !== IS_FIND
      ? indexA - indexB
      : indexA !== IS_FIND
        ? IS_FIND
        : indexB !== IS_FIND
          ? 1
          : 0;
  });
}

/**
 * 参考顺序对字符串数组排序
 */
function sortByReferenceToBase<T extends string>(
  arr: T[],
  reference: T[],
  isInclude = false
): T[] {
  return arr.slice().sort((a, b) => {
    const indexA = getReferenceIndex(a, reference, isInclude);
    const indexB = getReferenceIndex(b, reference, isInclude);
    return indexA !== IS_FIND && indexB !== IS_FIND
      ? indexA - indexB
      : indexA !== IS_FIND
        ? IS_FIND
        : indexB !== IS_FIND
          ? 1
          : 0;
  });
}

/**
 * 自定义 map 函数，跳过 null/undefined
 */
function map<T, U>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => U | null | undefined,
  thisObj?: unknown
): U[] {
  const scope = thisObj ?? globalThis;
  const a: U[] = [];
  for (let i = 0; i < arr.length; ++i) {
    const res = fn.call(scope, arr[i], i, arr);
    if (res !== null && res !== undefined) a.push(res);
  }
  return a;
}

/** 数组去重 */
function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/** 对象数组去重 */
function uniqueObjects<T extends object>(arr: T[]): T[] {
  const seen = new Set<string>();
  return arr.filter(item => {
    const str = JSON.stringify(item);
    return seen.has(str) ? false : seen.add(str);
  });
}

/** 求数组并集 */
function union<T>(a: T[], b: T[]): T[] {
  return unique([...a, ...b]);
}

/** 求数组交集 */
function intersect<T>(a: T[], b: T[]): T[] {
  return unique(a).filter(item => contains(b, item));
}

/** 从数组中移除元素 */
function remove<T>(arr: T[], ele: T): T[] {
  const index = arr.indexOf(ele);
  if (index > IS_FIND) arr.splice(index, 1);
  return arr;
}

/** 转为真正的数组 */
function formArray<T>(ary: ArrayLike<T>): T[] {
  return Array.isArray(ary) ? ary : Array.prototype.slice.call(ary);
}

/** 将数组转为对象，指定字段为 key */
function arrayToObject<T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  keyField: K
): Record<T[K], T> {
  const obj = {} as Record<T[K], T>;
  for (const item of arr) {
    obj[item[keyField]] = item;
  }
  return obj;
}

/** 数组最大值 */
function max(arr: number[]): number {
  return Math.max(...arr);
}

/** 数组最小值 */
function min(arr: number[]): number {
  return Math.min(...arr);
}

/** 数组求和 */
function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

/** 数组平均值 */
function average(arr: number[]): number {
  return sum(arr) / arr.length;
}

/** 深拷贝对象 */
function deepCopy<T>(source: T): T {
  if (typeof source !== "object" || source === null) {
    // 基本类型直接返回
    return source;
  }

  if (Array.isArray(source)) {
    // 数组递归拷贝
    return source.map(item => deepCopy(item)) as unknown as T;
  }

  // 对象递归拷贝
  const target = {} as { [key in keyof T]: T[key] };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = deepCopy(source[key]);
    }
  }
  return target;
}

/**
 * 可递归嵌套的企业对象
 */
interface RecursiveEnterprise {
  enterprises?: RecursiveEnterprise[];
}

/** 删除空 children 的递归对象 */
function recursionDelete<T extends RecursiveEnterprise>(list: T[]): T[] {
  list.forEach(item => {
    if (item.enterprises?.length === 0) {
      delete item.enterprises;
    } else if (item.enterprises) {
      recursionDelete(item.enterprises);
    }
  });
  return list;
}

/**
 * 补齐时间序列中的缺失项
 */
function arrCompleteByTime<
  T extends Record<string, unknown>,
  K extends keyof T,
  FillKey extends keyof T,
>(
  arr: T[],
  timeList: T[K][],
  timeEle: K,
  keys: FillKey[],
  defaultValue: T[FillKey] = 0 as T[FillKey]
): T[] {
  return timeList.map(time => {
    const existing = arr.find(v => v[timeEle] === time);
    if (existing) return existing;

    const filledData = { [timeEle]: time } as unknown as Partial<T>;

    const prevData = arr.find(v => v[timeEle] < time);
    const nextData = arr.find(v => v[timeEle] > time);
    const referenceData = (prevData ?? nextData ?? {}) as Partial<T>;

    Object.keys(referenceData).forEach(key => {
      if (key !== timeEle && !keys.includes(key as FillKey)) {
        filledData[key as keyof T] = referenceData[key as keyof T];
      }
    });

    keys.forEach(key => {
      filledData[key] = defaultValue;
    });

    return filledData as T;
  });
}

/** 按 key 分组 */
function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }

  return result;
}

// --- 辅助函数（私有） ---
function sortByDate<T>(arr: T[], ele: keyof T, type: 1 | 2): T[] {
  return arr.sort((a, b) =>
    type === 1
      ? new Date(String(a[ele])).getTime() - new Date(String(b[ele])).getTime()
      : new Date(String(b[ele])).getTime() - new Date(String(a[ele])).getTime()
  );
}

function sortByDateBase(arr: string[], type: 1 | 2): string[] {
  return arr.sort((a, b) =>
    type === 1
      ? new Date(a).getTime() - new Date(b).getTime()
      : new Date(b).getTime() - new Date(a).getTime()
  );
}

function sortByNumber<T>(arr: T[], ele: keyof T, type: 1 | 2): T[] {
  return arr.sort((a, b) =>
    type === 1
      ? (a[ele] as number) - (b[ele] as number)
      : (b[ele] as number) - (a[ele] as number)
  );
}

function sortByNumberBase(arr: number[], type: 1 | 2): number[] {
  return arr.sort((a, b) => (type === 1 ? a - b : b - a));
}

function sortByOther<T>(arr: T[], ele: keyof T): T[] {
  return arr.sort((a, b) => compareComplex(String(a[ele]), String(b[ele])));
}

function sortByOtherBase(arr: string[]): string[] {
  return arr.sort(compareComplex);
}

/** 英文+数字+中文混合排序辅助 */
function compareComplex(a: string, b: string): number {
  const pa = extractParts(a ?? "z9");
  const pb = extractParts(b ?? "z9");
  const eng = pa.engPart.localeCompare(pb.engPart, "en", {
    sensitivity: "base",
  });
  if (eng !== 0) return eng;
  const num = pa.numPart - pb.numPart;
  if (num !== 0) return num;
  return pa.chiPart.localeCompare(pb.chiPart, "zh-CN");
}

/** 打乱数组顺序 */
function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** 拆分字符串中的英文字母/数字/中文 */
function extractParts(str: string): {
  engPart: string;
  numPart: number;
  chiPart: string;
} {
  const match = str.match(/^([A-Za-z]*)(\d*)([\u4e00-\u9fa5]*)/);
  return {
    engPart: match?.[1] || "zzzzzz",
    numPart: match?.[2] ? parseInt(match[2], 10) : Number.MAX_SAFE_INTEGER,
    chiPart: match?.[3] || "",
  };
}

function getReferenceIndex(
  value: string,
  reference: string[],
  isInclude: boolean
): number {
  for (let i = 0; i < reference.length; i++) {
    if (isInclude ? value?.includes(reference[i]) : value === reference[i]) {
      return i;
    }
  }
  return IS_FIND;
}

/**
 * 生成指定长度的随机整数数组
 * @param length 随机数个数
 * @param min 最小值（默认 0）
 * @param max 最大值（默认 100）
 * @param allowRepeat 是否允许重复（默认 true）
 * @returns 随机整数数组
 */
const generateRandomNumbers = (
  length: number,
  min: number = 0,
  max: number = 100,
  allowRepeat: boolean = true
): number[] => {
  if (max < min) {
    throw new Error("最大值不能小于最小值");
  }

  const range = max - min + 1;
  if (!allowRepeat && range < length) {
    throw new Error("范围不足以生成不重复的随机数");
  }

  const result: number[] = [];

  while (result.length < length) {
    const rand = Math.floor(Math.random() * range) + min;
    if (allowRepeat || !result.includes(rand)) {
      result.push(rand);
    }
  }

  return result;
};

export default {
  contains,
  sort,
  sortByReference,
  sortByReferenceToBase,
  map,
  unique,
  uniqueObjects,
  union,
  intersect,
  remove,
  formArray,
  arrayToObject,
  max,
  min,
  sum,
  average,
  deepCopy,
  recursionDelete,
  arrCompleteByTime,
  groupBy,
  generateRandomNumbers,
};
