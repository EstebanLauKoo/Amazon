/**
 * Created by esteb on 4/18/2017.
 */
var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "4801",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

var start = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "user",
            message: "What type of user are you?",
            choices: [
                {
                    name: "Customer"
                },
                {
                    name: "Manager"
                },
                {
                    name: "Supervisor"
                },
                {
                    name: "Exit"
                }
                ]
        }
    ])
        .then(function (dataUser) {
            if (dataUser.user === 'Customer') {
                customerOperation()
            }
            else if (dataUser.user === "Manager") {
                managerOperation()
            }
            else if (dataUser.user === "Supervisor") {
                supervisorOperation()
            }
            else if (dataUser.user === 'Exit') {
                console.log("See You Later!")
            }
        })
}
function customerOperation() {
    connection.query("SELECT * FROM products", function (err, results) {
            console.log("These are the available items")
            for (var i = 0; i < results.length; i++) {
                console.log("ID: " + results[i].item_id +
                    " Name: " + results[i].product_name +
                    " Price: " + results[i].price +
                    " Quantity: " + results[i].stock_quantity
                )
            }
            inquirer.prompt([
                {
                    type: "input",
                    name: "choice",
                    message: "Which ID would you like to bid on?"
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to purchase?"
                }
            ])
                .then(function (results) {
                    connection.query("SELECT * from products WHERE ?", {
                        item_id: results.choice
                    }, function (err, res) {
                        var total = res[0].price * results.quantity
                        if (err) {
                            throw err;
                            console.log("There is no such ID")
                        }
                        if (res[0].stock_quantity - results.quantity < 0) {
                            console.log("There is not enough in stock")
                        }
                        else {
                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: res[0].stock_quantity - results.quantity
                                },
                                {
                                    item_id: results.choice
                                }
                            ],
                                function (err, res) {
                                if (err) {
                                    throw err
                                }
                                    console.log("Congratulations on your purchase!")
                                    console.log("Your total was: $" + total)
                                    start()
                                }
                            )
                        }
                    })
                })
    })
}
function managerOperation() {
    inquirer.prompt([
        {
            type: "input",
            name: "password",
            message: "Please input your password"
        },
    ])
        .then(function (authentication) {
            if (authentication.password === "0000") {
                console.log("Welcome")
                inquirer.prompt([
                    {
                        type: "list",
                        name: "function",
                        message: "What would you like to do",
                        choices: [
                            {
                                name: "View Products for Sale"
                            },
                            {
                                name: "View Low Inventory"
                            },
                            {
                                name: "Add to Inventory"
                            },
                            {
                                name: "Add New Product"
                            }
                        ]
                    }
                ])
                    .then(function (answer) {
                        if (answer.function === "View Products for Sale") {
                            connection.query("SELECT * FROM products", function (err, results) {
                                console.log("These are the available items in inventory")
                                for (var i = 0; i < results.length; i++) {
                                    console.log("ID: " + results[i].item_id +
                                        " Name: " + results[i].product_name +
                                        " Price: " + results[i].price +
                                        " Quantity: " + results[i].stock_quantity
                                    )
                                }
                        })
                            setTimeout(managerOperation, 4000)
                    }
                        else if (answer.function === "View Low Inventory") {
                            connection.query("SELECT * FROM products WHERE `stock_quantity` < '5'",
                                function (err, results) {
                                console.log("These are the available items in inventory")
                                for (var i = 0; i < results.length; i++) {
                                    console.log("ID: " + results[i].item_id +
                                        " Name: " + results[i].product_name +
                                        " Price: " + results[i].price +
                                        " Quantity: " + results[i].stock_quantity
                                    )
                                }
                            })
                        }
                        else if (answer.function === "Add to Inventory") {

                        }
                        else if (answer.function === "Add New Product") {

                        }
                })
            }
            else {
                console.log("Sorry wrong password")
            }
        })
}
start()