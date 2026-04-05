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
('Luffy Manga Gear 5', 3633.33, '/web-images/luffy-gear5.jpg', 'One Piece Trading Card Game'),
('Mega Charizard', 999.99, '/web-images/mega-charizard ex.jpg', 'Pokemon Trading Card Game'),
('Mega Gengar', 329.25, '/web-images/mega-gengar.jpg', 'Pokemon Trading Card Game'),
('Pikachu', 176.62, '/web-images/pikachu.jpg', 'Pokemon Trading Card Game'),
('Luffy Manga', 1921.24, '/web-images/luffy-manga.jpg', 'One Piece Trading Card Game'),
('Blazing Dragon', 41.25, '/web-images/blazing-dragon.jpg', 'Yu-Gi-Oh! Trading Card Game');