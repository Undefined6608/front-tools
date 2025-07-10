import { ElMessageBox } from "element-plus";

import { notifyWarning } from "./useMessage";

/**
 * 支持的类型
 */
type ConfirmModalType = "info" | "success" | "error" | "warning";

/**
 * 确认弹窗参数
 */
interface ConfirmModalOptions {
  type?: "confirm" | "prompt";
  title?: string;
  boxType?: ConfirmModalType;
  message?: string;
  cancelText?: string;
  onConfirm?: (inputValue?: string) => Promise<void> | void;
}

// 函数本体
export const useConfirmDialog = ({
  type = "confirm",
  boxType = "warning",
  title = "提示",
  message,
  onConfirm,
}: ConfirmModalOptions): Promise<string | void> => {
  return new Promise(resolve => {
    ElMessageBox({
      title,
      message,
      type: boxType,
      showCancelButton: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      closeOnPressEscape: false,
      inputPlaceholder: type === "prompt" ? "请输入内容" : undefined,
      showInput: type === "prompt",
      beforeClose(action, instance, done) {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;

          const inputValue =
            type === "prompt" ? instance.inputValue : undefined;

          Promise.resolve(onConfirm?.(inputValue))
            .then(result => {
              done();
              resolve(result ?? inputValue);
            })
            .catch(err => {
              notifyWarning(err?.message || "操作失败");
              instance.confirmButtonLoading = false;
            });
        } else {
          done();
        }
      },
    }).then().catch;
  });
};
