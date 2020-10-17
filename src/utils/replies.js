const { sendPhoto, sendTextMessage, sendDice, getRandomWord } = require("../api/requests");

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

const reply = async (message) => {
  let text, res;
  if (message.sticker || message.video) {
    text = 'Супер 👍'
  } else if (message.dice) {
    res = await sendDice(message.chat.id);
  } else if (message.photo) {
    res = await sendPhoto(message.chat.id);
  } else {
    text = await getReply(message.text);
    console.log('line 30', text);
    res = await sendTextMessage(message.chat.id, text);
    console.log('line 32', res);
  }
  console.log('line 34', text, res);
  return res;
}

module.exports = { reply };
