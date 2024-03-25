// const WXBizDataCrypt = require('./WXBizDataCrypt');
import { WXBizDataCrypt } from './WXBizDataCrypt';

export function getWeixinUserInfo({ appId, sessionKey, encryptedData, iv }) {
  const pc = new WXBizDataCrypt(appId, sessionKey);

  return pc.decryptData(encryptedData, iv);
}
