const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

const getRandomWord = async () => {
  const { data } = await axios.get(`http://free-generator.ru/generator.php?action=word&type=2`)
  if (data) {
    return data.word.word.slice(0, -1) + 'x'
  }
  return 'xороших'
}

const sendMessage = async (message) => {
  let text;
  if (message.sticker || message.video) {
    text = 'Супер 👍'
  } else if (message.dice) {
    const { data } = await axios.get(`${process.env.BASE_URL}${process.env.BOT_TOKEN}/sendDice?chat_id=${message.chat.id}&emoji=${encodeURIComponent('🎲')}`);
    text = 'dice';
    if (data.ok) return data.result
  }
    else if (message.photo) {
      const { data } = await axios.get(`${process.env.BASE_URL}${process.env.BOT_TOKEN}/sendPhoto?chat_id=${message.chat.id}&photo=${encodeURIComponent('https://static10.tgstat.ru/channels/_0/6d/6d23ef75722cd7dd31adab2b6e43f60b.jpg')}`);
      text = 'photo';
      if (data.ok) return data.result
    }
    else {
    text = await getReply(message.text)
  }
  console.log(text);
  const { data } = await axios.get(`${process.env.BASE_URL}${process.env.BOT_TOKEN}/sendMessage?chat_id=${message.chat.id}&text=${encodeURIComponent(text)}`);
  if (data.ok) return data.result
}

const getReply = async (message) => {
  switch (message) {
    case '/start':
      return 'Привет! Я пожелаю тебе спокойной ночи по команде /night';
    case '/help':
      return 'Попробуй команду /night';
    case '/settime':
      return 'Эта фича в разработке...';
    case '/night': {
      const word = await getRandomWord();
      return `Спокойной ночи, солнце ❤️, ${word} снов`;
    }
    default:
      return 'Я мог бы с тобой поговорить, но не хочу';
  }
}

app.use(bodyParser.json());
app.post('/bot', async (req, res) => {
  console.log(req.body.message.from.first_name, req.body.message.from.last_name, req.body.message.text);
  await sendMessage(req.body.message)
  res.send()
})

app.listen(process.env.PORT, () => console.log(`My server is running on port ${process.env.PORT}`))
