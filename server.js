const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// 让 public 文件夹里的静态文件可以被访问
app.use(express.static(path.join(__dirname, "public")));

// 明确告诉服务器：访问首页 / 时，返回 public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 测试接口
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});