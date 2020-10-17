const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

module.exports.instance = instance;
