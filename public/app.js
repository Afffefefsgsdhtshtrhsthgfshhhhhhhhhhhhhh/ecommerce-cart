const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const cartTotal = document.getElementById("cart-total");

function createCardArt(title) {
  const safeTitle = title.length > 18 ? `${title.slice(0, 18)}...` : title;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="840" viewBox="0 0 600 840">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7c3aed"/>
          <stop offset="50%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="600" height="840" rx="36" fill="#0f172a"/>
      <rect x="18" y="18" width="564" height="804" rx="28" fill="url(#bg)"/>
      <rect x="48" y="70" width="504" height="360" rx="20" fill="rgba(255,255,255,0.18)"/>
      <rect x="48" y="462" width="504" height="312" rx="20" fill="rgba(15,23,42,0.58)"/>
      <text x="52" y="52" font-size="28" font-family="Arial" font-weight="700" fill="white">CardVault Exclusive</text>
      <text x="300" y="245" text-anchor="middle" font-size="54" font-family="Arial" font-weight="800" fill="white">${safeTitle}</text>
      <text x="300" y="548" text-anchor="middle" font-size="32" font-family="Arial" font-weight="700" fill="#fff7ed">Rare TCG Single</text>
      <text x="300" y="610" text-anchor="middle" font-size="22" font-family="Arial" fill="white">Collector Edition</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getImageSrc(product) {
  if (product.image && product.image.trim() !== "") {
    return product.image;
  }
  return createCardArt(product.name);
}

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
    const imageSrc = getImageSrc(product);
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${imageSrc}" alt="${product.name}" onerror="this.src='${createCardArt(product.name)}'">
      <div class="product-meta">
        <span class="card-label">TCG Single</span>
        <span class="stock-note">Mint / Near Mint</span>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price-row">
        <strong>$${Number(product.price).toFixed(2)}</strong>
      </div>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
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
    total += Number(item.price) * Number(item.quantity);

    const imageSrc = item.image && item.image.trim() !== ""
      ? item.image
      : createCardArt(item.name);

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${imageSrc}" alt="${item.name}" onerror="this.src='${createCardArt(item.name)}'">
      <h3>${item.name}</h3>
      <p>Price: $${Number(item.price).toFixed(2)}</p>
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