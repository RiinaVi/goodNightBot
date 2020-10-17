const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/.env' });

const { reply } = require("./src/utils/replies");

const app = express();

app.use(bodyParser.json());

app.post('/bot', async (req, res) => {
  const { message } = req.body;
  console.log(message.from.first_name, message.from.last_name, message.text);
  await reply(message);
  res.send();
})

app.listen(process.env.PORT, () => console.log(`My server is running on port ${process.env.PORT}`))
