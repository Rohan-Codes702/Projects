let editIndex = -1;

function displayProducts() {
  const products = getProducts();
  const table = document.getElementById("productTable");
  const totalItems = document.getElementById("totalItems");
  const totalValue = document.getElementById("totalValue");

  table.innerHTML = "";
  let itemCount = 0;
  let valueTotal = 0;

  products.forEach((p, i) => {
    itemCount += p.qty;
    valueTotal += p.qty * p.price;

    const row = document.createElement("tr");
    row.className = p.qty < 5 ? "low-stock" : "";

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.qty}</td>
      <td>₹${p.price.toFixed(2)}</td>
      <td>
        <button onclick="editProduct(${i})">Edit</button>
        <button onclick="deleteProduct(${i})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  totalItems.textContent = itemCount;
  totalValue.textContent = valueTotal.toFixed(2);
}

function addOrUpdateProduct() {
  const name = document.getElementById("name").value.trim();
  const qty = parseInt(document.getElementById("qty").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!name || qty < 0 || price < 0) {
    alert("Enter valid product details.");
    return;
  }

  const products = getProducts();

  if (editIndex === -1) {
    products.push({ name, qty, price });
  } else {
    products[editIndex] = { name, qty, price };
    editIndex = -1;
  }

  saveProducts(products);
  clearForm();
  displayProducts();
}

function editProduct(index) {
  const products = getProducts();
  const product = products[index];
  document.getElementById("name").value = product.name;
  document.getElementById("qty").value = product.qty;
  document.getElementById("price").value = product.price;
  editIndex = index;
}

function deleteProduct(index) {
  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
  displayProducts();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("price").value = "";
}

function searchProduct() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const products = getProducts();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  displayProducts(filtered);
}

function logout() {
  localStorage.removeItem("loggedInUser"); // Ensure logout clears session
  window.location.href = "index.html"; // Redirect to login page
}
