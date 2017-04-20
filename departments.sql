-- Creates database
CREATE DATABASE Bamazon;
-- use database
USE Bamazon;
-- Creates table products
CREATE TABLE departments(
  department_id INT(1) AUTO_INCREMENT,
  department_name VARCHAR(40) NOT NULL,
  over_head_costs INT(40) NOT NULL,
  total_sales INT(30) NOT NULL DEFAULT 0,
  PRIMARY KEY (department_id)
);

INSERT INTO `bamazon`.`departments` (`department_id`, `department_name`, `over_head_costs`, `total_sales`)
VALUES ('1', 'Electronics', '7000', '0');

INSERT INTO `bamazon`.`departments` (`department_id`, `department_name`, `over_head_costs`, `total_sales`)
VALUES ('2', 'Clothing', '6000', '0');

INSERT INTO `bamazon`.`departments` (`department_id`, `department_name`, `over_head_costs`, `total_sales`)
VALUES ('3', 'Produce', '8000', '0');

INSERT INTO `bamazon`.`departments` (`department_id`, `department_name`, `over_head_costs`, `total_sales`)
VALUES ('4', 'Home', '4000', '0');
