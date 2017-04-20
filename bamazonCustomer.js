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
                            var department = res[0].department_name
                            console.log(department)
                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: res[0].stock_quantity - results.quantity,
                                    product_sales: res[0].product_sales + total
                                },
                                {
                                    item_id: results.choice
                                }
                            ],
                                function (err, res) {
                                if (err) {
                                    throw err
                                }
                                console.log("Congratulations on your purchase?" + "\nYour total was: $" + total)
                                totalSales(department)
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
                            connection.query("SELECT * FROM products", function (err, results) {
                                if (err) {
                                    throw error
                                }
                                console.log(results)
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
                                        message: "Which ID would you like to add more inventory off?"
                                    },
                                    {
                                        type: "input",
                                        name: "quantity",
                                        message: "How much would you like to add?"
                                    }
                                ])
                                    .then(function (results) {
                                        connection.query("SELECT * from products WHERE ?", {
                                            item_id: results.choice
                                        }, function (err, res) {
                                            if (err) {
                                                throw err;
                                                console.log("There is no such ID")
                                            }
                                            console.log(res[0].stock_quantity)
                                            console.log(results.quantity)
                                            connection.query("UPDATE products SET ? WHERE ?", [
                                                    {
                                                        stock_quantity: res[0].stock_quantity + parseInt(results.quantity)
                                                    },
                                                    {
                                                        item_id: results.choice
                                                    }
                                                ],
                                                function (err, res) {
                                                    if (err) {
                                                        throw err
                                                    }
                                                    console.log("Quantity has been added")
                                                    start()
                                                })
                                        })
                                    })
                            })
                        }
                        else if (answer.function === "Add New Product") {
                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "name",
                                    message: "What is the name of the product?"
                                },
                                {
                                    type: "input",
                                    name: "department",
                                    message: "What department would you like it to be in?"
                                },
                                {
                                    type: "input",
                                    name: "price",
                                    message: "What price would you like to set it up at?"
                                },
                                {
                                    type: "input",
                                    name: "quantity",
                                    message: "What would be your stock quantity?"
                                }
                            ])
                                .then(function (results) {
                                    connection.query("INSERT INTO products SET ?",[
                                        {
                                            product_name: results.name,
                                            stock_quantity: results.quantity,
                                            department_name: results.department,
                                            price: results.price
                                        }
                                    ], function (err, data) {
                                        if (err)
                                            throw err
                                        else {
                                            console.log("item has been added")
                                        }
                                    })
                                })
                        }
                    })
            }
            else {
                console.log("Sorry wrong password")
            }
        })
}
function supervisorOperation() {
    inquirer.prompt([
        {
            type: "input",
            name: "password",
            message: "Please input your password"
        }
    ])
        .then(function (results) {
            if (results.password === "0000") {
                console.log("Welcome")
                inquirer.prompt([
                    {
                        type: "list",
                        name: "option",
                        message: "What would you like to do?",
                        choices:[
                            {
                                name: "View Product Sales by Department"
                            },
                            {
                                name: "Create New Department"
                            }
                        ]
                    }
                ]).then(function (results) {
                    if (results.option === "View Product Sales by Department") {

                    }
                    else if (results.option === "Create New Department") {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the name of the new department?"
                            },
                            {
                                type: "input",
                                name: "cost",
                                message: "What is the cost for this new department?"
                            }
                        ])
                            .then(function (results) {
                                connection.query("INSERT INTO departments SET ?",[
                                    {
                                        department_name: results.name,
                                        over_head_costs: results.cost
                                    }
                                ],
                                    function (err, res) {
                                        if (err)
                                            throw err
                                        console.log("New department has been added")
                                    }

                                )
                            })
                    }
                })
            }
            else {
                console.log("Wrong Password")
            }
        })
}
function totalSales(department) {
    var total = 0
    connection.query("SELECT * from products WHERE ?", {
        department_name: department
    }, function (err, res) {
        if (err)
            throw err
        for (var i = 0; i < res.length; i++) {
            total += res[i].product_sales
        }
        connection.query("UPDATE departments SET ? WHERE ?",[
            {
                total_sales: total
            },
            {
                department_name: department
            }
    ],
        function (err, res) {
            if (err)
                throw err
        })
    })
}
start()