const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const dns = require('dns');
const { v4: uuidv4 } = require('uuid');
const config = require('config');
const mysql = require('./database/mysql.js');
const table = config.get('table')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(htmlPath);
});

app.post('/input_url', (req, res) => {

  function sql(table,obj){
    this.obj = obj;
    this.table = table;
  }
  sql.prototype.insert = function(){  
    mysql.query(`INSERT INTO ${this.table} set ? ON DUPLICATE KEY UPDATE ?`,[this.obj,this.obj]);
  }

  let inputURL;
  try{
    inputURL = new URL(req.body.url); 
  }catch(error){
    return res.status(400).send({error: 'this URL is invalid'});
  }
  if(req.body.url.length > 200) 
    return res.status(400).send({error: 'this URL is too long'});

  dns.lookup(inputURL.hostname, (err) => {
    if (err) {
      return res.status(400).send({error: 'hostname not found'});
    }
    else{
      let uuid = uuidv4();
      let storeToSQL = new sql(table,{
        url : inputURL.href,
        uuid : uuid
      })
      storeToSQL.insert();
      return res.json({uuidv4: uuid});
    }
  })
});

app.get('/:uuidv4', async (req, res) => {
  const uuidv4 = req.params.uuidv4;
  let query = `select url from ${table} where uuid = "${uuidv4}"`;
  let result = await mysql.query(query);
  let originalURL = result[0].url;
  console.log(originalURL);

  if(!originalURL) return res.status(400).send({error: 'Address not found'});
  else return res.redirect(originalURL);
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Listening on PORT ${server.address().port}`);
});
