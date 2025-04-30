/**
 * 数组操作工具类
 * @authors 张杰
 * @date    2025-03-10
 */

// TODO: 判断一个元素是否在数组内
const contains = (arr, val) => arr.indexOf(val) !== -1;

// TODO: 数组排序
const sort = (arr, ele, typeStore, type, isBase = false) => {
  if (type === 3) return shuffleArray(arr);

  switch (typeStore) {
    case "date":
      if (isBase) return sortByDateBase(arr, type);
      return sortByDate(arr, ele, type);
    case "other":
      if (isBase) return sortByOtherBase(arr);
      return sortByOther(arr, ele);
    default:
      if (isBase) return sortByNumberBase(arr);
      return sortByNumber(arr, ele, type);
  }
};

// TODO: 按数组顺序排序对象数组
const sortByReference = (arr, ele, reference, isInclude = false) => {
  return arr.slice().sort((a, b) => {
    const indexA = getReferenceIndex(a[ele], reference, isInclude);
    const indexB = getReferenceIndex(b[ele], reference, isInclude);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });
};

// TODO: 按数组顺序排序
const sortByReferenceToBase = (arr, reference, isInclude = false) => {
  return arr.slice().sort((a, b) => {
    const indexA = getReferenceIndex(a, reference, isInclude);
    const indexB = getReferenceIndex(b, reference, isInclude);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });
};

// TODO: 类似于数组的 map 方法
const map = (arr, fn, thisObj) => {
  const scope = thisObj || window;
  const a = [];
  for (let i = 0; i < arr.length; ++i) {
    const res = fn.call(scope, arr[i], i, arr);
    if (res != null) a.push(res);
  }
  return a;
};

// TODO: 去重
const unique = arr => Array.from(new Set(arr));

// TODO: 对象列表去重
const uniqueObjects = arr => {
  const seen = new Set();
  return arr.filter(item => {
    const str = JSON.stringify(item);
    return seen.has(str) ? false : seen.add(str);
  });
};

// TODO: 求两个集合的并集
const union = (a, b) => unique(a.concat(b));

// TODO: 求两个集合的交集
const intersect = (a, b) => {
  a = unique(a);
  return map(a, o => (contains(b, o) ? o : null));
};

// TODO: 删除数组中的一个元素
const remove = (arr, ele) => {
  const index = arr.indexOf(ele);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

// TODO: 将类数组对象转换为数组
const formArray = ary =>
  Array.isArray(ary) ? ary : Array.prototype.slice.call(ary);

// TODO: 将数组转化为对象
const arrayToObject = (arr, keyField) => {
  return arr.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
};

// TODO: 返回数组中的最大值
const max = arr => Math.max.apply(null, arr);

// TODO: 返回数组中的最小值
const min = arr => Math.min.apply(null, arr);

// TODO: 计算数组元素的总和
const sum = arr => arr.reduce((pre, cur) => pre + cur, 0);

// TODO: 计算数组的平均值
const average = arr => sum(arr) / arr.length;

// TODO: 深度克隆一个数组或对象
const deepCopy = (arr, aimArr = {}) => {
  for (const key in arr) {
    if (typeof arr[key] === "object") {
      aimArr[key] = Array.isArray(arr[key]) ? [] : {};
      deepCopy(arr[key], aimArr[key]);
    } else {
      aimArr[key] = arr[key];
    }
  }
  return aimArr;
};

// TODO: 递归删除空的 enterprises 属性
const recursionDelete = list => {
  list.forEach(item => {
    if (item.enterprises.length === 0) {
      delete item.enterprises;
    } else {
      recursionDelete(item.enterprises);
    }
  });
  return list;
};

/**
 * TODO: 按时间补全列表
 * @param {*} arr 待补全的列表
 * @param {*} timeList 时间列表
 * @param {*} timeEle 时间键
 * @param {*} keys 待补全的健
 * @param {*} defaultValue 默认补全值
 * @returns 补全后的列表
 */
const arrCompleteByTime = (arr, timeList, timeEle, keys, defaultValue = 0) => {
  return timeList.map(time => {
    let existingData = arr.find(v => v[timeEle] === time);

    if (existingData) {
      return existingData;
    } else {
      let filledData = { [timeEle]: time };

      // 获取最近的已有数据（前一个或后一个）
      let prevData = arr.find(v => v[timeEle] < time);
      let nextData = arr.find(v => v[timeEle] > time);

      let referenceData = prevData || nextData || {};

      // 继承非 keys 和时间字段的值
      Object.keys(referenceData).forEach(key => {
        if (key !== timeEle && !keys.includes(key)) {
          filledData[key] = referenceData[key];
        }
      });

      // 填充 keys 指定的字段
      keys.forEach(key => (filledData[key] = defaultValue));

      return filledData;
    }
  });
};

// TODO: 按某实现分组
const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

const sortByDate = (arr, ele, type) => {
  return arr.sort((a, b) => {
    const timeA = new Date(a[ele]).getTime();
    const timeB = new Date(b[ele]).getTime();
    return type === 1 ? timeA - timeB : timeB - timeA;
  });
};

const sortByDateBase = (arr, type) => {
  return arr.sort((a, b) => {
    const timeA = new Date(a).getTime();
    const timeB = new Date(b).getTime();
    return type === 1 ? timeA - timeB : timeB - timeA;
  });
};

const sortByNumber = (arr, ele, type) => {
  return arr.sort((a, b) => {
    return type === 1 ? a[ele] - b[ele] : b[ele] - a[ele];
  });
};

const sortByNumberBase = (arr, type) => {
  return arr.sort((a, b) => {
    return type === 1 ? a - b : b - a;
  });
};

const sortByOther = (arr, ele) => {
  return arr.sort((a, b) => {
    let partA = extractParts(a[ele] ?? "z9");
    let partB = extractParts(b[ele] ?? "z9");

    // 1. 先排英文（不区分大小写）
    let englishCompare = partA.engPart.localeCompare(partB.engPart, "en", {
      sensitivity: "base",
    });
    if (englishCompare !== 0) return englishCompare;

    // 2. 再排数字
    let numCompare = partA.numPart - partB.numPart;
    if (numCompare !== 0) return numCompare;

    // 3. 最后排中文
    return partA.chiPart.localeCompare(partB.chiPart, "zh-CN");
  });
};

const sortByOtherBase = arr => {
  return arr.sort((a, b) => {
    let partA = extractParts(a ?? "z9");
    let partB = extractParts(b ?? "z9");
    
    // 1. 先排英文（不区分大小写）
    let englishCompare = partA.engPart.localeCompare(partB.engPart, "en", {
      sensitivity: "base",
    });
    if (englishCompare !== 0) return englishCompare;

    // 2. 再排数字
    let numCompare = partA.numPart - partB.numPart;
    if (numCompare !== 0) return numCompare;

    // 3. 最后排中文
    return partA.chiPart.localeCompare(partB.chiPart, "zh-CN");
  });
};

const shuffleArray = arr => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const extractParts = str => {
  // 从字符串头部依次匹配 英文、数字、中文
  const match = str.match(/^([A-Za-z]*)(\d*)([\u4e00-\u9fa5]*)/);

  return {
    engPart: match?.[1] || "zzzzzz", // "zzzzzz" 保证无英文的排在后面
    numPart: match?.[2] ? parseInt(match[2], 10) : Number.MAX_SAFE_INTEGER,
    chiPart: match?.[3] || "",
  };
};

const getReferenceIndex = (value, reference, isInclude) => {
  for (let i = 0; i < reference.length; i++) {
    if (isInclude ? value?.includes(reference[i]) : value === reference[i]) {
      return i;
    }
  }
  return -1; // 不存在
};

// TODO: 导出所有函数
export default {
  contains,
  sort,
  sortByReference,
  sortByReferenceToBase,
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
};
