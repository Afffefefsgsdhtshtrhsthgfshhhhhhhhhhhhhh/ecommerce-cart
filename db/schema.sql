CREATE DATABASE IF NOT EXISTS ecommerce_cart;
USE ecommerce_cart;

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    description TEXT
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, price, image, description) VALUES
('Wireless Mouse', 25.99, 'https://via.placeholder.com/150', 'Comfortable wireless mouse'),
('Mechanical Keyboard', 79.99, 'https://via.placeholder.com/150', 'RGB mechanical keyboard'),
('USB-C Hub', 39.99, 'https://via.placeholder.com/150', 'Multi-port USB-C hub'),
('Laptop Stand', 29.99, 'https://via.placeholder.com/150', 'Adjustable aluminum laptop stand'),
('Noise Cancelling Headphones', 129.99, 'https://via.placeholder.com/150', 'Over-ear noise cancelling headphones');