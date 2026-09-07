const usuarioActivo =
    localStorage.getItem("usuarioActivo");

const botonCerrarSesion =
    document.querySelector("#cerrar-sesion");

const totalUsuarios =
    document.querySelector("#total-usuarios");

const totalProductos =
    document.querySelector("#total-productos");

const bienvenidaAdmin =
    document.querySelector("#bienvenida-admin");

const tarjetaUsuarios =
    document.querySelector("#tarjeta-usuarios");

const tarjetaResumen =
    document.querySelector("#tarjeta-resumen");


// =========================
// PROTEGER PANEL
// =========================

if (
    usuarioActivo !== "admin" &&
    usuarioActivo !== "vendedor"
) {

    alert("Acceso no autorizado");

    window.location.href =
        "sesion.html";
}


// =========================
// RESUMEN
// =========================

const usuariosResumen =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

const productosResumen =
    JSON.parse(
        localStorage.getItem("productos")
    ) || [];


if (totalUsuarios) {

    totalUsuarios.textContent =
        usuariosResumen.length;
}


if (totalProductos) {

    totalProductos.textContent =
        productosResumen.length;
}


// =========================
// ADMINISTRADOR
// =========================

if (usuarioActivo === "admin") {

    if (bienvenidaAdmin) {

        bienvenidaAdmin.textContent =
            "Bienvenido Administrador";
    }
}


// =========================
// VENDEDOR
// =========================

if (usuarioActivo === "vendedor") {

    if (bienvenidaAdmin) {

        bienvenidaAdmin.textContent =
            "Bienvenido Vendedor";
    }


    if (tarjetaUsuarios) {

        tarjetaUsuarios.style.display =
            "none";
    }


    if (tarjetaResumen) {

        tarjetaResumen.style.display =
            "none";
    }
}


// =========================
// CERRAR SESION
// =========================

if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "usuarioActivo"
            );

            localStorage.removeItem(
                "usuarioSesion"
            );

            window.location.href =
                "sesion.html";
        }
    );
}