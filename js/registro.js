// =========================
// ELEMENTOS DEL FORMULARIO
// =========================

const formularioRegistro = document.querySelector("#form-registro");

const run = document.querySelector("#run");
const nombre = document.querySelector("#nombre-registro");
const apellido = document.querySelector("#apellido-registro");
const correo = document.querySelector("#correo-registro");
const password = document.querySelector("#password-registro");

const region = document.querySelector("#region");
const comuna = document.querySelector("#comuna");
const direccion = document.querySelector("#direccion");

const errorRun = document.querySelector("#error-run");
const errorNombre = document.querySelector("#error-nombre-registro");
const errorApellido = document.querySelector("#error-apellido-registro");
const errorCorreo = document.querySelector("#error-correo-registro");
const errorPassword = document.querySelector("#error-password-registro");
const errorRegion = document.querySelector("#error-region");
const errorComuna = document.querySelector("#error-comuna");
const errorDireccion = document.querySelector("#error-direccion");

const mensajeRegistro = document.querySelector("#mensaje-registro");



// =========================
// REGIONES Y COMUNAS
// =========================

const regiones = {

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
// CARGAR REGIONES
// =========================

function cargarRegiones() {

    region.innerHTML =
        '<option value="">Seleccione una región</option>';

    Object.keys(regiones).forEach(function(clave) {

        const opcion = document.createElement("option");

        opcion.value = clave;

        switch (clave) {

            case "arica":
                opcion.textContent = "Arica y Parinacota";
                break;

            case "tarapaca":
                opcion.textContent = "Tarapacá";
                break;

            case "antofagasta":
                opcion.textContent = "Antofagasta";
                break;

            case "atacama":
                opcion.textContent = "Atacama";
                break;

            case "coquimbo":
                opcion.textContent = "Coquimbo";
                break;

            case "valparaiso":
                opcion.textContent = "Valparaíso";
                break;

            case "metropolitana":
                opcion.textContent = "Región Metropolitana";
                break;

            case "ohiggins":
                opcion.textContent = "O'Higgins";
                break;

            case "maule":
                opcion.textContent = "Maule";
                break;

            case "nuble":
                opcion.textContent = "Ñuble";
                break;

            case "biobio":
                opcion.textContent = "Biobío";
                break;

            case "araucania":
                opcion.textContent = "La Araucanía";
                break;

            case "losrios":
                opcion.textContent = "Los Ríos";
                break;

            case "loslagos":
                opcion.textContent = "Los Lagos";
                break;

            case "aysen":
                opcion.textContent = "Aysén";
                break;

            case "magallanes":
                opcion.textContent = "Magallanes";
                break;

        }

        region.appendChild(opcion);

    });

}


cargarRegiones();



// =========================
// CAMBIAR COMUNAS
// =========================

region.addEventListener("change", function() {

    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada = region.value;


    if (regionSeleccionada === "") {
        return;
    }


    regiones[regionSeleccionada].forEach(function(nombreComuna) {

        const opcion = document.createElement("option");

        opcion.value = nombreComuna;

        opcion.textContent = nombreComuna;

        comuna.appendChild(opcion);

    });

});



// =========================
// VALIDAR RUN
// =========================

function validarRun(runIngresado) {

    const runLimpio = runIngresado
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/-/g, "");


    if (!/^\d{6,8}[0-9K]$/.test(runLimpio)) {
        return false;
    }


    const cuerpo = runLimpio.slice(0, -1);

    const digitoIngresado = runLimpio.slice(-1);


    let suma = 0;

    let multiplicador = 2;


    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador === 8) {
            multiplicador = 2;
        }

    }


    const resultado = 11 - (suma % 11);

    let digitoCorrecto;


    if (resultado === 11) {

        digitoCorrecto = "0";

    } else if (resultado === 10) {

        digitoCorrecto = "K";

    } else {

        digitoCorrecto = String(resultado);

    }


    return digitoIngresado === digitoCorrecto;
}



// =========================
// REGISTRAR USUARIO
// =========================

formularioRegistro.addEventListener("submit", function(evento) {

    evento.preventDefault();


    // Limpiar errores
    errorRun.textContent = "";
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorPassword.textContent = "";
    errorRegion.textContent = "";
    errorComuna.textContent = "";
    errorDireccion.textContent = "";

    mensajeRegistro.textContent = "";


    let formularioValido = true;


    // =========================
    // RUN
    // =========================

    const runIngresado = run.value.trim().toUpperCase();


    if (runIngresado === "") {

        errorRun.textContent = "El RUN es obligatorio";

        formularioValido = false;

    } else if (runIngresado.includes(".") || runIngresado.includes("-")) {

        errorRun.textContent =
            "Ingrese el RUN sin puntos ni guion";

        formularioValido = false;

    } else if (
        runIngresado.length < 7 ||
        runIngresado.length > 9
    ) {

        errorRun.textContent =
            "El RUN debe tener entre 7 y 9 caracteres";

        formularioValido = false;

    } else if (!validarRun(runIngresado)) {

        errorRun.textContent =
            "El RUN ingresado no es válido";

        formularioValido = false;

    }



    // =========================
    // NOMBRE
    // =========================

    if (nombre.value.trim() === "") {

        errorNombre.textContent =
            "El nombre es obligatorio";

        formularioValido = false;

    } else if (nombre.value.trim().length > 50) {

        errorNombre.textContent =
            "El nombre no puede superar 50 caracteres";

        formularioValido = false;

    }



    // =========================
    // APELLIDOS
    // =========================

    if (apellido.value.trim() === "") {

        errorApellido.textContent =
            "Los apellidos son obligatorios";

        formularioValido = false;

    } else if (apellido.value.trim().length > 100) {

        errorApellido.textContent =
            "Los apellidos no pueden superar 100 caracteres";

        formularioValido = false;

    }



    // =========================
    // CORREO
    // =========================

    const email = correo.value.trim().toLowerCase();


    if (email === "") {

        errorCorreo.textContent =
            "El correo es obligatorio";

        formularioValido = false;

    } else if (email.length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar 100 caracteres";

        formularioValido = false;

    } else if (
        !email.endsWith("@duoc.cl") &&
        !email.endsWith("@profesor.duoc.cl") &&
        !email.endsWith("@gmail.com")
    ) {

        errorCorreo.textContent =
            "Utilice correo @duoc.cl, @profesor.duoc.cl o @gmail.com";

        formularioValido = false;

    }



    // =========================
    // CONTRASEÑA
    // =========================

    if (password.value === "") {

        errorPassword.textContent =
            "La contraseña es obligatoria";

        formularioValido = false;

    } else if (
        password.value.length < 4 ||
        password.value.length > 10
    ) {

        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";

        formularioValido = false;

    }



    // =========================
    // REGION
    // =========================

    if (region.value === "") {

        errorRegion.textContent =
            "Debe seleccionar una región";

        formularioValido = false;

    }



    // =========================
    // COMUNA
    // =========================

    if (comuna.value === "") {

        errorComuna.textContent =
            "Debe seleccionar una comuna";

        formularioValido = false;

    }



    // =========================
    // DIRECCION
    // =========================

    if (direccion.value.trim() === "") {

        errorDireccion.textContent =
            "La dirección es obligatoria";

        formularioValido = false;

    } else if (direccion.value.trim().length > 300) {

        errorDireccion.textContent =
            "La dirección no puede superar 300 caracteres";

        formularioValido = false;

    }



    // =========================
    // SI EXISTEN ERRORES
    // =========================

    if (!formularioValido) {
        return;
    }



    // =========================
    // OBTENER USUARIOS
    // =========================

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];



    // =========================
    // EVITAR RUN REPETIDO
    // =========================

    const runExiste = usuarios.some(function(usuario) {

        return usuario.run === runIngresado;

    });


    if (runExiste) {

        errorRun.textContent =
            "Este RUN ya se encuentra registrado";

        return;
    }



    // =========================
    // EVITAR CORREO REPETIDO
    // =========================

    const correoExiste = usuarios.some(function(usuario) {

        return usuario.correo === email;

    });


    if (correoExiste) {

        errorCorreo.textContent =
            "Este correo ya se encuentra registrado";

        return;
    }



    // =========================
    // CREAR USUARIO
    // =========================

    const nuevoUsuario = {

        run: runIngresado,

        nombre: nombre.value.trim(),

        apellido: apellido.value.trim(),

        correo: email,

        password: password.value,

        fechaNacimiento:
            document.querySelector("#fecha-nacimiento").value,

        region: region.value,

        comuna: comuna.value,

        direccion: direccion.value.trim(),

        tipoUsuario: "cliente"

    };



    // =========================
    // GUARDAR EN LOCALSTORAGE
    // =========================

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    mensajeRegistro.textContent =
        "Usuario registrado correctamente";


    formularioRegistro.reset();


    comuna.innerHTML =
        '<option value="">Seleccione primero una región</option>';

});