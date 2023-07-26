const express = require('express');
const mongoose = require('mongoose');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const { routes } = require('./routes');
const errorsHandler = require('./middlewares/errorshandler');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(routes);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
