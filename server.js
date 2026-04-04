const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 读取所有商品
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to fetch products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    res.json(results);
  });
});

// 读取购物车
app.get("/api/cart", (req, res) => {
  const sql = `
    SELECT cart_items.id, cart_items.quantity, products.name, products.price, products.image
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to fetch cart items:", err);
      return res.status(500).json({ error: "Failed to fetch cart items" });
    }

    res.json(results);
  });
});

// 加入购物车
app.post("/api/cart", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const checkSql = "SELECT * FROM cart_items WHERE product_id = ?";

  db.query(checkSql, [productId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      const updateSql = "UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?";

      db.query(updateSql, [quantity, productId], (err2) => {
        if (err2) {
          console.error("Failed to update existing cart item:", err2);
          return res.status(500).json({ error: "Failed to update cart item" });
        }

        res.json({ message: "Cart updated successfully" });
      });
    } else {
      const insertSql = "INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)";

      db.query(insertSql, [productId, quantity], (err3) => {
        if (err3) {
          console.error("Failed to add item to cart:", err3);
          return res.status(500).json({ error: "Failed to add item to cart" });
        }

        res.json({ message: "Item added to cart" });
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});