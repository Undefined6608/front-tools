/**
 * 正则工具类
 * @authors 张杰
 * @date    2025-03-10
 */

// TODO: 账号正则
const userRegex = /^[a-zA-Z0-9@.\-_]{4,50}$/;

// TODO: 昵称正则
const nickNameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9@.\-_]{4,50}$/;

// TODO: 密码正则
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{8,50}$/;

// TODO: 邮箱正则
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

// TODO: 手机号码正则
const phoneRegex =
  /^(13[0-9]|14[5-9]|15[0-35-9]|16[6]|17[0-8]|18[0-9]|19[0-9]|147|166|17[0-1]|162)\d{8}$/;

// TODO: 名称正则
const nameRegex = /^(?!\d).*/;

// TODO: JSON正则
const jsonRegex = /^\s*(\{.*}|\[.*])\s*$/;

export default {
  userRegex,
  nickNameRegex,
  passwordRegex,
  emailRegex,
  phoneRegex,
  nameRegex,
  jsonRegex,
};
