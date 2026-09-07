const rolUsuarioAdmin =
    localStorage.getItem("usuarioActivo");


if (rolUsuarioAdmin !== "admin") {

    alert(
        "Acceso permitido solo para administradores"
    );

    window.location.href =
        "admin.html";
}
const formularioUsuario =
    document.querySelector("#form-admin-usuario");

const tablaUsuarios =
    document.querySelector("#tabla-usuarios");

const indiceUsuario =
    document.querySelector("#indice-usuario");

const runUsuario =
    document.querySelector("#admin-run");

const nombreUsuario =
    document.querySelector("#admin-nombre");

const apellidoUsuario =
    document.querySelector("#admin-apellido");

const correoUsuario =
    document.querySelector("#admin-correo");

const passwordUsuario =
    document.querySelector("#admin-password");

const fechaUsuario =
    document.querySelector("#admin-fecha");

const tipoUsuario =
    document.querySelector("#admin-tipo");

const regionUsuario =
    document.querySelector("#admin-region");

const comunaUsuario =
    document.querySelector("#admin-comuna");

const direccionUsuario =
    document.querySelector("#admin-direccion");

const mensajeUsuario =
    document.querySelector("#mensaje-admin-usuario");

const tituloFormulario =
    document.querySelector("#titulo-form-usuario");

const botonCancelar =
    document.querySelector("#cancelar-edicion");


// ERRORES

const errorRun =
    document.querySelector("#error-admin-run");

const errorNombre =
    document.querySelector("#error-admin-nombre");

const errorApellido =
    document.querySelector("#error-admin-apellido");

const errorCorreo =
    document.querySelector("#error-admin-correo");

const errorPassword =
    document.querySelector("#error-admin-password");

const errorTipo =
    document.querySelector("#error-admin-tipo");

const errorRegion =
    document.querySelector("#error-admin-region");

const errorComuna =
    document.querySelector("#error-admin-comuna");

const errorDireccion =
    document.querySelector("#error-admin-direccion");


let usuariosAdmin =
    JSON.parse(localStorage.getItem("usuarios")) || [];



// =========================
// REGIONES Y COMUNAS
// =========================

const regionesAdmin = {

    arica: [
        "Arica",
        "Putre"
    ],

    tarapaca: [
        "Iquique",
        "Alto Hospicio"
    ],

    antofagasta: [
        "Antofagasta",
        "Calama",
        "Tocopilla"
    ],

    atacama: [
        "Copiapó",
        "Caldera",
        "Vallenar"
    ],

    coquimbo: [
        "La Serena",
        "Coquimbo",
        "Ovalle"
    ],

    valparaiso: [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    metropolitana: [
        "Cerrillos",
        "Maipú",
        "Santiago",
        "Pudahuel",
        "Estación Central",
        "Las Condes"
    ],

    ohiggins: [
        "Rancagua",
        "Machalí",
        "San Fernando"
    ],

    maule: [
        "Talca",
        "Curicó",
        "Linares"
    ],

    nuble: [
        "Chillán",
        "Chillán Viejo"
    ],

    biobio: [
        "Concepción",
        "Talcahuano",
        "Los Ángeles"
    ],

    araucania: [
        "Temuco",
        "Padre Las Casas",
        "Villarrica"
    ],

    losrios: [
        "Valdivia",
        "La Unión",
        "Río Bueno"
    ],

    loslagos: [
        "Puerto Montt",
        "Osorno",
        "Castro"
    ],

    aysen: [
        "Coyhaique",
        "Puerto Aysén"
    ],

    magallanes: [
        "Punta Arenas",
        "Puerto Natales"
    ]

};



// =========================
// NOMBRES DE REGIONES
// =========================

const nombresRegiones = {

    arica: "Arica y Parinacota",
    tarapaca: "Tarapacá",
    antofagasta: "Antofagasta",
    atacama: "Atacama",
    coquimbo: "Coquimbo",
    valparaiso: "Valparaíso",
    metropolitana: "Región Metropolitana",
    ohiggins: "O'Higgins",
    maule: "Maule",
    nuble: "Ñuble",
    biobio: "Biobío",
    araucania: "La Araucanía",
    losrios: "Los Ríos",
    loslagos: "Los Lagos",
    aysen: "Aysén",
    magallanes: "Magallanes"

};



// =========================
// CARGAR REGIONES
// =========================

function cargarRegionesAdmin() {

    regionUsuario.innerHTML =
        '<option value="">Seleccione una región</option>';


    Object.keys(regionesAdmin).forEach(function(clave) {

        const opcion =
            document.createElement("option");

        opcion.value =
            clave;

        opcion.textContent =
            nombresRegiones[clave];

        regionUsuario.appendChild(opcion);

    });

}


cargarRegionesAdmin();



// =========================
// CARGAR COMUNAS
// =========================

function cargarComunasAdmin(regionSeleccionada) {

    comunaUsuario.innerHTML =
        '<option value="">Seleccione una comuna</option>';


    if (
        regionSeleccionada === "" ||
        !regionesAdmin[regionSeleccionada]
    ) {

        return;

    }


    regionesAdmin[regionSeleccionada]
        .forEach(function(nombreComuna) {

            const opcion =
                document.createElement("option");

            opcion.value =
                nombreComuna;

            opcion.textContent =
                nombreComuna;

            comunaUsuario.appendChild(opcion);

        });

}



regionUsuario.addEventListener(
    "change",
    function() {

        cargarComunasAdmin(
            regionUsuario.value
        );

    }
);



// =========================
// VALIDAR RUN CHILENO
// =========================

function validarRunAdmin(runIngresado) {

    const runLimpio =
        runIngresado
            .toUpperCase()
            .replace(/\./g, "")
            .replace(/-/g, "");


    if (
        !/^\d{6,8}[0-9K]$/.test(runLimpio)
    ) {

        return false;

    }


    const cuerpo =
        runLimpio.slice(0, -1);

    const digitoIngresado =
        runLimpio.slice(-1);


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) *
            multiplicador;


        multiplicador++;


        if (multiplicador === 8) {

            multiplicador = 2;

        }

    }


    const resultado =
        11 - (suma % 11);


    let digitoCorrecto;


    if (resultado === 11) {

        digitoCorrecto = "0";

    } else if (resultado === 10) {

        digitoCorrecto = "K";

    } else {

        digitoCorrecto =
            String(resultado);

    }


    return (
        digitoIngresado ===
        digitoCorrecto
    );

}



// =========================
// LIMPIAR ERRORES
// =========================

function limpiarErroresUsuario() {

    errorRun.textContent = "";
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorPassword.textContent = "";
    errorTipo.textContent = "";
    errorRegion.textContent = "";
    errorComuna.textContent = "";
    errorDireccion.textContent = "";

    mensajeUsuario.textContent = "";

}



// =========================
// MOSTRAR USUARIOS
// =========================

function mostrarUsuarios() {

    tablaUsuarios.innerHTML = "";


    if (usuariosAdmin.length === 0) {

        tablaUsuarios.innerHTML = `

            <tr>

                <td colspan="6">
                    No existen usuarios registrados
                </td>

            </tr>

        `;

        return;

    }


    usuariosAdmin.forEach(
        function(usuario, indice) {

            const fila =
                document.createElement("tr");


            const nombreCompleto =
                usuario.nombre +
                " " +
                usuario.apellido;


            const regionNombre =
                nombresRegiones[
                    usuario.region
                ] ||
                usuario.region ||
                "Sin región";


            fila.innerHTML = `

                <td>
                    ${usuario.run}
                </td>

                <td>
                    ${nombreCompleto}
                </td>

                <td>
                    ${usuario.correo}
                </td>

                <td>
                    ${usuario.tipoUsuario}
                </td>

                <td>
                    ${regionNombre}
                </td>

                <td>

                    <button type="button"
                            class="ver-usuario"
                            data-indice="${indice}">
                        Ver
                    </button>

                    <button type="button"
                            class="editar-usuario"
                            data-indice="${indice}">
                        Editar
                    </button>

                    <button type="button"
                            class="eliminar-usuario"
                            data-indice="${indice}">
                        Eliminar
                    </button>

                </td>

            `;


            tablaUsuarios.appendChild(
                fila
            );

        }
    );


    activarBotonesUsuarios();

}



// =========================
// GUARDAR USUARIOS
// =========================

function guardarUsuarios() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuariosAdmin)
    );


    mostrarUsuarios();

}



// =========================
// CREAR / EDITAR
// =========================

formularioUsuario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        limpiarErroresUsuario();


        let formularioValido =
            true;


        const run =
            runUsuario
                .value
                .trim()
                .toUpperCase();


        const nombre =
            nombreUsuario
                .value
                .trim();


        const apellido =
            apellidoUsuario
                .value
                .trim();


        const correo =
            correoUsuario
                .value
                .trim()
                .toLowerCase();


        const password =
            passwordUsuario.value;


        const fechaNacimiento =
            fechaUsuario.value;


        const tipo =
            tipoUsuario.value;


        const region =
            regionUsuario.value;


        const comuna =
            comunaUsuario.value;


        const direccion =
            direccionUsuario
                .value
                .trim();



        // =========================
        // RUN
        // =========================

        if (run === "") {

            errorRun.textContent =
                "El RUN es obligatorio";

            formularioValido =
                false;

        } else if (
            run.includes(".") ||
            run.includes("-")
        ) {

            errorRun.textContent =
                "Ingrese el RUN sin puntos ni guion";

            formularioValido =
                false;

        } else if (
            run.length < 7 ||
            run.length > 9
        ) {

            errorRun.textContent =
                "El RUN debe tener entre 7 y 9 caracteres";

            formularioValido =
                false;

        } else if (
            !validarRunAdmin(run)
        ) {

            errorRun.textContent =
                "El RUN ingresado no es válido";

            formularioValido =
                false;

        }



        // =========================
        // NOMBRE
        // =========================

        if (nombre === "") {

            errorNombre.textContent =
                "El nombre es obligatorio";

            formularioValido =
                false;

        } else if (
            nombre.length > 50
        ) {

            errorNombre.textContent =
                "Máximo 50 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // APELLIDOS
        // =========================

        if (apellido === "") {

            errorApellido.textContent =
                "Los apellidos son obligatorios";

            formularioValido =
                false;

        } else if (
            apellido.length > 100
        ) {

            errorApellido.textContent =
                "Máximo 100 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // CORREO
        // =========================

        if (correo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio";

            formularioValido =
                false;

        } else if (
            correo.length > 100
        ) {

            errorCorreo.textContent =
                "Máximo 100 caracteres";

            formularioValido =
                false;

        } else if (
            !correo.endsWith("@duoc.cl") &&
            !correo.endsWith("@profesor.duoc.cl") &&
            !correo.endsWith("@gmail.com")
        ) {

            errorCorreo.textContent =
                "Correo permitido: @duoc.cl, @profesor.duoc.cl o @gmail.com";

            formularioValido =
                false;

        }



        // =========================
        // CONTRASEÑA
        // =========================

        if (password === "") {

            errorPassword.textContent =
                "La contraseña es obligatoria";

            formularioValido =
                false;

        } else if (
            password.length < 4 ||
            password.length > 10
        ) {

            errorPassword.textContent =
                "Debe tener entre 4 y 10 caracteres";

            formularioValido =
                false;

        }



        // =========================
        // TIPO USUARIO
        // =========================

        if (tipo === "") {

            errorTipo.textContent =
                "Debe seleccionar un tipo de usuario";

            formularioValido =
                false;

        }



        // =========================
        // REGION
        // =========================

        if (region === "") {

            errorRegion.textContent =
                "Debe seleccionar una región";

            formularioValido =
                false;

        }



        // =========================
        // COMUNA
        // =========================

        if (comuna === "") {

            errorComuna.textContent =
                "Debe seleccionar una comuna";

            formularioValido =
                false;

        }



        // =========================
        // DIRECCION
        // =========================

        if (direccion === "") {

            errorDireccion.textContent =
                "La dirección es obligatoria";

            formularioValido =
                false;

        } else if (
            direccion.length > 300
        ) {

            errorDireccion.textContent =
                "Máximo 300 caracteres";

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
            indiceUsuario.value === ""
                ? -1
                : Number(indiceUsuario.value);



        // =========================
        // RUN REPETIDO
        // =========================

        const runExiste =
            usuariosAdmin.some(
                function(usuario, indice) {

                    return (
                        usuario.run === run &&
                        indice !== indiceActual
                    );

                }
            );


        if (runExiste) {

            errorRun.textContent =
                "Este RUN ya se encuentra registrado";

            return;

        }



        // =========================
        // CORREO REPETIDO
        // =========================

        const correoExiste =
            usuariosAdmin.some(
                function(usuario, indice) {

                    return (
                        usuario.correo === correo &&
                        indice !== indiceActual
                    );

                }
            );


        if (correoExiste) {

            errorCorreo.textContent =
                "Este correo ya se encuentra registrado";

            return;

        }



        // =========================
        // CREAR OBJETO
        // =========================

        const usuario = {

            run: run,

            nombre: nombre,

            apellido: apellido,

            correo: correo,

            password: password,

            fechaNacimiento:
                fechaNacimiento,

            tipoUsuario:
                tipo,

            region:
                region,

            comuna:
                comuna,

            direccion:
                direccion

        };



        // =========================
        // EDITAR
        // =========================

        if (indiceActual !== -1) {

            usuariosAdmin[indiceActual] =
                usuario;


            guardarUsuarios();


            limpiarFormulario();


            mensajeUsuario.textContent =
                "Usuario actualizado correctamente";

        }


        // =========================
        // CREAR
        // =========================

        else {

            usuariosAdmin.push(
                usuario
            );


            guardarUsuarios();


            limpiarFormulario();


            mensajeUsuario.textContent =
                "Usuario creado correctamente";

        }

    }
);



// =========================
// BOTONES
// =========================

function activarBotonesUsuarios() {


    // =========================
    // VER
    // =========================

    document
        .querySelectorAll(".ver-usuario")
        .forEach(function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const usuario =
                        usuariosAdmin[indice];


                    const region =
                        nombresRegiones[
                            usuario.region
                        ] ||
                        usuario.region ||
                        "Sin información";


                    alert(
                        "DATOS DEL USUARIO\n\n" +

                        "RUN: " +
                        usuario.run +

                        "\nNombre: " +
                        usuario.nombre +
                        " " +
                        usuario.apellido +

                        "\nCorreo: " +
                        usuario.correo +

                        "\nFecha nacimiento: " +
                        (
                            usuario.fechaNacimiento ||
                            "No registrada"
                        ) +

                        "\nRol: " +
                        usuario.tipoUsuario +

                        "\nRegión: " +
                        region +

                        "\nComuna: " +
                        (
                            usuario.comuna ||
                            "Sin información"
                        ) +

                        "\nDirección: " +
                        (
                            usuario.direccion ||
                            "Sin información"
                        )
                    );

                }
            );

        });



    // =========================
    // EDITAR
    // =========================

    document
        .querySelectorAll(".editar-usuario")
        .forEach(function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const usuario =
                        usuariosAdmin[indice];


                    runUsuario.value =
                        usuario.run || "";

                    nombreUsuario.value =
                        usuario.nombre || "";

                    apellidoUsuario.value =
                        usuario.apellido || "";

                    correoUsuario.value =
                        usuario.correo || "";

                    passwordUsuario.value =
                        usuario.password || "";

                    fechaUsuario.value =
                        usuario.fechaNacimiento || "";

                    tipoUsuario.value =
                        usuario.tipoUsuario || "";


                    regionUsuario.value =
                        usuario.region || "";


                    cargarComunasAdmin(
                        usuario.region || ""
                    );


                    comunaUsuario.value =
                        usuario.comuna || "";


                    direccionUsuario.value =
                        usuario.direccion || "";


                    indiceUsuario.value =
                        indice;


                    tituloFormulario.textContent =
                        "Editar Usuario";


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
        .querySelectorAll(".eliminar-usuario")
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
                            "¿Desea eliminar este usuario?"
                        );


                    if (!confirmar) {

                        return;

                    }


                    usuariosAdmin.splice(
                        indice,
                        1
                    );


                    guardarUsuarios();


                    mensajeUsuario.textContent =
                        "Usuario eliminado correctamente";

                }
            );

        });

}



// =========================
// LIMPIAR FORMULARIO
// =========================

function limpiarFormulario() {

    formularioUsuario.reset();


    indiceUsuario.value =
        "";


    tituloFormulario.textContent =
        "Nuevo Usuario";


    comunaUsuario.innerHTML =
        '<option value="">Seleccione primero una región</option>';

}



// =========================
// CANCELAR
// =========================

botonCancelar.addEventListener(
    "click",
    function() {

        limpiarFormulario();

        limpiarErroresUsuario();

    }
);


mostrarUsuarios();