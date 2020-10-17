const { sendPhoto, sendTextMessage, sendDice, getRandomWord } = require("./api/requests");

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
    return await sendDice(message.chat.id);
  } else if (message.photo) {
    return await sendPhoto(message.chat.id);
  } else {
    text = await getReply(message.text)
  }
  console.log(text);
  await sendTextMessage(message.chat.id, text);
}

const getDeclension = (word) => {
  if ((word.charAt(word.length - 2) === 'о') &&
      ((word.charAt(word.length - 3) === "ш") ||
          (word.charAt(word.length - 3) === "ж"))) {
    return word.slice(0, -2) + 'их';
  } else if (word.charAt(word.length - 2) === 'о') {
    return word.slice(0, -2) + 'ых';
  }
  return word.slice(0, -1) + 'х';
}


module.exports = { reply, getDeclension };
