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
	connection.query("SELECT * FROM products", function(err, productsForSale){
		for(var i = 0; i < productsForSale.length; i++){
			var product = productsForSale[i];
			console.log(`ID: ${product.item_id} Price: $${product.price} Name: ${product.product_name}`);
		}
		inquirer.prompt([
			{
				type: "input",
				name: "buy",
				message: "Enter the item_id you would like to purchase: "
			},
			{
				type: "input",
				name: "quantity",
				message: "How many would you like to buy?"
			}
		]).then(function(data){
			if(productsForSale.quantity < data.quantity){
				console.log("Insufficient quantity!");
			}
		});
	});
}