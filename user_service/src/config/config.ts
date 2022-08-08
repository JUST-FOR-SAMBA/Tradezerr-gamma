import "dotenv/config";
export const config = {
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      keepAlive: true,
      socketTimeoutMS: 30000,
      autoIndex: false,
      retryWrites: false,
    },
    url: process.env.MONGODB_CONNETION,
  },
  server: {
    host: "localhost",
    port: 1337,
  },
};
