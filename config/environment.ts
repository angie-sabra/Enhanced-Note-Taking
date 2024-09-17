import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/SocialApp',
  jwtSecret: process.env.JWT_SECRET || 'd8fb2d8d434324f51ba94d906565b0f90af127cdcc42975732494dd95c0437bf5e5637b31e9355da0b0258c9114b8861184d76137a3506e61345719ca56655d',

  emailUser: process.env.MAILTRAP_USER || 'eed21d57fbddeb',
  emailPassword: process.env.MAILTRAP_PASSWORD || 'ad554ec5fe503d',


};