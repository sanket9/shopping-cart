
var express = require('express');
var bcrypt = require('bcrypt');
const user = express.Router();


const Users = require('../model/user');

user.get('/', function(req, res){
    res.send('Hi from User');
});
user.post('/useradd', function(req, res){
    Users.find({email: req.body.email}, (err, data)=>{
        // console.log(data);
        
        if(data == ""){
            bcrypt.hash(req.body.password, 12, function (err, hash) {
                let hashPass = hash;
        
                let newUser = new Users({
                    email: req.body.email,
                    password: hash
                });
                newUser.save((err, succ) => {
                    if (!err) {
                        res.json({
                            'status': 1,
                            'message': 'data added',
                            'user': succ
                        })
                    } else {
                        res.send(err);
                    }
                })
            });
        }else{
            res.json({
                'status': 0,
                'message': "User Already Exists."
            })

        }
    })
    
});
user.post("/login", function(req, res) {
    Users.findOne({ email: req.body.email }, function (err, succ) {
    		// console.log(err);
            if (succ) {
                bcrypt
                    .compare(req.body.password, succ['password'])
                  .then(
                    function(resp) {
                      if (resp == true) {
                        res.json({
                          status: 0,
                          message: "Logged In",
                          user: succ
                        });
                      } else {
                        res.json({
                          status: 1,
                          message: "Email Or Password is Wrong"
                        });
                      }
                    },
                    err => {
                      console.log(err);
                    }
                  );
            }else if (err == null) {
                res.json({
                  status: 1,
                  message: "Email Or Password is Wrong"
                });
            }
        })
});
user.post('/profile', (req, res) => {
    const { user_id } = req.body;
    Users.findById(user_id, (err, data) => {
        if (err) throw err;
        res.json({
            status : res.statusCode,
            data
        })
    })
});

module.exports = user;