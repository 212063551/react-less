const isDevelopment = process.env.NODE_ENV === "development"; // 是否是开发模式
const isProduction = process.env.NODE_ENV === "production"; // 是否是开发模式
module.exports = { isDevelopment, isProduction };
