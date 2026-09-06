// BOTON AUMENTAR CANTIDAD

const botonesAumentar = document.querySelectorAll(".aumentar");

botonesAumentar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        const cantidad = producto.querySelector(".cantidad");

        let numero = parseInt(cantidad.textContent);

        numero++;

        cantidad.textContent = numero;

    });

});


// BOTON DISMINUIR CANTIDAD

const botonesDisminuir = document.querySelectorAll(".disminuir");

botonesDisminuir.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        const cantidad = producto.querySelector(".cantidad");

        let numero = parseInt(cantidad.textContent);

        if (numero > 1) {
            numero--;
        }

        cantidad.textContent = numero;

    });

});

// =========================
// AGREGAR PRODUCTO AL CARRITO
// =========================

const botonesAgregar = document.querySelectorAll(".agregar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cantidadCarrito = document.querySelector("#cantidad-carrito");

actualizarCantidadCarrito();


botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        const nombre = boton.dataset.nombre;

        const precio = parseInt(boton.dataset.precio);

        const cantidadElemento = producto.querySelector(".cantidad");

        const cantidad = parseInt(cantidadElemento.textContent);

        const imagen = producto.querySelector(".imagen-producto").src;

        const productoExistente = carrito.find(function(item) {
            return item.nombre === nombre;
        });


        if (productoExistente) {

            productoExistente.cantidad =
                productoExistente.cantidad + cantidad;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                imagen: imagen
            });

        }


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarCantidadCarrito();


        // Vuelve el selector del producto a 1
        cantidadElemento.textContent = 1;


        console.log("Producto agregado:", nombre);
        console.log("Cantidad:", cantidad);
        console.log("Carrito:", carrito);

    });

});


// =========================
// ACTUALIZAR NUMERO DEL CARRITO
// =========================

function actualizarCantidadCarrito() {

    let totalProductos = 0;

    carrito.forEach(function(producto) {

        totalProductos =
            totalProductos + producto.cantidad;

    });


    cantidadCarrito.textContent = totalProductos;

}