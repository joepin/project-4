const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const logger     = require('morgan');

const app = express();
const port = 3000;

const stream = require('./stream.js');

app.use(logger('dev'));

app.get('/', stream.checkFile, stream.setMimeType, stream.startStream);

app.listen(port, () => console.warn(`Server listening on port 3000!`));
