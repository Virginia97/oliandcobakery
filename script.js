async function verApi() {
  /* Obtenemos los datos de la API */
  let resu = await fetch('data.json').then(response => response.json())
    .then(function (baseDeDatos) {
      Object.keys(baseDeDatos).forEach(function (i) {
        document.getElementById("Catalogo").innerHTML += `
          <div class="card" style="width: 18rem">
          <img class="card-img-top" src = ${baseDeDatos[i]["img"]} alt = ${baseDeDatos[i]["titulo"]}>
          <div class="card-body">
            <h5>${baseDeDatos[i]["titulo"]}</h5>
            <h4>$${baseDeDatos[i]["precio"]}</h4>
            <button id="${i}" onclick="agregarAlCarrito(this.id)" class="boton-personalizado">Agregar al carrito</button>
          </div>
        </div>
          `;
      });
      return baseDeDatos;
    });
  return resu;
}

verApi()

let carrito = [];

function agregarAlCarrito(id) {
  console.log(id)
  verApi().then(function (valor) {
    carrito.push(valor[id]);
    console.log(carrito);
  })
}

function verCarrito() {
  document.getElementById("Catalogo").innerHTML = ``;

  for (let i = 0; i < carrito.length; i++) {
    document.getElementById("Catalogo").innerHTML += `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${carrito[i].img}" alt="${carrito[i].titulo}">
      <div class="card-body">
        <h5>${carrito[i].titulo}</h5>
        <p>${carrito[i].precio}</p>
      </div>
    </div>
    `;
  }
}

function obtenerPrecioTotal() {
  let resultado = 0;
  for (let i = 0; i < carrito.length; i++) {
    resultado += carrito[i].precio;
  }
  document.getElementById("Total").innerHTML += `
      <div class="card">
        <h1>${resultado}</h1>
      </div>
    `;
}


$(document).ready(function () {
  $("#sobreNosotros").fadeIn(1500)(function () {
  });
});