import { ElNotification } from "element-plus";

/**
 * 通用通知提示
 * @param type 消息类型：success | info | warning | error
 * @param message 主标题
 * @param description 副标题 / 详细说明
 * @param duration 持续时间，默认 3 秒
 * @param placement 展示位置，默认 topRight
 */
const showNotification = (
  type: "primary" | "success" | "warning" | "info" | "error" | "",
  message: string,
  description?: string,
  duration: number = 3,
  placement:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left" = "top-right"
): void => {
  ElNotification({
    type: type,
    title: message,
    message: description,
    duration: duration * 1000,
    position: placement,
  });
};

/**
 * 成功提示
 */
export const notifySuccess = (
  message: string = "操作成功",
  description?: string,
  duration?: number
): void => {
  showNotification("success", message, description, duration);
};

/**
 * 信息提示
 */
export const notifyInfo = (
  message: string = "提示",
  description?: string,
  duration?: number
): void => {
  showNotification("info", message, description, duration);
};

/**
 * 警告提示
 */
export const notifyWarning = (
  message: string = "警告",
  description?: string,
  duration?: number
): void => {
  showNotification("warning", message, description, duration);
};

/**
 * 错误提示
 */
export const notifyError = (
  message: string = "出错了",
  description?: string,
  duration?: number
): void => {
  showNotification("error", message, description, duration);
};
