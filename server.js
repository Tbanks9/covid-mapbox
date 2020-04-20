const express = require('express');
const cors = require('cors');
const app = express()
/* your regular routes go here */
const path = require('path')
app.use(express.static(path.join(__dirname, 'build')))

app.use(cors());

// var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/ping', function (req, res) {
  return res.send('pong');
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(process.env.PORT || 8080)

