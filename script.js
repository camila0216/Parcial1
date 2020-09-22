const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let datos = "";
let products = 0;
let carritoList = [];
let total = 0;

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
  div.classList.add("row-cols-md-4");
  div.classList.add("row-cols-1");
  div.classList.add("row");

  let content = "";
  for (let i = 0; i < data.products.length; i++) {
    content += `<div class="col mb-3"> <div class="card h-100">
    <img class="card-img-top cardImages" src="${data.products[i].image}" alt="${data.products[i].name}">
    <div class="card-body">
      <h5 class="card-title">${data.products[i].name}</h5>
      <p class="card-text">${data.products[i].description}</p>
      <p class="price card-text bold">$${data.products[i].price}</p>
      <a class="adding btn btn-dark btnProducts">Add to Car</a>
    </div>
  </div></div>`;
  }
  div.innerHTML = content;

  const titulo = document.querySelector("#titulo");
  titulo.innerHTML = data.name;

  //Set event listeners
  addEventListeners();
}
6;
//Loading others
function cargar(index) {
  loadDatos(datos[index]);
}

//Carrito
function addProduct(button) {
  products++;
  const sub = document.querySelector("#items");
  sub.innerHTML = products + " items";

  //Add to carritoList
  const card = button.parentNode;
  const name = card.querySelector("h5");
  const precio = card.querySelector(".price");

  let existe = false;
  let objectIndex = -1;
  for (let i = 0; i < carritoList.length && !existe; i++) {
    if (name.textContent === carritoList[i]["description"]) {
      existe = true;
      objectIndex = i;
    }
  }

  if (!existe) {
    const nuevo = {
      item: carritoList.length + 1,
      quantity: 1,
      description: name.textContent,
      uprice: parseFloat(precio.textContent.slice(1)),
      amount: parseFloat(precio.textContent.slice(1)),
    };
    carritoList.push(nuevo);
    total += nuevo["uprice"];
  } else {
    carritoList[objectIndex]["quantity"]++;
    carritoList[objectIndex]["amount"] =
      carritoList[objectIndex]["quantity"] * carritoList[objectIndex]["uprice"];
    total += carritoList[objectIndex]["uprice"];
  }
}

//Function for adding event listeners
function addEventListeners() {
  //Set onclicks
  //Carrito
  const carrito = document.querySelector("#buttonCarrito");
  carrito.onclick = () => loadTable();

  //Nav bar
  const burgers = document.querySelector("#burgers");
  burgers.onclick = () => cargar(0);
  const tacos = document.querySelector("#tacos");
  tacos.onclick = () => cargar(1);
  const salads = document.querySelector("#salads");
  salads.onclick = () => cargar(2);
  const desserts = document.querySelector("#desserts");
  desserts.onclick = () => cargar(3);
  const drinks = document.querySelector("#drinks");
  drinks.onclick = () => cargar(4);

  //Modal yes
  const yes = document.querySelector("#yes");
  yes.onclick = () => deleteTable();

  //Add to car
  const allAdding = document.querySelectorAll(".adding");
  for (let i = 0; i < allAdding.length; i++) {
    allAdding[i].onclick = () => addProduct(allAdding[i]);
  }
}

function loadTable() {
  //Change title
  const h = document.querySelector("#titulo");
  h.textContent = "Order detail";

  const div = document.querySelector("#cards");
  div.classList.remove("row-cols-md-4");
  div.classList.remove("row-cols-1");
  div.classList.remove("row");

  //Creating table tag
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");

  //Creating header
  const header = document.createElement("thead");
  const rowHead = document.createElement("tr");
  const h1 = document.createElement("th");
  h1.textContent = "Item";
  rowHead.appendChild(h1);
  const h2 = document.createElement("th");
  h2.textContent = "Qty";
  rowHead.appendChild(h2);
  const h3 = document.createElement("th");
  h3.textContent = "Description";
  rowHead.appendChild(h3);
  const h4 = document.createElement("th");
  h4.textContent = "Unit Price";
  rowHead.appendChild(h4);
  const h5 = document.createElement("th");
  h5.textContent = "Amount";
  rowHead.appendChild(h5);
  header.appendChild(rowHead);
  table.appendChild(header);

  //Creating body
  const body = document.createElement("tbody");

  //Loading data
  for (let i = 0; i < carritoList.length; i++) {
    const row = document.createElement("tr");
    const item = document.createElement("th");
    item.textContent = carritoList[i]["item"];
    row.appendChild(item);
    const qty = document.createElement("td");
    qty.textContent = carritoList[i]["quantity"];
    row.appendChild(qty);
    const description = document.createElement("td");
    description.textContent = carritoList[i]["description"];
    row.appendChild(description);
    const uprice = document.createElement("td");
    uprice.textContent = carritoList[i]["uprice"];
    row.appendChild(uprice);
    const totalR = document.createElement("td");
    totalR.textContent = carritoList[i]["amount"];
    row.appendChild(totalR);
    body.appendChild(row);
  }

  table.appendChild(body);

  //Replace html
  div.innerHTML = "";
  div.appendChild(table);

  //adding total
  const lastRow = document.createElement("div");
  lastRow.classList.add("row");
  const totalP = document.createElement("p");
  totalP.textContent = "Total: $" + Number(total.toFixed(2));
  totalP.classList.add("col-9");
  totalP.id = "total";
  lastRow.appendChild(totalP);

  //Buttons
  const cancelDiv = document.createElement("div");
  const cancelBut = document.createElement("button");
  cancelBut.id = "cancel";
  cancelBut.textContent = "Cancel";
  cancelBut.onclick = function () {
    openModal();
  };
  cancelDiv.classList.add("col-1");
  cancelDiv.appendChild(cancelBut);
  lastRow.appendChild(cancelDiv);

  const confirmDiv = document.createElement("div");
  const confirmBut = document.createElement("button");
  confirmBut.id = "confirm";
  confirmBut.textContent = "Confirm order";
  confirmBut.onclick = function () {
    confirmOrder();
  };
  confirmDiv.classList.add("col-2");
  confirmDiv.appendChild(confirmBut);
  lastRow.appendChild(confirmDiv);

  div.appendChild(lastRow);
}

//Open Modal
function openModal() {
  //Display modal for updating
  $("#cancelingModal").modal("show");
}

//Cancel order
function deleteTable() {
  const rows = document.querySelector("tbody");
  rows.innerHTML = "";
  carritoList = [];
  products = 0;
  const sub = document.querySelector("#items");
  sub.innerHTML = products + " items";
  total = 0;
  const totalLabel = document.querySelector("#total");
  totalLabel.innerHTML = "Total: $" + 0;
}

//Confirm order
function confirmOrder() {
  console.log(carritoList);
}
