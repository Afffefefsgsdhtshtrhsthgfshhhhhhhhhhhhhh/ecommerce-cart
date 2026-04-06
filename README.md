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

How to Run the Project

Download or clone the project files
Open the project folder in VS Code
Run npm install
Create a local .env file based on .env.example
Make sure MySQL Server is running
Open MySQL Workbench
Run the SQL script in db/schema.sql
Start the server with npm run dev
Open http://localhost:3000 in the browser
Database Setup

The database setup file is included in:

db/schema.sql

This file contains:

database creation
table creation
initial TCG product data
Image Files

Product images are stored locally inside:

public/web-images

These files are required for the product cards to display correctly.

Challenges Faced

One of the challenges was to correctly connect the front-end, back-end and MySQL database in order to dynamically update the product and shopping cart data. During this operation, some connection failure issues were encountered. Another challenge is that during the production period, there were some issues with GitHub's transmission, and the new update data could not be synchronized to the GitHub repository.

Final Outcome

The final website is a TCG-themed shopping cart application that allows users to browse collectible card products and interact with the cart in a dynamic way. It satisfies the main technical requirements of a single-page dynamic website with database CRUD operations.

Notes
The real .env file is not included in the public repository for security reasons.
Use .env.example as a template when setting up the project locally.