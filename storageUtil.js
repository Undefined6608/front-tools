/**
 * TODO: storage操作类
 * @authors 张杰
 * @date    2025-03-10
 */

/**
 * TODO: 存储sessionStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * TODO: 获取sessionStorage
 */
const getStore = (name, type) => {
  if (!name) return;
  let val = window.sessionStorage.getItem(name);
  if (type === "json") {
    return JSON.parse(val);
  }
  return val;
};

/**
 * TODO: 删除sessionStorage
 */
const removeStore = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * TODO: 存储localStorage
 */
const setLocalStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * TODO: 获取localStorage
 */
const getLocalStore = (name, type) => {
  if (!name) return;
  let val = window.localStorage.getItem(name);
  if (type === "json") {
    return JSON.parse(val);
  }
  return val;
};

/**
 * TODO: 删除localStorage
 */
const removeLocalStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

const getToken = (name, type) => getStore(name, type);
const setToken = (name, val) => setStore(name, val);
const removeToken = (name) => removeStore(name);
const getLocalStorage = (name, type) => getLocalStore(name, type);
const setLocalStorage = (name, val) => setLocalStore(name, val);
const removeLocalStorage = (name) => removeLocalStore(name);

export default {
  getToken,
  setToken,
  removeToken,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
};
