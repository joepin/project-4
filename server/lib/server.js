const express    = require('express');
const path       = require('path');
const fs         = require('fs-extra');
const logger     = require('morgan');

let runningServer = null;

function buildFileList(filesPath) {
  const pathsArray = fs.walkSync(filesPath);
  let fileHTML = [];
  const exts = /^.*\.(mp3|MP3|wav|WAV|mp4|MP4|mov|MOV|mpg|MPG|mpeg|MPEG|avi|AVI)$/;
  const relativePaths = pathsArray.filter((fPath) => exts.test(fPath)).map((fPath) => fPath.substr(filesPath.length));
  const pathsAsJSON = relativePaths.map((relPath, i) => {
    const name = path.basename(relPath, path.extname(relPath))
    return {
      name: name,
      extension: path.extname(relPath),
      path: relPath,
    }
  });
  return pathsAsJSON;
}

function run(devConsole, serverPort, filesPath) {
  const cons = devConsole ? devConsole : console;
  if (!fs.existsSync(filesPath)) {
    return cons.error('Error: invalid file path');
  }

  const pathsAsJSON = buildFileList(filesPath);

  const app = express();
  const port = serverPort;

  const stream = require('./stream.js');


  // app.use(logger('dev'));
  app.use(express.static(path.resolve(filesPath)));

  app.get('/files', (req, res) => res.json(pathsAsJSON));
  app.get('/stream', stream.checkFile, stream.setMimeType, stream.startStream);

  runningServer = (app.listen(port, () => cons.log(`Server listening on port ${port}!`)));
  cons.log(`Serving files from ${filesPath}`)
}

function kill() {
  if (runningServer) runningServer.close();
  runningServer = null;
}

module.exports = {
  run,
  kill,
}
