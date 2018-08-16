var inquirer = require("inquirer");
var mysql = require("mysql");

var Table = require('cli-table');
var table = new Table({ chars: {'mid': '-', 'left-mid': '-', 'mid-mid': '-', 'right-mid': '-'} });

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
      //displays products for sale
      table.push(["Item ID", "Product Name", "Price"]);
		for(var i = 0; i < inventory.length; i++){
			var product = inventory[i];

         table.push([product.item_id, product.product_name, "$" + product.price]);
		}

      console.log(table.toString());
		console.log("Welcome to Bamazon where everything we sell is legal.");

      //ask user what they would like to purchase and how much they would like to buy
		inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "Please, enter the item ID you would like to purchase: "
			},
			{
				type: "input",
				name: "quantity",
				message: "How many would you like to buy?"
			}
		]).then(function(data){
			var hasItem; //to track position of the inventory list
			var total;
			var currentQuantity;
			var i; //current position of the inventory
			var totalSales;

			for(i = 0; i < inventory.length; i++){
				if(data.id == inventory[i].item_id){
					//checks stock of item
					if(parseInt(data.quantity) > parseInt(inventory[i].stock_quantity)){
   						console.log("Your order has been cancelled due to insufficient stock. Please check in another time.");
                     hasItem = true;
   						connection.end();
   					}else {
   						total = parseFloat(parseInt(data.quantity) * parseFloat(inventory[i].price)).toFixed(2);
   						currentQuantity = parseInt(inventory[i].stock_quantity) - parseInt(data.quantity);
   						hasItem = true;
                     totalSales = parseInt(data.quantity) + parseInt(inventory[i].product_sales);
                     
   						break; //ends the loop
   					}
				} else{
					hasItem = false;
				}
			}

			//checks to see if item is available
			if(hasItem){

				//updates the quantity left in inventory
				connection.query("UPDATE products SET stock_quantity = " + currentQuantity + ",product_sales = " + totalSales + " WHERE item_id = " + data.id, function(err){
					if(!err){
						//updates product_sales column that shows how many times the item has been purchased
						console.log("\nYou have purchased " + data.quantity + " of " + inventory[i].product_name + ".Your total comes to $" + total + ". Thank you for your purchase!");
                  connection.end();
					}
				});
			} else{
				console.log("Unfortunately we do not carry the item you are looking for. Thank you for shopping at the very legal Bamazon and have a nice day!");
				connection.end();
			}
		});
	});
}