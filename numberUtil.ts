/**
 * number工具类
 * @authors 张杰
 * @date    2025-03-10
 */

/**
 * 转换包大小为MB，四舍五入
 * @param pageSize 文件大小，单位字节
 * @param place 保留小数位数，默认2位
 * @returns 转换后带单位的字符串
 */
function changePageSize(pageSize: number | null, place = 2): string {
  if (pageSize === null || pageSize === 0) return "";

  let size: string;

  if (pageSize < 0.1 * 1024) {
    // 如果小于0.1KB，转化成B
    size = pageSize.toFixed(place) + "B";
  } else if (pageSize < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB，转化成KB
    size = (pageSize / 1024).toFixed(place) + "KB";
  } else if (pageSize < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB，转化成MB
    size = (pageSize / (1024 * 1024)).toFixed(place) + "MB";
  } else {
    // 其他转化成GB
    size = (pageSize / (1024 * 1024 * 1024)).toFixed(place) + "GB";
  }

  // 去除小数点后无意义的0，比如 12.00 => 12
  if (size.indexOf(".") > 0) {
    size = size.replace(/\.?0+([KMGT]?B)$/, "$1");
  }

  return size;
}

export default { changePageSize };
