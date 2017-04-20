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
  product_sales INT(30) DEFAULT 0
  PRIMARY KEY (item_id)
);
-- Inserting Mock Data
INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('1', 'Television', 'Electronics', '500', '40');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('2', 'Banana', 'Produce', '5', '600');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('3', 'Console', 'Electronics', '300', '50');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('4', 'Apple', 'Produce', '5', '700');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('5', 'Pants', 'Clothing', '20', '800');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('6', 'Couch', 'Home', '300', '30');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('7', 'Shirt', 'Clothing', '15', '600');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('8', 'Refrigerator', 'Home', '700', '20');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('9', 'Potato', 'Produce', '5', '800');

INSERT INTO `bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ('10', 'Desk', 'Home', '150', '100');
