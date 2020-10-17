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
  const { data } = await instance.get(`/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
  if (data.ok) return data.result;
}

const sendPhoto = async (chatId) => {
  const { data } = await instance.get(`/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent('https://static10.tgstat.ru/channels/_0/6d/6d23ef75722cd7dd31adab2b6e43f60b.jpg')}`);
  if (data.ok) return data.result;
}

const sendDice = async (chatId) => {
  const { data } = await instance.get(`/sendDice?chat_id=${chatId}&emoji=${encodeURIComponent('🎲')}`);
  if (data.ok) return data.result;
}

module.exports = {
  getRandomWord, sendDice, sendPhoto, sendTextMessage
}
