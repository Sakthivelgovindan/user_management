const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const moment = require('moment');

const app = express();

app.use(bodyParser.json());
app.use(cors());


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bot_management'
});

connection.connect(function(error){
  if(!error){
    console.log("Connected");
  }
  else{
    console.log('Error');
  }
})

app.get('/', (req, res) => {
  
  connection.query("SELECT  * FROM user_details",function(error,rows,fields){
    if(!!error){
      console.log('Successfully executed.');
      console.log(rows);
    }
    else{
      console.log("Error in query",error);
    }

  })
  res.send('Hello World');

});

app.post('/login', (req, res) => {

    var username = req.body.name;
    var email = req.body.email;
    var status   = "active";

    var sql = "SELECT  * FROM user_details WHERE email_id = ? and user_hash = ? and status = ?";

    connection.query(sql,[ username, email, status],function(error,rows,fields){
      if(!error){
        console.log(rows);
        console.log('Successfully executed.');
        res.send(rows);
      }
      else{
        console.log("Error in query",error);
      }
      
    });

});

app.post('/register', (req , res) =>{
  console.log("comes");

  var username   = req.body.username;
  var email      = req.body.email;
  var password   = req.body.password;
  var api_key    = req.body.api_key;
  var secret_key = req.body.secret_key;
  var status     = "active";
  var timestamp  = moment().unix();

  console.log(req.body);
  
  var sql = "SELECT MAX(sno) FROM user_details ";

  connection.query(sql,function(error,rows){
    if(!error){
      console.log('Successfully executed.');
      res.send(rows);
      console.log(rows[0]);
      console.log(rows[0].MAX(sno));

      //  var sql = "INSERT INTO `form`(`user_id`,`api_key`, `secret_key`,`status`,`timestamp`) VALUES (?,?,?,?,?)";

      //     connection.query(sql,[ rows[0], api_key, secret_key, status],function(error,rows,fields){
      //       if(!error){
      //         console.log('Successfully executed.');
      //         res.send(rows);
      //       }
      //       else{
      //         console.log("Error in query",error);
      //       }
            
      //     });

    }
    else{
      console.log("Error in query",error);
    }
  });
    

 

});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));