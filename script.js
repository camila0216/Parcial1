const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let datos = "";
let products = 0;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    datos = myJson;
    loadDatos(datos[0]);
  });

function loadDatos(data) {
  const div = document.querySelector("#cards");
  let content = "";
  for (let i = 0; i < data.products.length; i++) {
    content += `<div class="card col-3 px-3 py-3" style="width: 18rem;">
    <img class="card-img-top" src="${data.products[i].image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${data.products[i].name}</h5>
      <p class="card-text">${data.products[i].description}</p>
      <p class="card-text">${data.products[i].price}</p>
      <a onclick="addProduct()" class="btn btn-primary">Add to Car</a>
    </div>
  </div>`;
  }
  div.innerHTML = content;

  const titulo = document.querySelector("#titulo");
  titulo.innerHTML = data.name;
}

//Loading others
function cargar(index) {
  loadDatos(datos[index]);
}

//Carrito
function addProduct() {
  products++;
  const sub = document.querySelector("#items");
  sub.innerHTML = products + "items";
}
