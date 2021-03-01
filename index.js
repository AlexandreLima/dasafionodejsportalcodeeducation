'use strict';

const { error } = require('console');
const express = require('express');
const app = express()
const PORT = 3000;
const HOST = '0.0.0.0';

const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : 'mysql',
    user     : 'root',
    password : 'rootpassword',
    database: 'nodejsdesafio'
  });

connection.connect();

executeQuery("DROP TABLE people;")
executeQuery('CREATE TABLE people(name VARCHAR(20) CHARACTER SET utf8);')
executeQuery("INSERT INTO people(name) values ('Alexandre');")

app.get('/', (req, res) => {

    connection.query('SELECT * FROM people', (error, results) => {
        res.send('<h1>Full Cycle Rocks! </h1> <br>' + results[0].name);
    });
    
});

 function executeQuery(sql) {
    connection.query(sql, function (error, results, fields) {
        console.log(sql);
        if (error) throw error;
      });
}


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);