const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");

async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

async function fetchCart() {
  try {
    const response = await fetch("/api/cart");
    const cartItems = await response.json();

    renderCart(cartItems);
  } catch (error) {
    console.error("Error loading cart:", error);
    cartContainer.innerHTML = "<p>Failed to load cart.</p>";
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

function renderCart(items) {
  cartContainer.innerHTML = "";

  if (items.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;

    cartContainer.appendChild(div);
  });
}

async function addToCart(productId) {
  try {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1
      })
    });

    fetchCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

fetchProducts();
fetchCart();