import { v4 as uuidV4 } from "uuid";

// TODO: 创建uuid
const createUUID = (): string => uuidV4();

/**
 * TODO: UUID去掉横线
 * @param uuid 要处理的uuid字符串
 * @returns 去掉横线的uuid
 */
const removeHyphensFromUUID = (uuid: string): string => {
  return uuid.replace(/-/g, "");
};

export default {
  createUUID,
  removeHyphensFromUUID,
};
