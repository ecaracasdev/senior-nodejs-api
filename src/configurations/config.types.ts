type Config = {
  port: number;
  origin: string;
  dbUri: string;
  saltWorkFactor: string;
  accessTokenTtl: string;
  refreshTokenTtl: string;
  publicKey: string;
  privateKey: string;
};

export default Config;
