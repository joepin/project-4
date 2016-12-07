const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const logger     = require('morgan');

const app = express();
const port = 3000;

app.use(logger('dev'));

app.get('/', (req, res) => res.json('Welcome to server/server.js!'));

app.listen(port, () => console.warn(`Server listening on port 3000!`));
