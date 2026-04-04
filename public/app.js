const productsContainer = document.getElementById("products");

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
    `;

    productsContainer.appendChild(card);
  });
}

fetchProducts();