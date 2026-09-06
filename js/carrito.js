// =========================
// OBTENER CARRITO GUARDADO
// =========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaCarrito = document.querySelector("#lista-carrito");

const totalCarrito = document.querySelector("#total-carrito");

const cantidadCarrito = document.querySelector("#cantidad-carrito");

const botonVaciar = document.querySelector("#vaciar-carrito");

const botonFinalizar = document.querySelector("#finalizar-compra");


// =========================
// FORMATEAR PRECIOS
// =========================

function formatoPrecio(valor) {

    return valor.toLocaleString("es-CL");

}


// =========================
// MOSTRAR CARRITO
// =========================

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;

    let totalUnidades = 0;


    carrito.forEach(function(producto) {

        const subtotal =
            producto.precio * producto.cantidad;


        total =
            total + subtotal;


        totalUnidades =
            totalUnidades + producto.cantidad;


        const productoHTML =
            document.createElement("div");


        productoHTML.classList.add(
            "producto-carrito"
        );


        productoHTML.innerHTML = `

            <div class="nombre-producto-carrito">

                <img src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="imagen-carrito">

                <h3>${producto.nombre}</h3>

            </div>


            <div class="precio-producto-carrito">

                <p>
                    $${formatoPrecio(producto.precio)}
                </p>

            </div>


            <div class="cantidad-producto-carrito">

                <button class="disminuir-carrito"
                        data-nombre="${producto.nombre}"
                        type="button">
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button class="aumentar-carrito"
                        data-nombre="${producto.nombre}"
                        type="button">
                    +
                </button>

            </div>


            <div class="subtotal-producto-carrito">

                <p>
                    $${formatoPrecio(subtotal)}
                </p>

            </div>


            <button class="eliminar-producto"
                    data-nombre="${producto.nombre}"
                    type="button">
                Eliminar
            </button>

        `;


        listaCarrito.appendChild(
            productoHTML
        );

    });


    totalCarrito.textContent =
        "$" + formatoPrecio(total);


    cantidadCarrito.textContent =
        totalUnidades;


    activarBotones();

}


// =========================
// ACTIVAR BOTONES
// =========================

function activarBotones() {

    const botonesAumentar =
        document.querySelectorAll(
            ".aumentar-carrito"
        );


    const botonesDisminuir =
        document.querySelectorAll(
            ".disminuir-carrito"
        );


    const botonesEliminar =
        document.querySelectorAll(
            ".eliminar-producto"
        );


    // =========================
    // AUMENTAR CANTIDAD
    // =========================

    botonesAumentar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const nombre =
                        boton.dataset.nombre;


                    const producto =
                        carrito.find(
                            function(item) {

                                return item.nombre === nombre;

                            }
                        );


                    producto.cantidad++;


                    guardarCarrito();

                }
            );

        }
    );


    // =========================
    // DISMINUIR CANTIDAD
    // =========================

    botonesDisminuir.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const nombre =
                        boton.dataset.nombre;


                    const producto =
                        carrito.find(
                            function(item) {

                                return item.nombre === nombre;

                            }
                        );


                    if (producto.cantidad > 1) {

                        producto.cantidad--;

                    }


                    guardarCarrito();

                }
            );

        }
    );


    // =========================
    // ELIMINAR PRODUCTO
    // =========================

    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const nombre =
                        boton.dataset.nombre;


                    carrito =
                        carrito.filter(
                            function(producto) {

                                return producto.nombre !== nombre;

                            }
                        );


                    guardarCarrito();

                }
            );

        }
    );

}


// =========================
// GUARDAR CARRITO
// =========================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    mostrarCarrito();

}


// =========================
// VACIAR CARRITO
// =========================

botonVaciar.addEventListener(
    "click",
    function() {

        carrito = [];


        guardarCarrito();

    }
);


// =========================
// FINALIZAR COMPRA
// =========================

botonFinalizar.addEventListener(
    "click",
    function() {

        if (carrito.length === 0) {

            alert(
                "El carrito está vacío"
            );

        } else {

            alert(
                "Compra realizada con éxito"
            );


            carrito = [];


            guardarCarrito();

        }

    }
);


// =========================
// INICIAR
// =========================

mostrarCarrito();