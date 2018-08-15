var inquirer = require("inquirer");
var mysql = require("mysql");

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
			message: "Select an action to execute:",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
		}
	]).then(function(data){
		switch(data){
			case "View Products for Sale":
				viewSales();
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addToInventory();
				break;
			case "Add New Product":
				addNewProduct();
				break;
			case "Exit":
				closeConnection();
				break;
			default:
				console.log("You did not select an action");
				runBamazonMenu();
				break;
		}
	});
}

function viewSales(){
	
}

function viewLowInventory(){

}

function addToInventory(){

}

function addNewProduct(){

}

function closeConnection(){
	connection.end();
}