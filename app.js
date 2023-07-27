const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { errors } = require('celebrate');
const { routes } = require('./routes');
const errorsHandler = require('./middlewares/errorshandler');

const app = express();
app.use(helmet());
app.use(express.json());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use(routes);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
