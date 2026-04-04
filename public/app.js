const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const cartTotal = document.getElementById("cart-total");

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
    cartTotal.textContent = "Total: $0.00";
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
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  items.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <div class="cart-controls">
        <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+1</button>
        <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-1</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
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

async function changeQuantity(cartId, newQuantity) {
  if (newQuantity < 1) {
    return;
  }

  try {
    await fetch(`/api/cart/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: newQuantity
      })
    });

    fetchCart();
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}

async function removeFromCart(cartId) {
  try {
    await fetch(`/api/cart/${cartId}`, {
      method: "DELETE"
    });

    fetchCart();
  } catch (error) {
    console.error("Error removing item:", error);
  }
}

fetchProducts();
fetchCart();