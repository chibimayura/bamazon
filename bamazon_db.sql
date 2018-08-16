DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(255) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES
	("Food", 20),
	("Camera", 1000),
	("Electronics", 10),
	("Books", 4),
	("Oral Hygiene", 10),
	("Organ", 10000),
	("Toys", 400),
	("Furniture", 2000),
	("Movies", 6);

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	department_id INT,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	product_sales INT(10) NOT NULL DEFAULT 0,
	PRIMARY KEY(item_id),
	FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("Bananas", "Food", 0.69, 1000000),
	("Panasonic Lumix DC-GH5", "Camera", 2397.99, 10),
	("Phone Charger compatiable with android and iphone", "Electronics", 20.99, 50),
	("All My Friends Are Dead", "Books", 8.96, 1250),
	("Universal Organic Vegan Gluten-Free BPA-Free Cruelty-Free Manual Toothbrush", "Oral Hygiene", 20.99, 3000),
	("Liver", "Organ", 557100.00, 5),
	("Life-sized Magikarp", "Toys", 800.99, 20),
	("Mansion-sized Mattress", "Furniture", 5561.89, 15),
	("Perfect Blue", "Movies", 12.99, 10000),
	("Bionic Right Leg", "Electronics", 70000.99, 39);

UPDATE products 
INNER JOIN departments 
ON (departments.department_name = products.department_name) 
SET products.department_id = departments.department_id;