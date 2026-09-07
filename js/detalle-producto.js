const parametros =
    new URLSearchParams(window.location.search);

const codigoProducto =
    parametros.get("codigo");


const productosDetalle =
    JSON.parse(localStorage.getItem("productos")) || [];


const productoDetalle =
    productosDetalle.find(function(producto) {

        return producto.codigo === codigoProducto;

    });


const imagenDetalle =
    document.querySelector("#detalle-imagen");

const nombreDetalle =
    document.querySelector("#detalle-nombre");

const descripcionDetalle =
    document.querySelector("#detalle-descripcion");

const precioDetalle =
    document.querySelector("#detalle-precio");

const stockDetalle =
    document.querySelector("#detalle-stock");

const categoriaDetalle =
    document.querySelector("#detalle-categoria");

const cantidadDetalle =
    document.querySelector("#cantidad-detalle");

const aumentarDetalle =
    document.querySelector("#aumentar-detalle");

const disminuirDetalle =
    document.querySelector("#disminuir-detalle");

const agregarDetalle =
    document.querySelector("#agregar-detalle");

const mensajeDetalle =
    document.querySelector("#mensaje-detalle");



if (!productoDetalle) {

    document.querySelector(".detalle-producto").innerHTML = `
        <p>
            Producto no encontrado.
        </p>
    `;

} else {

    imagenDetalle.src =
        productoDetalle.imagen;

    imagenDetalle.alt =
        productoDetalle.nombre;

    nombreDetalle.textContent =
        productoDetalle.nombre;


    if (
        productoDetalle.descripcion &&
        productoDetalle.descripcion.trim() !== ""
    ) {

        descripcionDetalle.textContent =
            productoDetalle.descripcion;

    } else {

        descripcionDetalle.textContent =
            "Producto disponible en La Parada del Medio.";

    }


    precioDetalle.textContent =
        "$" +
        Number(
            productoDetalle.precio
        ).toLocaleString("es-CL");


    stockDetalle.textContent =
        productoDetalle.stock;


    categoriaDetalle.textContent =
        productoDetalle.categoria;



    // =========================
    // AUMENTAR
    // =========================

    aumentarDetalle.addEventListener(
        "click",
        function() {

            let cantidad =
                Number(
                    cantidadDetalle.textContent
                );


            if (cantidad < productoDetalle.stock) {

                cantidad++;

            }


            cantidadDetalle.textContent =
                cantidad;

        }
    );



    // =========================
    // DISMINUIR
    // =========================

    disminuirDetalle.addEventListener(
        "click",
        function() {

            let cantidad =
                Number(
                    cantidadDetalle.textContent
                );


            if (cantidad > 1) {

                cantidad--;

            }


            cantidadDetalle.textContent =
                cantidad;

        }
    );



    // =========================
    // AGREGAR AL CARRITO
    // =========================

    agregarDetalle.addEventListener(
        "click",
        function() {

            let carrito =
                JSON.parse(
                    localStorage.getItem("carrito")
                ) || [];


            const cantidad =
                Number(
                    cantidadDetalle.textContent
                );


            const existente =
                carrito.find(function(item) {

                    return (
                        item.nombre ===
                        productoDetalle.nombre
                    );

                });


            if (existente) {

                existente.cantidad +=
                    cantidad;

            } else {

                carrito.push({

                    nombre:
                        productoDetalle.nombre,

                    precio:
                        Number(
                            productoDetalle.precio
                        ),

                    cantidad:
                        cantidad,

                    imagen:
                        productoDetalle.imagen

                });

            }


            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            mensajeDetalle.textContent =
                "Producto agregado al carrito";


            actualizarContadorDetalle();


            cantidadDetalle.textContent =
                1;

        }
    );

}



// =========================
// CONTADOR CARRITO
// =========================

function actualizarContadorDetalle() {

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];


    const contador =
        document.querySelector(
            "#cantidad-carrito"
        );


    if (!contador) {
        return;
    }


    let total = 0;


    carrito.forEach(function(producto) {

        total += producto.cantidad;

    });


    contador.textContent =
        total;

}



actualizarContadorDetalle();