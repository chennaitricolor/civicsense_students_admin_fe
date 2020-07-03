require('dotenv').config();

module.exports = {
  IS_GCC: process.env.IS_GCC,
  APP_TITLE: process.env.APP_TITLE,
  AUTH_HEADER: process.env.AUTH_HEADER,
};
