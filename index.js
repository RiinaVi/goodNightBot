const { Telegraf } = require('telegraf')
const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config({ path: __dirname + '/.env' })
const bot = new Telegraf(process.env.BOT_TOKEN);

const getRandomWord = async () => {

  const xhr = new XMLHttpRequest();


  xhr.open('GET', 'http://free-generator.ru/generator.php?action=word&type=2', false);
  xhr.setRequestHeader("Content-Type: application/json");


  xhr.send();
  xhr.responseType = 'json';

  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
  } else if(xhr.responseText) {
    return (JSON.parse(xhr.responseText).word.word.slice(0, -1) + 'x')
  }
  return 'xороших'
}

bot.start(ctx => ctx.reply('Привет! Я пожелаю тебе спокойной ночи по команде /night'))
bot.help(ctx => ctx.reply('Попробуй команду /night'))
bot.on('photo', ctx => ctx.replyWithPhoto({ source: fs.readFileSync('./cat.jpg') }))
bot.on(['sticker', 'video'], ctx => ctx.reply('Супер 👍'))
bot.hears('Привет', ctx => ctx.reply('Приветики'))
bot.on('dice', ctx => ctx.replyWithDice())
bot.command('night', async (ctx) => {
  const word = await getRandomWord();
  console.log(ctx.message.from.first_name, ctx.message.from.last_name, word);
  await ctx.reply(`Спокойной ночи, солнце ❤️, ${word} снов`);
})
bot.command('settime', ctx =>
    ctx.reply('Отправь мне время в формате чч:мм, в которое ты хочешь получить пожелание спокойной ночи'))
bot.on('message', ctx => {
  console.log(ctx.message);
  ctx.reply('Я мог бы с тобой поговорить, но не хочу')
})
bot.launch()
