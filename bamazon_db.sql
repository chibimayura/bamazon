DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	item_id INT NOT NULL,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
	(01, "Bananas", "Food", 0.69, 1000000),
	(02, "Panasonic Lumix DC-GH5", "Camera", 2397.99, 10),
	(03, "Phone Charger compatiable with android and iphone", "Cellphone accessories", 20.99, 50),
	(04, "All My Friends Are Dead", "Books", 8.96, 1250),
	(05, "Universal Organic Vegan Gluten-Free BPA-Free Cruelty-Free Manual Toothbrush", "Oral Hygiene", 20.99, 3000),
	(06, "Liver", "Organ", 557100.00, 6),
	(07, "Life-sized Magikarp", "Toys", 800.99, 20),
	(08, "Mansion-sized Mattress", "Furniture", 5561.89, 15),
	(09, "Perfect Blue", "Movies", 12.99, 10000),
	(10, "Bionic Right Leg", "Robotics", 70000.99, 39);