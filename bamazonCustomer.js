/**
 * Created by esteb on 4/18/2017.
 */
var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "4801",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

var start = function () {
    inquirer.prompt
}