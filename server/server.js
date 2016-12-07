const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const logger     = require('morgan');

const app = express();
const port = 3000;

const audioStream = require('./lib/audio-stream.js');

app.use(logger('dev'));

app.get('/', audioStream.checkFile, audioStream.getMimeType, audioStream.startStream);

app.listen(port, () => console.warn(`Server listening on port 3000!`));
