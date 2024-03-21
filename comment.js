//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'comment'
});
connection.connect();
//Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//Create a table
var createTable = 'create table if not exists comment (id int primary key auto_increment, name varchar(100), email varchar(100), comment text, date timestamp)';
connection.query(createTable, function (err, result) {
    if (err) {
        console.log('Table creation failed');
    } else {
        console.log('Table creation succeeded');
    }
});
//Create a route
app.get('/', function (req, res) {
    var selectData = 'select * from comment order by id desc';
    connection.query(selectData, function (err, result) {
        if (err) {
            console.log('Query failed');
        } else {
            res.render('index', {
                result: result
            });
        }
    });
});
app.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;
    var insertData = 'insert into comment (name, email, comment, date) values (?, ?, ?, now())';
    connection.query(insertData, [name, email, comment], function (err, result) {
        if (err) {
            console.log('Insert failed');
        } else {
            console.log('Insert succeeded');
            res.redirect('/');
        }
    });
});
app.listen(3000);
