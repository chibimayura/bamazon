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
	connection.query("SELECT * FROM products", function(err, inventory){
		for(var i = 0; i < inventory.length; i++){
			var product = inventory[i];
			console.log(`ID: ${product.item_id} Price: $${product.price} Name: ${product.product_name}`);
		}
		console.log("Welcome to Bamazon where everything we sell is legal.");
		inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "Please, enter the item_id you would like to purchase: "
			},
			{
				type: "input",
				name: "quantity",
				message: "How many would you like to buy?"
			}
		]).then(function(data){
         if(data.id < inventory.length){
   			for(var i = 0; i < inventory.length; i++){
   				if(data.id == inventory[i].item_id){
   					if(data.quantity > inventory[i].stock_quantity){
   						console.log("Your order has been cancelled due to insufficient stock. Please check in another time.");
   						connection.end();
   					}else {
   						var total = parseFloat(data.quantity * inventory[i].price).toFixed(2);
   						var currentQuantity = inventory[i].stock_quantity - data.quantity;

   						connection.query("UPDATE products SET stock_quantity = " + currentQuantity + " WHERE item_id = " + data.id);

   						console.log("You have purchased " + data.quantity + " of " + inventory[i].product_name + ".Your total comes to $" + total + ". Thank you for your purchase!");
   						connection.end();
   					}
   				}
   			}
         } else {
            console.log("\nUnfortunately we do not carry the item you are looking for. Thank you for chooseing the very legal Bamazon and have a nice day!");
            connection.end();
         }
		});
	});
}