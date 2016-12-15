if (process.env.NODE_ENV === 'development') require('dotenv').config({ silent: true });
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const history      = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || process.argv[2] || 3000;

// logger for development
app.use(logger('dev'));
// parse the body as JSON
app.use(bodyParser.json());

// allow CORS on the entire site
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token_Authorization");
  next();
});

// build API routes
app.use('/api/v1/users', require('./routes/users.js'));
app.use('/api/v1/servers', require('./routes/servers.js'));

// history middleware to allow react router to work as expected
app.use(history({ logger: logger }));
// serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// good to go... let's do this!
app.listen(port, () => console.warn(`Server listening on port ${port}!`));
