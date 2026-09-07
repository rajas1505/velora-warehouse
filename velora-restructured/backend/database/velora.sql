-- ============================================
-- VELORA WAREHOUSE MANAGEMENT - DATABASE SCRIPT
-- Run this file in MySQL Workbench (or phpMyAdmin)
-- to create the database, tables and sample data.
-- ============================================

CREATE DATABASE IF NOT EXISTS velora_warehouse;
USE velora_warehouse;

-- ---------------------------------------------
-- Table: products  (Inventory)
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------
-- Table: orders
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(20) NOT NULL,
    customer VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    order_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------
-- Table: contact_messages
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------
-- Sample data (optional, so pages aren't empty)
-- ---------------------------------------------
INSERT INTO products (name, category, stock) VALUES
('Laptop', 'Electronics', 245),
('Wireless Mouse', 'Accessories', 32),
('Office Chair', 'Furniture', 180),
('Barcode Scanner', 'Warehouse', 12),
('Printer Ink', 'Office', 0),
('Storage Boxes', 'Packaging', 510);

INSERT INTO orders (order_code, customer, status, order_date) VALUES
('ORD201', 'Amazon', 'Completed', '2026-08-06'),
('ORD202', 'Flipkart', 'Completed', '2026-08-06'),
('ORD203', 'Reliance', 'Pending', '2026-08-05'),
('ORD204', 'Tata', 'Completed', '2026-08-05');
