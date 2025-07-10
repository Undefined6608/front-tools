/**
 * TODO: storage操作类
 * @authors 张杰
 * @date    2025-03-10
 */

/**
 * TODO: 存储sessionStorage
 * @param name key名
 * @param content 存储内容
 */
const setStore = (name: string, content: unknown): void => {
  if (!name) return;
  const value = typeof content === "string" ? content : JSON.stringify(content);
  window.sessionStorage.setItem(name, value);
};

/**
 * TODO: 获取sessionStorage
 * @param name key名
 * @param type 返回类型
 * @returns string | T | null
 */
const getStore = <T = unknown>(name: string, type?: StorageType): T | string | undefined => {
  if (!name) return undefined;
  const val = window.sessionStorage.getItem(name);
  if (val === null) return undefined;
  if (type === "json") {
    try {
      return JSON.parse(val) as T;
    } catch {
      return undefined;
    }
  }
  return val;
};

/**
 * TODO: 删除sessionStorage
 * @param name key名
 */
const removeStore = (name: string): void => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * TODO: 存储localStorage
 * @param name key名
 * @param content 存储内容
 */
const setLocalStore = (name: string, content: unknown): void => {
  if (!name) return;
  const value = typeof content === "string" ? content : JSON.stringify(content);
  window.sessionStorage.setItem(name, value);

  window.localStorage.setItem(name, value);
};

/**
 * TODO: 获取localStorage
 * @param name key名
 * @param type 返回类型
 * @returns string | T | null
 */
const getLocalStore = <T = unknown>(name: string, type?: StorageType): T | string | undefined => {
  if (!name) return undefined;
  const val = window.localStorage.getItem(name);
  if (val === null) return undefined;
  if (type === "json") {
    try {
      return JSON.parse(val) as T;
    } catch {
      return undefined;
    }
  }
  return val;
};

/**
 * TODO: 删除localStorage
 * @param name key名
 */
const removeLocalStore = (name: string): void => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

// token 通用操作封装
const getToken = <T = unknown>(name: string, type?: StorageType): T | string | undefined =>
  getStore<T>(name, type);
const setToken = (name: string, val: unknown): void => setStore(name, val);
const removeToken = (name: string): void => removeStore(name);

const getLocalStorage = <T = unknown>(name: string, type?: StorageType): T | string | undefined =>
  getLocalStore<T>(name, type);
const setLocalStorage = (name: string, val: unknown): void => setLocalStore(name, val);
const removeLocalStorage = (name: string): void => removeLocalStore(name);

export default {
  getToken,
  setToken,
  removeToken,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
};
