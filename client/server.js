require('dotenv').config({ silent: true });
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const history      = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || process.argv[2] || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1/users', require('./routes/users.js'));

app.use(history({ logger: logger }));
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.warn(`Server listening on port ${port}!`));
