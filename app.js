const express = require('express');
const mongoose = require('mongoose');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64b0426627cdb61f1e83e6c1',
  };

  next();
});

app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
