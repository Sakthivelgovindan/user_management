const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const moment = require('moment');
const md5 = require('md5');

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


app.post('/googleAuth',(req, res) => {
 
    let email = req.body.email;
    let hash = md5(email);
  
    let sql = "SELECT * FROM user_details WHERE email_id = ? LIMIT 1";

    connection.query(sql, [email], function(error, results){
      // There was an issue with the query
      if(error){
        callback(error);
        return;
      }
     
      if(results.length){
        // The username already exists
        console.log(results);
        res.send({'status':200,'user_hash':hash,'email':email});
      }else{
        // The username wasn't found in the database
          let username = req.body.username;
          let timestamp = moment().unix();
          let status = "active";
          let sql = "INSERT INTO user_details (user_hash, email_id , user_name , timestamp ,status) VALUES (?, ? , ? , ? , ?)";

          connection.query(sql,[hash,email,username,timestamp,status],function(error,results){
            if(error){
              callback(error);
              return;
            }
            else{
              console.log(results);
              res.send({'status':200,'user_hash':hash,'email':email});
            }
          })
      }
    });


});


app.post('/register',(req,res) => {

  let username   = req.body.username;
  let email      = req.body.email;
  let password   = req.body.password;
  let api_key    = req.body.api_key;
  let secret_key = req.body.secret_key;
  let timestamp  = moment().unix();
  let status     = 'active';

  let sql = "SELECT MAX(sno) as sno from api_details";

  connection.query(sql,function(error, result){
    if(error){
      callback(error);
      return;
    }
    else{
      let user_id = 'user_'+result[0].sno;

      console.log(user_id);
      console.log(timestamp);
      console.log(status);

      let sql = "INSERT into api_details (user_id,api_key,secret_key,status,timestamp) VALUES (? , ? , ? , ? , ?)";
      console.log(sql);
      
      connection.query(sql,[user_id,api_key,secret_key,status,timestamp],function(error,result){
        if(error){
          callback(error);
          return;
        }
        else{
          console.log(result);
          res.send({'status':'inserted'});
        }
      });
    }
  })

})


  

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));