# CardVault TCG Shop

## Project Overview
CardVault TCG Shop is a single-page dynamic web application built for a trading card game (TCG) shopping scenario. Users can browse all cards displayed on the page, add cards to the shopping cart, update item quantities, and remove cards from the cart without reloading the page.

## Purpose of the Project
This project was designed to create a smooth and interactive online shopping cart experience for collectible card products. It demonstrates how a single-page website can connect a frontend interface with a backend server and a MySQL database to support full CRUD operations.

## Main Features
- View all TCG products displayed on the page
- Add cards to the shopping cart
- Increase cart item quantity
- Decrease cart item quantity
- Remove items from the cart
- View the updated total price
- Dynamic product rendering from MySQL
- Single-page application behaviour without page reloads

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- GitHub

## Single Page Application Behaviour
This application behaves like a single-page application. It uses one main HTML page and dynamically updates the visible content using JavaScript and API requests instead of loading separate pages from the server.

## CRUD Operations
This project includes all required CRUD operations through the shopping cart system:

- **Create**: Add a product to the cart
- **Read**: Display all products and current cart items
- **Update**: Change the quantity of a cart item
- **Delete**: Remove a product from the cart

## Database Structure
The project uses a MySQL database called `ecommerce_cart` with two main tables:

### 1. products
Stores all TCG card product information:
- id
- name
- price
- image
- description

### 2. cart_items
Stores cart data:
- id
- product_id
- quantity

## Folder Structure
```text
ecommerce-cart/
├── public/
│   ├── web-images/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── db/
│   └── schema.sql
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js