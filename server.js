// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const Database = require('sqlite-async');
const app = express();

const dbname = 'mixxxdb.sqlite';
const platform = process.platform;
const os = require('os');

// Get our API routes
const api = require('./srv/routes/api');

let db;

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/dist'));

const dblocations = [
  {
    os: 'linux',
    location: path.join(os.homedir(), '.mixxx'),
  },
  {
    os: 'win32',
    location: '%USERPROFILE%\\Local Settings\\Application Data\\Mixxx',
  },
  {
    os: 'darwin',
    location: path.join(os.homedir(), 'Library/Application Support/Mixxx'),
  },
];

console.log(platform);
const dbpath = dblocations.find(loc => {
  return loc.os === platform;
}).location;

app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

Database.open(path.join(dbpath, dbname))
  .then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Mixxx Wizard running on localhost: ${port}`));
  })
  .catch(err => {
    console.error(err.stack);
  });
