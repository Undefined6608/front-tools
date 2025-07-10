import { notifyWarning, notifySuccess } from "@/app/useMessage";

/**
 * 使用 document.execCommand 实现文本复制（兼容旧浏览器）
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
const fallbackCopyText = (text: string): boolean => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }

  document.body.removeChild(textarea);
  return success;
};

/**
 * 复制文本到剪贴板（优先使用 Clipboard API）
 * @param text 要复制的文本
 */
const copyText = async (text: string): Promise<void> => {
  if (!text) {
    notifyWarning("没有可复制的内容");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    notifySuccess("复制成功");
  } catch {
    const success = fallbackCopyText(text);
    if (success) {
      notifySuccess("复制成功");
    } else {
      notifyWarning("复制失败，请手动复制");
    }
  }
};

/**
 * 下载远程文件
 * @param fileUrl 文件链接
 * @param fileName 下载后的文件名
 */
const downloadFile = async (
  fileUrl: string,
  fileName: string
): Promise<void> => {
  try {
    const response = await fetch(fileUrl, { mode: "cors" });
    if (!response.ok) throw new Error("下载失败");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    notifySuccess("下载成功");
  } catch {
    notifyWarning("下载失败");
  }
};

export default {
  copyText,
  downloadFile,
};
