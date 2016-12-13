const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || process.argv[2] || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.warn(`Server listening on port ${port}!`));
