const express    = require('express');
const path       = require('path');
const fs         = require('fs-extra');
const logger     = require('morgan');
const ngrok      = require('ngrok');
const fetch      = require('node-fetch');

let runningServer = null;
let ngrokURL = null;

function buildFileList(filesPath) {
  const pathsArray = fs.walkSync(filesPath);
  let fileHTML = [];
  const exts = /^.*\.(mp3|MP3|wav|WAV|mp4|MP4|mov|MOV|mpg|MPG|mpeg|MPEG|avi|AVI)$/;
  const relativePaths = pathsArray.filter((fPath) => exts.test(fPath)).map((fPath) => fPath.substr((filesPath.length - path.basename(fPath, path.extname(fPath)).length)));
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

function publishServerToAPI(err, url, uuid, next) {
  if (err) return console.log(err);
  console.log('in function', url);
  ngrokURL = url;
  fetch(`http://localhost:3000/api/v1/servers/start?uuid=${uuid}&url=${url}`)
  .then(() => next())
  .catch(err => console.log(err));
}

function startServer(cons, serverPort, filesPath) {
  const pathsAsJSON = buildFileList(filesPath);

  const app = express();
  const port = serverPort;

  const stream = require('./stream.js');

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // app.use(logger('dev'));
  app.use(express.static(path.resolve(filesPath)));

  app.get('/files', (req, res) => res.json(pathsAsJSON));
  app.get('/stream', stream.checkFile, stream.setMimeType, stream.startStream);

  runningServer = (app.listen(port, () => cons.log(`Server listening on port ${port}!`)));
  cons.log(`Serving files from ${filesPath}`)
}

function run(devConsole, serverPort, filesPath, uuid) {
  const cons = devConsole ? devConsole : console;
  if (!isValidPath(filesPath)) {
    return cons.error('Error: invalid file path');
  }
  const next = () => startServer(cons, serverPort, filesPath);

  ngrok.connect(serverPort, (err, url) => {
    publishServerToAPI(err, url, uuid, next);
  });
}

function kill(uuid) {
  if (runningServer) runningServer.close();
  ngrok.disconnect(ngrokURL);
  ngrokURL = null;
  runningServer = null;
  fetch(`http://localhost:3000/api/v1/servers/stop?uuid=${uuid}`)
  .catch(err => console.log(err));
}

function isValidPath(fp) {
  return fs.existsSync(fp);
}

module.exports = {
  run,
  kill,
  isValidPath,
}
