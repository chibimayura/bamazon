var inquirer = require("inquirer");
var mysql = require("mysql");

var Table = require('cli-table');
var table;

var sqlPW = "password"; //contains password used to connect to mysql

var connection = mysql.createConnection({
	host: "localhost",

	port: 3306,

	user: "root",

	password: sqlPW,
	database: "bamazon_db"
});

connection.connect(function(err){
	if(err) throw err;
	else{
		console.log("connected as id: " + connection.threadId + "\n");
		runBamazonMenu();
	}
});

function runBamazonMenu(){
	inquirer.prompt([
		{
			type: "list",
			name: "menu",
			message: "Select an action to execute: "
			choices: ["View Product Sales by Department", "Create New Department"]
		}
	]).then(function(data){
		if(data.menu == "View Product Sales by Department"){
			viewSalesByDepartment();
		}else {
			createDepartment();
		}
	});
}

function viewSalesByDepartment(){
	
}

function createDepartment(){
	
}

function createTable(){
	table = new Table({ chars: {'mid': '-', 'left-mid': '-', 'mid-mid': '-', 'right-mid': '-'} });
}