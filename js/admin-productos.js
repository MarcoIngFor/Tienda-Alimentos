const formularioProducto =
    document.querySelector("#form-admin-producto");

const tablaProductos =
    document.querySelector("#tabla-productos");

const indiceProducto =
    document.querySelector("#indice-producto");

const codigoProducto =
    document.querySelector("#codigo-producto");

const nombreProducto =
    document.querySelector("#nombre-producto");

const descripcionProducto =
    document.querySelector("#descripcion-producto");

const precioProducto =
    document.querySelector("#precio-producto");

const stockProducto =
    document.querySelector("#stock-producto");

const stockCriticoProducto =
    document.querySelector("#stock-critico-producto");

const categoriaProducto =
    document.querySelector("#categoria-producto");

const imagenProductoAdmin =
    document.querySelector("#imagen-producto-admin");

const mensajeProducto =
    document.querySelector("#mensaje-admin-producto");

const tituloProducto =
    document.querySelector("#titulo-form-producto");

const botonCancelarProducto =
    document.querySelector("#cancelar-producto");

const seccionFormularioProducto =
    document.querySelector("#seccion-form-producto");

const mensajeRolProducto =
    document.querySelector("#mensaje-rol-producto");


// ERRORES

const errorCodigoProducto =
    document.querySelector("#error-codigo-producto");

const errorNombreProducto =
    document.querySelector("#error-nombre-producto");

const errorDescripcionProducto =
    document.querySelector("#error-descripcion-producto");

const errorPrecioProducto =
    document.querySelector("#error-precio-producto");

const errorStockProducto =
    document.querySelector("#error-stock-producto");

const errorStockCriticoProducto =
    document.querySelector("#error-stock-critico-producto");

const errorCategoriaProducto =
    document.querySelector("#error-categoria-producto");


// PRODUCTOS

let productosAdmin =
    JSON.parse(localStorage.getItem("productos")) || [];


// ROL ACTUAL

const rolProductoActual =
    localStorage.getItem("usuarioActivo");



// =========================
// PERMISOS
// =========================

if (rolProductoActual === "vendedor") {

    seccionFormularioProducto.style.display =
        "none";

    mensajeRolProducto.textContent =
        "Modo Vendedor: puede consultar productos, pero no crear, editar ni eliminar.";

}



// =========================
// LIMPIAR ERRORES
// =========================

function limpiarErroresProducto() {

    errorCodigoProducto.textContent = "";

    errorNombreProducto.textContent = "";

    errorDescripcionProducto.textContent = "";

    errorPrecioProducto.textContent = "";

    errorStockProducto.textContent = "";

    errorStockCriticoProducto.textContent = "";

    errorCategoriaProducto.textContent = "";

    mensajeProducto.textContent = "";

}



// =========================
// MOSTRAR PRODUCTOS
// =========================

function mostrarProductosAdmin() {

    tablaProductos.innerHTML = "";


    if (productosAdmin.length === 0) {

        tablaProductos.innerHTML = `

            <tr>

                <td colspan="7">
                    No existen productos registrados
                </td>

            </tr>

        `;

        return;

    }


    productosAdmin.forEach(
        function(producto, indice) {


            const fila =
                document.createElement("tr");


            // STOCK CRITICO

            const tieneStockCritico =
                producto.stockCritico !== null &&
                producto.stockCritico !== undefined &&
                Number(producto.stock) <=
                Number(producto.stockCritico);


            if (tieneStockCritico) {

                fila.classList.add(
                    "fila-stock-critico"
                );

            }


            const textoStock =
                tieneStockCritico
                    ? `${producto.stock} ⚠`
                    : producto.stock;


            const stockCritico =
                producto.stockCritico === null ||
                producto.stockCritico === undefined
                    ? "-"
                    : producto.stockCritico;


            fila.innerHTML = `

                <td>
                    ${producto.codigo}
                </td>

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    $${Number(producto.precio)
                        .toLocaleString("es-CL")}
                </td>

                <td>
                    ${textoStock}
                </td>

                <td>
                    ${stockCritico}
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>

                    <button type="button"
                            class="ver-producto-admin"
                            data-indice="${indice}">
                        Ver
                    </button>

                    ${
                        rolProductoActual === "admin"
                        ? `

                        <button type="button"
                                class="editar-producto-admin"
                                data-indice="${indice}">
                            Editar
                        </button>

                        <button type="button"
                                class="eliminar-producto-admin"
                                data-indice="${indice}">
                            Eliminar
                        </button>

                        `
                        : ""
                    }

                </td>

            `;


            tablaProductos.appendChild(
                fila
            );

        }
    );


    activarBotonesProductos();

}



// =========================
// GUARDAR LOCALSTORAGE
// =========================

function guardarProductosAdmin() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productosAdmin)
    );


    mostrarProductosAdmin();

}



// =========================
// CREAR / EDITAR
// =========================

formularioProducto.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        limpiarErroresProducto();


        // SOLO ADMIN PUEDE MODIFICAR

        if (rolProductoActual !== "admin") {

            return;

        }


        let formularioValido =
            true;


        const codigo =
            codigoProducto.value.trim();


        const nombre =
            nombreProducto.value.trim();


        const descripcion =
            descripcionProducto.value.trim();


        const precio =
            Number(precioProducto.value);


        const stock =
            Number(stockProducto.value);


        const stockCritico =
            stockCriticoProducto.value === ""
                ? null
                : Number(
                    stockCriticoProducto.value
                );


        const categoria =
            categoriaProducto.value;


        const imagen =
            imagenProductoAdmin.value.trim();



        // =========================
        // CODIGO
        // =========================

        if (codigo === "") {

            errorCodigoProducto.textContent =
                "El código es obligatorio";

            formularioValido =
                false;

        } else if (
            codigo.length < 3
        ) {

            errorCodigoProducto.textContent =
                "El código debe tener al menos 3 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // NOMBRE
        // =========================

        if (nombre === "") {

            errorNombreProducto.textContent =
                "El nombre es obligatorio";

            formularioValido =
                false;

        } else if (
            nombre.length > 100
        ) {

            errorNombreProducto.textContent =
                "El nombre no puede superar 100 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // DESCRIPCION
        // =========================

        if (
            descripcion.length > 500
        ) {

            errorDescripcionProducto.textContent =
                "La descripción no puede superar 500 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // PRECIO
        // =========================

        if (
            precioProducto.value === ""
        ) {

            errorPrecioProducto.textContent =
                "El precio es obligatorio";

            formularioValido =
                false;

        } else if (
            precio < 0
        ) {

            errorPrecioProducto.textContent =
                "El precio debe ser igual o mayor a 0";

            formularioValido =
                false;

        }



        // =========================
        // STOCK
        // =========================

        if (
            stockProducto.value === ""
        ) {

            errorStockProducto.textContent =
                "El stock es obligatorio";

            formularioValido =
                false;

        } else if (
            stock < 0 ||
            !Number.isInteger(stock)
        ) {

            errorStockProducto.textContent =
                "El stock debe ser un número entero igual o mayor a 0";

            formularioValido =
                false;

        }



        // =========================
        // STOCK CRITICO
        // =========================

        if (
            stockCritico !== null &&
            (
                stockCritico < 0 ||
                !Number.isInteger(
                    stockCritico
                )
            )
        ) {

            errorStockCriticoProducto.textContent =
                "El stock crítico debe ser un número entero igual o mayor a 0";

            formularioValido =
                false;

        }



        // =========================
        // CATEGORIA
        // =========================

        if (categoria === "") {

            errorCategoriaProducto.textContent =
                "Debe seleccionar una categoría";

            formularioValido =
                false;

        }



        if (!formularioValido) {

            return;

        }



        // =========================
        // INDICE ACTUAL
        // =========================

        const indiceActual =
            indiceProducto.value === ""
                ? -1
                : Number(
                    indiceProducto.value
                );



        // =========================
        // CODIGO DUPLICADO
        // =========================

        const codigoExiste =
            productosAdmin.some(
                function(item, indice) {

                    return (
                        item.codigo
                            .toLowerCase() ===
                        codigo.toLowerCase() &&

                        indice !==
                        indiceActual
                    );

                }
            );


        if (codigoExiste) {

            errorCodigoProducto.textContent =
                "El código del producto ya existe";

            return;

        }



        // =========================
        // CREAR OBJETO
        // =========================

        const producto = {

            codigo: codigo,

            nombre: nombre,

            descripcion: descripcion,

            precio: precio,

            stock: stock,

            stockCritico:
                stockCritico,

            categoria:
                categoria,

            imagen:
                imagen

        };



        // =========================
        // EDITAR
        // =========================

        if (indiceActual !== -1) {

            productosAdmin[indiceActual] =
                producto;


            guardarProductosAdmin();


            limpiarFormularioProducto();


            mensajeProducto.textContent =
                "Producto actualizado correctamente";

        }


        // =========================
        // CREAR
        // =========================

        else {

            productosAdmin.push(
                producto
            );


            guardarProductosAdmin();


            limpiarFormularioProducto();


            mensajeProducto.textContent =
                "Producto creado correctamente";

        }

    }
);



// =========================
// BOTONES
// =========================

function activarBotonesProductos() {


    // =========================
    // VER
    // =========================

    document
        .querySelectorAll(
            ".ver-producto-admin"
        )
        .forEach(function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const producto =
                        productosAdmin[indice];


                    const stockCritico =
                        producto.stockCritico === null ||
                        producto.stockCritico === undefined
                            ? "No definido"
                            : producto.stockCritico;


                    const alerta =
                        producto.stockCritico !== null &&
                        producto.stockCritico !== undefined &&
                        Number(producto.stock) <=
                        Number(producto.stockCritico)
                            ? "\n\n⚠ PRODUCTO CON STOCK CRÍTICO"
                            : "";


                    alert(

                        "DATOS DEL PRODUCTO\n\n" +

                        "Código: " +
                        producto.codigo +

                        "\nNombre: " +
                        producto.nombre +

                        "\nDescripción: " +
                        (
                            producto.descripcion ||
                            "Sin descripción"
                        ) +

                        "\nPrecio: $" +
                        Number(
                            producto.precio
                        ).toLocaleString(
                            "es-CL"
                        ) +

                        "\nStock: " +
                        producto.stock +

                        "\nStock crítico: " +
                        stockCritico +

                        "\nCategoría: " +
                        producto.categoria +

                        "\nImagen: " +
                        (
                            producto.imagen ||
                            "Sin imagen"
                        ) +

                        alerta

                    );

                }
            );

        });



    // =========================
    // EDITAR
    // =========================

    document
        .querySelectorAll(
            ".editar-producto-admin"
        )
        .forEach(function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const producto =
                        productosAdmin[indice];


                    codigoProducto.value =
                        producto.codigo || "";


                    nombreProducto.value =
                        producto.nombre || "";


                    descripcionProducto.value =
                        producto.descripcion || "";


                    precioProducto.value =
                        producto.precio ?? "";


                    stockProducto.value =
                        producto.stock ?? "";


                    stockCriticoProducto.value =
                        producto.stockCritico ?? "";


                    categoriaProducto.value =
                        producto.categoria || "";


                    imagenProductoAdmin.value =
                        producto.imagen || "";


                    indiceProducto.value =
                        indice;


                    tituloProducto.textContent =
                        "Editar Producto";


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        });



    // =========================
    // ELIMINAR
    // =========================

    document
        .querySelectorAll(
            ".eliminar-producto-admin"
        )
        .forEach(function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const confirmar =
                        confirm(
                            "¿Desea eliminar este producto?"
                        );


                    if (!confirmar) {

                        return;

                    }


                    productosAdmin.splice(
                        indice,
                        1
                    );


                    guardarProductosAdmin();


                    mensajeProducto.textContent =
                        "Producto eliminado correctamente";

                }
            );

        });

}



// =========================
// LIMPIAR FORMULARIO
// =========================

function limpiarFormularioProducto() {

    formularioProducto.reset();


    indiceProducto.value =
        "";


    tituloProducto.textContent =
        "Nuevo Producto";


    limpiarErroresProducto();

}



// =========================
// CANCELAR
// =========================

botonCancelarProducto.addEventListener(
    "click",
    function() {

        limpiarFormularioProducto();

    }
);


mostrarProductosAdmin();