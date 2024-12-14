const env = process.env;

const config = {
  port: env.PORT,
  mongoUrl: env.MONGODB_URL,
  accessToken: env.ACCESS_SECRET,
  refreshToken: env.REFRESH_SECRET,
};

export default config;
