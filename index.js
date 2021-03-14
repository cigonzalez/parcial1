let numItems = 0;
let foodCategories = [];
let products = {};

fetch("./restaurant.json").then((data) => {
  data.json().then((response) => {
    foodCategories = response;
    foodCategories.forEach((foodCategory) => {
      foodCategory.products.forEach((product) => {
        products[product.name] = {
          quantity: 0,
          product: product,
        };
      });
    });
    foodCategory = foodCategories[0];
    viewFoodCategory(foodCategory.name);
  });
});

function viewFoodCategory(foodCategoryName) {
  let sectionOrder = document.getElementById("order-detail");
  sectionOrder.style.display = "none";

  let sectionMenu = document.getElementById("menu");
  sectionMenu.style.display = "block";

  let foodCategory = foodCategories.find((c) => c.name === foodCategoryName);
  let sectionTitle = document.getElementById("section-title");
  sectionTitle.innerHTML = foodCategory.name;
  let sectionContent = document.getElementById("section-content");
  sectionContent.innerHTML = "";
  foodCategory.products.forEach((product) => {
    sectionContent.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img class="card-img-top" src="${product.image}" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer">
            <p class="card-text"><strong>$${product.price}</strong></p>
            <a class="btn btn-dark" onclick="addItem('${product.name}');">Add to car</a>
          </div>
        </div>
      </div>`;
  });
}

function addItem(productName) {
  numItems += 1;
  document.getElementById("car").innerHTML = numItems + " items ";
  products[productName]["quantity"] += 1;
}

function modifyItem(productName, n) {
  numItems += n;
  document.getElementById("car").innerHTML = numItems + " items ";
  products[productName]["quantity"] += n;
  viewOrderDetail();
}

function viewOrderDetail() {
  let sectionMenu = document.getElementById("menu");
  sectionMenu.style.display = "none";

  let sectionOrder = document.getElementById("order-detail");
  sectionOrder.style.display = "block";

  let total = 0;
  let idx = 0;
  let table = document.getElementsByClassName("body-table")[0];
  table.innerHTML = "";
  Object.keys(products).forEach((p) => {
    if (products[p]["quantity"] > 0) {
      var row = table.insertRow(-1);

      var item = row.insertCell(0);
      var qty = row.insertCell(1);
      var description = row.insertCell(2);
      var unitPrice = row.insertCell(3);
      var amount = row.insertCell(4);
      var modify = row.insertCell(5);

      item.innerHTML = ++idx;
      qty.innerHTML = products[p]["quantity"];
      description.innerHTML = products[p]["product"].name;
      unitPrice.innerHTML = products[p]["product"].price;
      amountProduct = products[p]["product"].price * products[p]["quantity"];
      amount.innerHTML = amountProduct.toFixed(2);
      modify.innerHTML = `
        <div class="text-center">
          <button class="btn btn-secondary" type="button" onclick="modifyItem('${products[p]["product"].name}', 1);">+</button>
          <button class="btn btn-secondary" type="button" onclick="modifyItem('${products[p]["product"].name}', -1);">-</button>
        </div>`;
      total += amountProduct;
    }
  });
  document.getElementById("total").innerHTML = `<strong>Total: $${total.toFixed(
    2
  )}</strong>`;
}

function cancelOrder() {
  Object.keys(products).forEach((p) => {
    products[p]["quantity"] = 0;
  });
  numItems = 0;
  viewOrderDetail();
}

function confirmOrder() {
  let order = [];
  let idx = 0;
  Object.keys(products).forEach((p) => {
    if (products[p]["quantity"] > 0) {
      order.push({
        item: ++idx,
        quantity: products[p]["quantity"],
        description: products[p]["product"].name,
        unitPrice: products[p]["product"].price,
      });
    }
  });
  console.log(order);
}
