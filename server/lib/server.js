const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const logger     = require('morgan');

const startServer = (devConsole) => {
  const app = express();
  const port = 3000;

  const stream = require('./stream.js');

  cons = devConsole ? devConsole : console;

  app.use(logger('dev'));
  // app.use(express.static(path.resolve(__dirname, '../dist/')));

  app.get('/', stream.checkFile, stream.setMimeType, stream.startStream);

  app.listen(port, () => cons.log(`Server listening on port 3000!`));
}

module.exports = {
  startServer,
}
