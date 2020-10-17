const axios = require('axios');

const instance = axios.create({
  baseURL: `${process.env.BASE_URL}${process.env.BOT_TOKEN}`,
});

module.exports.instance = instance;
