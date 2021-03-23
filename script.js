let storage = window.localStorage;

async function verApi() {
  /* Obtiene los datos de la API */
  let resu = await fetch('data.json').then(response => response.json());
  return resu;
}

function mostrarProductos() {
  verApi().then(function (baseDeDatos) {
    Object.keys(baseDeDatos).forEach(function (i) {
      document.getElementById("Catalogo").innerHTML += `
      <div id="${i}" class="card" style="width: 18rem">
        <img class="card-img-top" src = ${baseDeDatos[i]["img"]} alt = ${baseDeDatos[i]["titulo"]}>
        <div class="card-body">
          <h5>${baseDeDatos[i]["titulo"]}</h5>
          <h4>$${baseDeDatos[i]["precio"]}</h4>
          <button id="${i}" onclick="agregarAlCarrito(this.id)" class="boton-personalizado">Agregar al carrito</button>
        </div>
      </div>
        `;
    });
  });
}

let carrito = [];

function agregarAlCarrito(id) {
  verApi().then(function (valor) {
    carrito.push(valor[id]);
    saveLocalStorage(carrito, "micarrito");
  })
}

function verCarrito() {
  document.getElementById("Catalogo").innerHTML = ``;
  loadLocalStorage("micarrito");

  for (let i = 0; i < carrito.length; i++) {
    document.getElementById("Catalogo").innerHTML += `
      <div class="card">
      <img class="card-img-top" src="${carrito[i].img}" alt="${carrito[i].titulo}" style="width: 18rem">
      <div class="card-body">
        <h5>${carrito[i].titulo}</h5>
        <p>${carrito[i].precio}</p>
        <button onclick="eliminarProducto(${i})" class="boton-personalizado">Quitar del carrito</button>
      </div>
    </div>
    `;
  }
}

function saveLocalStorage(info, tag) {
  // localStorage solo admite cadenas de texto (strings).
  // Utilizo JSON.stringify() y JSON.parse() para formatearlo.
  storage.setItem(tag, JSON.stringify(info));
}

function loadLocalStorage(tag) {
  if (storage.getItem(tag) != null) {
    carrito = Array.from(JSON.parse(storage.getItem(tag)));
  }
}

function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  saveLocalStorage(carrito, "micarrito");
  verCarrito();
}

function vaciarCarrito() {
  storage.clear();
  verCarrito();
}

function obtenerPrecioTotal() {
  let resultado = 0;
  for (let i = 0; i < carrito.length; i++) {
    resultado += carrito[i].precio;
  }
  document.getElementById("Total").innerHTML += `<h1>${resultado}</h1>`;
}

$(document).ready(function () {
  $("#sobreNosotros").fadeIn(3000);


  /* Quiero implementar el hover.
  Funciona bien con otros elementos pero no con un elemento especifico
  NECESITA REVISIÓN
  */
  $(".card").hover(function () {
    console.log("Pasé el mouse por encima");
  }, function () {
    console.log("Dejé de pasar el mouse");
  });

});