# bamazon

Bamazon is an Amazon-like storefront with MySQL and Node. This app will allow customers to make purchases and deplete stock from the store's inventory.

### Purpose of this program
This program demonstrates my understanding of nodes, npms, and mySQL.

### Requirements

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

### How To Use
Each javascript files will allow different limited commands that the user can do.

#### 1. bamazonCustomer.js
To run the program, enter `node bamazonCustomer.js` on the Bash terminal.

![Image of bamazonCustomer.js](/images/bamazonCustomer.gif)

#### 2. bamazonManager.js
To run the program, enter `node bamazonManager.js` on the Bash terminal.

![Image of bamazonManager.js](/images/bamazonManager.gif)

#### 3. bamazonSuperviser.js (Work In Progress)
Under construction