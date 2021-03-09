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

$(document).ready(function(){
  $("#sobreNosotros").fadeIn(1500)(function(){ 
  });
});


$(document).ready(function(){
  $("#iniciarCompra").click(function(){
    //alert("¿Deseas finalizar la compra?") funcion para iniciar compra con MP
  }); 
  });

//https://api.mercadolibre.com/sites/MLA/search?category=MLA5726
$.get(
  "https://codestats.net/api/users/jwildemer",
 function (baseDeDatos, estado) {
    console.log(estado)
    console.log(baseDeDatos);
    //baseDedatos = valores;
  }
);