import jwt from "jsonwebtoken";
import ConfigManager from "../configurations/config.manager";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const config = ConfigManager.getConfiguration();
  return jwt.sign(object, config.privateKey);
}

export function verifyJwt(token: any) {
  try {
    const config = ConfigManager.getConfiguration();
    const decoded = jwt.verify(token, config.privateKey);
    return { valid: true, expired: false, decoded };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
