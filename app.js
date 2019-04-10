var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require('body-parser');
var bcrypt = require("bcrypt");
const volleyball = require('volleyball')


var route = require('./api/api');
var app = express();
const Category = require('./model/products');

app.use(cors());
app.use(bodyParser.json());
app.use('/api',route);
app.use(volleyball);

// Running Node Server
const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log('Server On:' + port);
});

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/shopping-cart-react');
mongoose.connection.on('connected', () => {
    console.log('connnected to DB @27017');
})
mongoose.connection.on('error', () => {
    if (error) {
        console.log(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hi from Node');
});

// app.post('/useradd', function(req, res){
//     bcrypt.hash(req.body.password, 12, function (err, hash) {
//             let hashPass = hash;

//             let newUser = new Users({
//                 email: req.body.email,
//                 password: hash
//             });
//             newUser.save((err, succ) => {
//                 if (!err) {
//                     res.json({
//                         'status': 1,
//                         'message': 'data added',
//                         'user': succ
//                     })
//                 } else {
//                     res.send(err);
//                 }
//             })
//         });
// })
// app.post("/login", function(req, res) {
//     Users.findOne({ email: req.body.email }, function (err, succ) {
//     		// console.log(err);
//             if (succ) {
//                 bcrypt
//                     .compare(req.body.password, succ['password'])
//                   .then(
//                     function(resp) {
//                       if (resp == true) {
//                         res.json({
//                           status: 0,
//                           message: "Logged In",
//                           user: succ
//                         });
//                       } else {
//                         res.json({
//                           status: 1,
//                           message: "User Or Password Not Found"
//                         });
//                       }
//                     },
//                     err => {
//                       console.log(err);
//                     }
//                   );
//             }else if (err == null) {
//                 res.json({
//                   status: 1,
//                   message: "User Or Password Not Found"
//                 });
//             }
//         })
// });


app.get('/data', function(req, res) {
    var cat = [
    
        new Category({name: "Everyone Has A Story 2",
            category: mongoose.Types.ObjectId('5bd5c8b275c9785820441fda'),
            desc: "Everyone has a story. But does a story end at with a ‘happily ever after’? Not always, not even very often. The story always goes on. And life always tests you. I am life’s trials. I am fate.",
            image_path: 'https://images-na.ssl-images-amazon.com/images/I/51Utta0SFLL._SX323_BO1,204,203,200_.jpg',
            quantity: '100',
        }),

    ];

    for (let index = 0; index < cat.length; index++) {
        cat[index].save((err,succ) => {
            if(index == cat.length){
                res.send('Saved');
            }
        })        
    }
    
})

