# bamazon

Bamazon is an Amazon-like storefront with MySQL and Node. This app will allow customers to make purchases and deplete stock from the store's inventory.

## REQUIREMENTS

#### 1. Installation
After cloning this repository, in your Bash terminal, enter:
```
npm install
```
This should install the three packages required for this node,
1. cli-table - for cleanier view on terminal
2. inquirer - for prompting questions for user
3. mysql - for accessing database

#### 2. File Changes
In the `bamazonCustomer.js`, `bamazonManager.js`, and `bamazonSupervisor.js` you will need to change `line 7` the `var sqlPW = [insert your mySql password];`.

#### 3. Add Database

In your mySql terminal add the information in the file `bamazon_db.sql`.

## HOW TO USE
1. 