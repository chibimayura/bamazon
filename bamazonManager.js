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

//allows manager to check inventory, add inventory, add new item, or exit program
function runBamazonMenu(){
	inquirer.prompt([
		{
			type: "list",
			name: "menu",
			message: "Select an action to execute:",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
		}
	]).then(function(data){
		switch(data.menu){
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

//allows manager to continue working on the inventory without having to rerun the program if they want to execute another action
function backToMenu(){
	inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Would you like to exit the program?",
			default: false
		}
	]).then(function(data){
		if(!data.confirm){
			runBamazonMenu();
		}else {
			connection.end();
		}
	});
}

function viewSales(){
	connection.query("SELECT * FROM products", function(err, inventory){

		createTable();

		for(var i = 0; i < inventory.length; i++){
			var product = inventory[i];

			table.push([product.item_id, product.product_name, product.department_name, "$" + product.price, product.stock_quantity]);
		}
		
		console.log(table.toString());
		backToMenu();
	});
}

function viewLowInventory(){
	connection.query("SELECT * FROM products", function(err, inventory){
		console.log("Products that should be ordered: ");

		createTable();

		for(var i = 0; i < inventory.length; i++){
			var product = inventory[i];
			if(parseInt(product.stock_quantity) <= 5){
				table.push([product.item_id, product.product_name, product.department_name, "$" + product.price, product.stock_quantity]);
			}
		}

		console.log(table.toString());
		backToMenu();
	});
}

function addToInventory(){
	connection.query("SELECT * FROM products", function(err, inventory){
		inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "Enter the item id you would like to add more quantity to:"
			},
			{
				type: "input",
				name: "quantity",
				message: "How much more would you like to add?"
			}
		]).then(function(data){
			var updatedQuantity;
			var hasItem; //stores inventory position

			if(parseInt(data.quantity).toString() != 'NaN'){
				for(var i = 0; i < inventory.length; i++){
					if(parseInt(data.id) == parseInt(inventory[i].item_id)){
			            hasItem = true;
						updatedQuantity = parseInt(data.quantity) + parseInt(inventory[i].stock_quantity);
						break; //does not allow i to increase one more time to prevent the error when purchasing the last item on the list
					} else{
						hasItem = false;
		            }
				}

		         //if have item on list
		         if(hasItem){
		            connection.query("UPDATE products SET stock_quantity = " + updatedQuantity + " WHERE item_id = " + data.id, function(err){
		               console.log("\n***Your inventory has been updated***\n");
		               backToMenu();
		            });
		         }else {
					console.log("\nYou cannot stock something you don't carry yet. Please select the 'Add New Product' to add that item in.\n");
		            runBamazonMenu();
				}
			} else{
				console.log("\nError! Invalid information. Please reenter your information in the correct format.\n");
				addToInventory();
			}
		});
	});
}

function addNewProduct(){
	connection.query("SELECT * FROM products", function(err, inventory){
		inquirer.prompt([
			{
				type: "input",
				name: "product_name",
				message: "Enter the product name: "
			},
			{
				type: "input",
				name: "department_name",
				message: "Enter the department_name: "
			},
			{
				type: "input",
				name: "price",
				message: "Enter the price(number): "
			},
			{
				type: "input",
				name: "stock_quantity",
				message: "Enter the stock quantity(number): "
			}
		]).then(function(data){
			var hasItem; //checks to see if inventory list has ended
			if(parseFloat(data.price).toString() == 'NaN' || parseInt(data.stock_quantity).toString() == 'NaN')
			{
				console.log("\nError! Invalid information. Please reenter your information in the correct format.\n");
            	addNewProduct();
			}else {
				for(var i = 0; i < inventory.length; i++){
		            //if item exist it will return to the main menu
		            if(parseInt(data.item_id) == parseInt(inventory[i].item_id)){
		               console.log("\nYou already sell that item. If you would like to update the stock quantity please select 'Add To Inventory in the menu'.\n");
		               hasItem = true;
		               runBamazonMenu();
		               break;
		            }else {
		               hasItem = false;
		            }
		        }

	         	//If it doesn't exist it will add the item into the database
	        	if(!hasItem){
	            //Can only add the item if the item_id, price, and stock_quantity are numbers
		            updateDepartmentTable();
	                connection.query("INSERT INTO products SET ?", {
	                  item_id: data.item_id,
	                  product_name: data.product_name,
	                  department_name: data.department_name,
	                  price: data.price,
	                  stock_quantity: data.stock_quantity
	               },
	                function(err, res){
	                  if(err) throw err;
	                  console.log("Product has been added!\n");
	                  hasItem = true;
	                  backToMenu();
	               });
		        }
	        }
		});
	});
}

function closeConnection(){
	connection.end();
}

//creates a new table to display the inventory
function createTable(){
	table = new Table({ chars: {'mid': '-', 'left-mid': '-', 'mid-mid': '-', 'right-mid': '-'} });
	table.push(["Item ID", "Product Name", "Department Name", "Price", "Quantity"]);
}

function updateDepartmentTable(){
	connection.query(
		"SELECT departments.department_name AS department_name, departments.department_id AS department_id, products.department_id AS products_department_id, products.department_name AS products_department_name FROM departments RIGHT JOIN products ON products.department_name = departments.department_name",
		function(err, departments){
			for(var i = 0; i < departments.length; i++){
				var deparmentLoc = departments[i];
				if(deparmentLoc.products_department_id.toString() == "NULL"){
					if(deparmentLoc.department_id.toString() == "NULL" && deparmentLoc.department_name.toString() == "NULL"){
						connection.query(
							"INSERT INTO departments SET department_name = " + deparmentLoc.products_department_name ,
							function(err){
								connection.query("UPDATE products INNER JOIN departments ON (departments.department_name = products.department_name) SET products.department_id = departments.department_id", function(err){
									if(err) throw err;
								});
						});
					}else {
						connection.query("UPDATE products INNER JOIN departments ON (departments.department_name = products.department_name) SET products.department_id = departments.department_id", function(err){
							if(err) throw err;
						});
					}
				}
			}
	});
}