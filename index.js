let numItems = 0;
let categories = [];
let products = [];

fetch(
  "./restaurant.json"
).then((data) =>
  data.json().then((response) => {
    categories = response;
    categories.forEach((category) => {
      let section = document.getElementById(category.name + "-cards");
      console.log(section)
      category.products.forEach((product) => {
        addProduct(product, section);
        products.push(product);
      });
    });
  })
);


function addProduct(product, section) {
    section.innerHTML += `
        <div class="col-3 space">
        <div class="card h-50">
        <img class="card-img-top" src="${product.image}" alt="${product.name}">
        <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><strong>$${product.price}</strong></p>
        <a href="#" class="btn btn-dark" onclick="addItemToCart('${product.name}');">Add to cart</a>
        </div>
        </div>
        </div>`;
}

function addItemToCart() {
    numItems += 1
    document.getElementById("cart").innerHTML = numItems + " items ";
}
