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
  let text;
  if (message.sticker || message.video) {
    text = 'Супер 👍'
  } else if (message.dice) {
    await sendDice(message.chat.id);
    return;
  } else if (message.photo) {
    await sendPhoto(message.chat.id);
    return;
  } else {
    text = await getReply(message.text);
  }
  await sendTextMessage(message.chat.id, text);
}

module.exports = { reply };
