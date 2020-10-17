const axios = require('axios');
const { instance } = require("./instance");
const { getDeclension } = require("../utils/declension");

const getRandomWord = async () => {
  const { data } = await axios.get(`http://free-generator.ru/generator.php?action=word&type=2`)
  if (data) {
    return getDeclension(data.word.word);
  }
  return 'xороших';
}

const sendTextMessage = async (chatId, text) => {
  await instance.get(`/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
}

const sendPhoto = async (chatId) => {
  await instance.get(`/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent('https://static10.tgstat.ru/channels/_0/6d/6d23ef75722cd7dd31adab2b6e43f60b.jpg')}`);
}

const sendDice = async (chatId) => {
  await instance.get(`/sendDice?chat_id=${chatId}&emoji=${encodeURIComponent('🎲')}`);
}

module.exports = {
  getRandomWord, sendDice, sendPhoto, sendTextMessage
}
