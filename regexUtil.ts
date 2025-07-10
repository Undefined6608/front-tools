/**
 * 正则工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const userRegex: RegExp = /^[a-zA-Z0-9@.\-_]{4,50}$/;

const nickNameRegex: RegExp = /^[\u4e00-\u9fa5a-zA-Z0-9@.\-_]{4,50}$/;

const passwordRegex: RegExp = /^[a-zA-Z0-9!@#$%^&*()_+]{8,50}$/;

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phoneRegex: RegExp =
  /^(13[0-9]|14[5-9]|15[0-35-9]|16[6]|17[0-8]|18[0-9]|19[0-9]|147|166|17[0-1]|162)\d{8}$/;

const nameRegex: RegExp = /^(?!\d).*/;

const jsonRegex: RegExp = /^\s*(\{.*}|\[.*])\s*$/;

export default {
  userRegex,
  nickNameRegex,
  passwordRegex,
  emailRegex,
  phoneRegex,
  nameRegex,
  jsonRegex,
};
