const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const logger     = require('morgan');

let runningServer = null;

function run(devConsole, serverPort, filePath) {
  const cons = devConsole ? devConsole : console;
  if (!fs.existsSync(filePath)) {
    return cons.error('Error: invalid file path');
  }
  const app = express();
  const port = serverPort;

  const stream = require('./stream.js');


  // app.use(logger('dev'));
  app.use(express.static(path.resolve(filePath)));

  app.get('/', stream.checkFile, stream.setMimeType, stream.startStream);

  runningServer = (app.listen(port, () => cons.log(`Server listening on port ${port}!`)));
  cons.log(`Serving files from ${filePath}`)
}

function kill() {
  if (runningServer) runningServer.close();
  runningServer = null;
}

module.exports = {
  run,
  kill,
}
