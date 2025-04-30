import { useSuccessMessage, useWarningMessage } from "@/hooks/useMessage";

const fallbackCopyText = text => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // 避免滚动跳动
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {
    success = false;
  }

  document.body.removeChild(textarea);
  return success;
};


// TODO: 复制文本
const copyText = async text => {
  if (!text) {
    useWarningMessage("没有可复制的内容");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    useSuccessMessage("复制成功");
  } catch (err) {
    // 降级使用 execCommand
    const success = fallbackCopyText(text);
    if (success) {
      useSuccessMessage("复制成功");
    } else {
      useWarningMessage("复制失败，请手动复制");
    }
  }
};

export default {
  copyText,
};
