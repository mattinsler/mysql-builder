var mysql = require('mysql');
var builder = require('./')(mysql);

var connection = builder('mysql://read-write:8fdc21e776def2471015f6fcfc0663c942c7b18e593a4b955d30a208c837c32a@tasks-qa.c2sxvolg7qdt.us-west-1.rds.amazonaws.com:3306/tasks');

connection.query('SELECT count(1) FROM tasks', console.log);
