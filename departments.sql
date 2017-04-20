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
