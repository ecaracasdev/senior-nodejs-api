export default {
  port: process.env.PORT || 8080,
  dbUri: process.env.MONGO_URI || "mongodb://localhost:27017/rest-api-tutorial",
  origin: process.env.ORIGIN || "http://localhost:3000",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: process.env.SECRET_JWT || `secretKey`,
};
