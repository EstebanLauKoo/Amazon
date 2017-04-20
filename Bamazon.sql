-- Creates database
CREATE DATABASE Bamazon;
-- use database
USE Bamazon;
-- Creates table products
CREATE TABLE products(
  item_id INT(1) AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price INT(30) NOT NULL,
  stock_quantity INT(30) NOT NULL,
  product_sales INT(30)
  PRIMARY KEY (item_id)
);
-- Inserting Mock Data
INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('1', 'Turtle', 'animal', '2', '40');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('2', 'Giraffe', 'animal', '40', '20');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('3', 'Fiesta', 'car', '3', '50');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('4', 'WRX', 'car', '30', '60');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('5', 'Sonata', 'car', '20', '70');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('6', 'Blue', 'color', '30', '70');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('7', 'Yellow', 'color', '20', '55');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('8', 'Green', 'color', '10', '70');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('9', 'Horse', 'animal', '20', '80');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('10', 'Jetta', 'car', '20', '11');
