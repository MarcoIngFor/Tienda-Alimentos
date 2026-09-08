// =========================
// CARRITO
// =========================

let carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.querySelector("#cantidad-carrito");



// =========================
// CREAR ARREGLO DE PRODUCTOS
// DESDE EL CATALOGO INICIAL
// =========================

function obtenerProductosIniciales() {

    const productosIniciales = [];

    const tarjetas = document.querySelectorAll(".producto");

    tarjetas.forEach(function(tarjeta, indice) {

        const boton = tarjeta.querySelector(".agregar-carrito");

        const imagen = tarjeta.querySelector(".imagen-producto");

        const seccion = tarjeta.closest(".seccion-productos");


        if (!boton || !imagen || !seccion) {
            return;
        }


        const producto = {

            codigo: "WEB" + String(indice + 1).padStart(3, "0"),

            nombre: boton.dataset.nombre,

            descripcion: "",

            precio: Number(boton.dataset.precio),

            stock: 20,

            stockCritico: 5,

            categoria: seccion.id,

            imagen: imagen.getAttribute("src")

        };

        productosIniciales.push(producto);

    });

    return productosIniciales;

}



// =========================
// INICIALIZAR CATALOGO
// =========================

function inicializarCatalogo() {

    const yaInicializado = localStorage.getItem("catalogoInicializado");


    if (yaInicializado === "true") {
        return;
    }

    const productosHTML = obtenerProductosIniciales();

    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];


    // Partimos con todos los productos existentes
    const productosCombinados = [...productosHTML];


    // Agregar productos creados desde administrador
    productosGuardados.forEach(function(productoAdmin) {

        const existe = productosCombinados.some(function(producto) {

                return (producto.codigo === productoAdmin.codigo || producto.nombre === productoAdmin.nombre);

            });


        if (!existe) {

            productosCombinados.push(productoAdmin);

        }

    });


    localStorage.setItem("productos",JSON.stringify(productosCombinados));


    localStorage.setItem("catalogoInicializado","true");

}



inicializarCatalogo();



// =========================
// OBTENER ARREGLO
// =========================

let productos = JSON.parse(localStorage.getItem("productos")) || [];



// =========================
// MOSTRAR PRODUCTOS
// DESDE JAVASCRIPT
// =========================

function mostrarProductos() {

    const contenedores = document.querySelectorAll(".contenedor-productos");

    // Vaciar productos escritos originalmente en HTML
    contenedores.forEach(function(contenedor) {

        contenedor.innerHTML = "";

    });


    productos.forEach(function(producto) {

        const seccion = document.querySelector("#" + producto.categoria); /*del arreglo producto rescata el id*/


        if (!seccion) {
            return;
        }


        const contenedor =seccion.querySelector(".contenedor-productos");


        const tarjeta = document.createElement("article");


        tarjeta.classList.add("producto");


        tarjeta.innerHTML = `

            <a href="detalle-producto.html?codigo=${producto.codigo}"
                class="link-detalle-producto">

                <img src="${producto.imagen}"
                alt="${producto.nombre}"
                class="imagen-producto">

                <h3>
                    ${producto.nombre}
                </h3>

            </a>

            <p class="precio-producto">
                $${Number(producto.precio).toLocaleString("es-CL")}
            </p>

            <div class="acciones-producto">

                <div class="selector-cantidad">

                    <button
                        type="button"
                        class="disminuir">
                        −
                    </button>

                    <span class="cantidad">
                        1
                    </span>

                    <span>
                        un
                    </span>

                    <button
                        type="button"
                        class="aumentar">
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="agregar-carrito"
                    data-nombre="${producto.nombre}"
                    data-precio="${producto.precio}">

                    Agregar

                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });


    activarControlesProductos();

}



mostrarProductos();



// =========================
// ACTIVAR BOTONES
// =========================

function activarControlesProductos() {


    // AUMENTAR

    document.querySelectorAll(".aumentar").forEach(function(boton) {

            boton.addEventListener("click",function() {

                    const producto = boton.closest(".producto");

                    const cantidad = producto.querySelector(".cantidad");

                    let numero =Number(cantidad.textContent);

                    numero++;

                    cantidad.textContent = numero;

                }
            );

        });



    // DISMINUIR

    document.querySelectorAll(".disminuir").forEach(function(boton) {

            boton.addEventListener("click",function() {

                    const producto = boton.closest(".producto");

                    const cantidad = producto.querySelector(".cantidad");

                    let numero = Number(cantidad.textContent);

                    if (numero > 1) {

                        numero--;

                    }

                    cantidad.textContent = numero;

                }
            );

        });



    // =========================
    // AGREGAR AL CARRITO
    // =========================

    document.querySelectorAll(".agregar-carrito").forEach(function(boton) {

            boton.addEventListener("click",function() {

                    const tarjeta = boton.closest(".producto");


                    const nombre = boton.dataset.nombre;


                    const precio = Number(boton.dataset.precio);


                    const cantidadElemento = tarjeta.querySelector(".cantidad");


                    const cantidad =Number(cantidadElemento.textContent);


                    const imagen = tarjeta.querySelector(".imagen-producto").src;


                    const existente = carritoProductos.find(function(item) {

                            return (
                                item.nombre === nombre
                            );

                        }
                    );


                    if (existente) {

                        existente.cantidad += cantidad;

                    } else {

                        carritoProductos.push({

                            nombre: nombre,

                            precio: precio,

                            cantidad: cantidad,

                            imagen: imagen

                        });

                    }


                    localStorage.setItem("carrito",JSON.stringify(carritoProductos));


                    actualizarContadorCarritoProductos();


                    cantidadElemento.textContent = 1;

                }
            );

        });

}



// =========================
// CONTADOR CARRITO
// =========================

function actualizarContadorCarritoProductos() {

    if (!contadorCarrito) {
        return;
    }


    let total = 0;


    carritoProductos.forEach(function(producto) {

        total += producto.cantidad;

    });


    contadorCarrito.textContent = total;

}



actualizarContadorCarritoProductos();