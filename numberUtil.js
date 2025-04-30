/**
 * number工具类
 * @authors 张杰
 * @date    2025-03-10
 */

const
    /**
     * 转换包大小为MB,四舍五入
     * @param pageSize
     * @param {[type]} [place] [保留几位小数]
     * @return {string}          [转换后MB]
     */
    changePageSize = (pageSize, place) => {
        if (!pageSize) return "";
        let size = "";
        if (pageSize < 0.1 * 1024) {
            // TODO: 如果小于0.1KB转化成B
            size = pageSize.toFixed(place) + "B";
        } else if (pageSize < 0.1 * 1024 * 1024) {
            // TODO: 如果小于0.1MB转化成KB
            size = (pageSize / 1024).toFixed(place) + "KB";
        } else if (pageSize < 0.1 * 1024 * 1024 * 1024) {
            // TODO: 如果小于0.1GB转化成MB
            size = (pageSize / (1024 * 1024)).toFixed(place) + "MB";
        } else {
            // TODO: 其他转化成GB
            size = (pageSize / (1024 * 1024 * 1024)).toFixed(place) + "GB";
        }

        let sizeStr = size + "";
        let len = sizeStr.indexOf(".");
        let dec = sizeStr.substr(len + 1, 2);
        if (dec === "00") {
            // TODO: 当小数点后为00时 去掉小数部分
            return sizeStr.substring(0, len) + sizeStr.substr(len + 3, 2);
        }
        return sizeStr;
    };

export default {changePageSize};
