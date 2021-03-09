let baseDeDatos = [];
let carrito = [];

class Producto {
  constructor(titulo, descripcion, precio, imagen) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
  }
}

let producto1 = new Producto("Cupcake Chocolate", "Cupcake de chocolate con frosting de chocolate y relleno mermelada de frutos rojos.", 70, "CSS/images/chocolate.jpg");
let producto2 = new Producto("Mini Cake", "Torta pequeña con frutas de estación.", 550, "CSS/images/mini-cake2.jpg");
let producto3 = new Producto("Snack Box", "Contiene variedad de Snacks, picada y dos cervezas. ¡Ideal para compartir!", 800, "CSS/images/picada2.png");
let producto4 = new Producto("Cookies", "Galletitas de vainilla con diseños personalizados.", 300, "CSS/images/cookies.jpg");

baseDeDatos = [producto1, producto2, producto3, producto4];

function verCatalogo() {
  for (let i = 0; i < baseDeDatos.length; i++) {
    document.getElementById("Catalogo").innerHTML += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src = ${baseDeDatos[i].imagen} alt = ${baseDeDatos[i].titulo}>
    <div class="card-body">
      <h5>${baseDeDatos[i].titulo}</h5>
      <p>${baseDeDatos[i].descripcion}</p>
      <p>${baseDeDatos[i].precio}</p>
      <button id="${i}" onclick="agregarAlCarrito(this.id)" class="boton-personalizado">Agregar al carrito</button>
    </div>
  </div>
    `;
  }
}

function agregarAlCarrito(id) {
  console.log("Índice de la base de datos:" + baseDeDatos[id]);
  carrito.push(baseDeDatos[id]);
}


function verCarrito() {
  document.getElementById("Catalogo").innerHTML = ``;

  for (let i = 0; i < carrito.length; i++) {
    console.log(carrito[i]);
    document.getElementById("Catalogo").innerHTML += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${carrito[i].imagen}" alt="${carrito[i].titulo}">
    <div class="card-body">
      <h5>${carrito[i].titulo}</h5>
      <p>${carrito[i].descripcion}</p>
      <p>${carrito[i].precio}</p>
    </div>
  </div>
  `;
  }
}

function sumarCarrito() {
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


$("#iniciarCompra").click(function () {
  for (var i = 0; i < carrito.length; i++) {
    console.log("Carrito Status: ", i);

    $.post('https://api.mercadopago.com/checkout/preferences'),
    {
      "items": [
        {
          "title": carrito[i].titulo,
          "description": carrito[i].descripcion,
          "quantity": 1,
          "currency_id": "ARS",
          "unit_price": carrito[i].precio
        }
      ]
    }
  }
});


$.post('https://api.mercadopago.com/v1/payments'),
{
  "token": "TEST-37e89871-b0c1-415f-81df-36e077473b02",
  "payment_method_id": "visa",
  "additional_info": {
    "items": [
      {
        "id": "PR0001",
        "title": "Point Mini",
        "description": "Producto Point para cobros con tarjetas mediante bluetooth",
        "currency_id": "ARS",
        "quantity": 1,
        "unit_price": 58.80
      }
    ],
  }
}