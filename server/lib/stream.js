/*

  This file will contain express middleware functions for creating a media stream.

*/

const path = require('path');
const fs   = require('fs');
const mime = require('mime');

let FILE_PATH = '';

function setFilePath(fp) {
  FILE_PATH = fp;
}

function checkFile(req, res, next) {
  const filePath = decodeURIComponent(req.query.path);
  console.log('filePath', filePath)
  if (!filePath) next(new Error('Please specify a file path.'));
  const fullPath = path.resolve(FILE_PATH, `${filePath}`);
  const final = fullPath.replace(/^[ \r\n\t]+|[ \r\n\t]+$/, '');
  console.log('final path:', final);
  res.fullPath = final;
  fs.existsSync(final) ? next() : next(new Error('File does not exist.'));
}

function checkFileType(path) {
  const audioExts = /^.*\.(mp3|MP3|wav|WAV)$/;
  const videoExts = /^.*\.(mp4|MP4)$/;
  let valid = true;
  let typeText = null;
  if (audioExts.test(path)) {
    typeText = 'audio';
  } else if (videoExts.test(path)) {
    typeText = 'video';
  } else {
    valid = false;
  }
  const retObj = {
    valid: valid,
    type: typeText,
  };
  return retObj;
}

function setMimeType(req, res, next) {
  const fileType = checkFileType(res.fullPath);
  if (!fileType.valid) next(new Error('Invalid file type requested.'));
  const mimeType = mime.lookup(res.fullPath);
  console.log(`path: ${res.fullPath}; mime type: ${mimeType}`)
  res.set({'Content-Type': mimeType});
  res.fileType = fileType.type;
  next();
}

function startAudioStream(next, output) {
  const stream = fs.createReadStream(output.fullPath);
  stream.on('open', () => stream.pipe(output));
  stream.on('error', (err) => next(err));
}

function startVideoStream(next, output) {
  next();
}

function startStream(req, res, next) {
  startAudioStream(next, res);
  // if (res.fileType == 'audio') startAudioStream(next, res);
  // if (res.fileType == 'video') startVideoStream(res);
}

module.exports = {
  checkFile,
  setMimeType,
  startStream,
  setFilePath,
}
