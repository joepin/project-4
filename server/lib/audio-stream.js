/*

  This file will contain express middleware functions for creating an audio stream.

*/

const path = require('path');
const fs   = require('fs');
const mime = require('mime');

function checkFile(req, res, next) {
  const filePath = req.query.path;
  if (!filePath) next(new Error('Please specify a file path.'));
  const fullPath = path.resolve(__dirname, `../${filePath}`);
  res.fullPath = fullPath;
  fs.existsSync(filePath) ? next() : next(new Error('File does not exist.'));
}

function getMimeType(req, res, next) {
  const extension = path.extname(res.fullPath);
  const regEx = /^.*\.(mp3|MP3|wav|WAV)$/;
  if (!regEx.test(extension)) next(new Error('Invalid file type requested.'));
  const mimeType = mime.lookup(res.fullPath);
  res.set({'Content-Type': mimeType});
  next();
}

function startStream(req, res, next) {
  const stream = fs.createReadStream(res.fullPath);
  stream.on('open', () => stream.pipe(res));
  stream.on('error', (err) => next(err));
}

module.exports = {
  checkFile,
  getMimeType,
  startStream,
}
