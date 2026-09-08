const formulario = document.querySelector("#form-contacto");

const nombre = document.querySelector("#nombre");

const apellido = document.querySelector("#apellido");

const correo = document.querySelector("#correo");

const telefono = document.querySelector("#telefono");

const mensaje = document.querySelector("#mensaje");


const errorNombre = document.querySelector("#error-nombre");

const errorApellido = document.querySelector("#error-apellido");

const errorCorreo = document.querySelector("#error-correo");

const errorTelefono = document.querySelector("#error-telefono");

const errorMensaje = document.querySelector("#error-mensaje");

const mensajeEnviado = document.querySelector("#mensaje-enviado");



// =========================
// LIMPIAR ERRORES
// =========================

function limpiarErroresContacto() {

    errorNombre.textContent = "";

    errorApellido.textContent = "";

    errorCorreo.textContent = "";

    errorTelefono.textContent = "";

    errorMensaje.textContent = "";

    mensajeEnviado.textContent = "";

}



// =========================
// VALIDAR CORREO
// =========================

function correoPermitido(correoIngresado) {

    const correoLimpio = correoIngresado.trim().toLowerCase(); /*asigna el correo ingresado quita espacios en blanco y lo transforma a minuscula*/

    return ( /*Verifica que el correo termine en las opciones siguientes*/

        correoLimpio.endsWith("@duoc.cl") ||

        correoLimpio.endsWith("@profesor.duoc.cl") ||

        correoLimpio.endsWith("@gmail.com")

    );

}


// =========================
// ENVIAR FORMULARIO
// =========================

formulario.addEventListener("submit",function(evento) {

        evento.preventDefault(); /*Detiene que la pagina se recargue para poder revisarla*/

        limpiarErroresContacto();


        let formularioValido = true;


        const nombreValor = nombre.value.trim();


        const apellidoValor = apellido.value.trim();


        const correoValor = correo.value.trim();


        const telefonoValor = telefono.value.trim();


        const mensajeValor = mensaje.value.trim();


        // =========================
        // NOMBRE
        // =========================

        if (nombreValor === "") {

            errorNombre.textContent = "El nombre es obligatorio";

            formularioValido = false;

        } else if (nombreValor.length > 100) {

            errorNombre.textContent = "El nombre no puede superar los 100 caracteres";

            formularioValido = false;

        }


        // =========================
        // APELLIDOS
        // =========================

        if (apellidoValor === "") {
        
            errorApellido.textContent = "El apellido es obligatorio";

            formularioValido = false;

        } else if (apellidoValor.length > 100) {

            errorApellido.textContent = "Los apellidos no pueden superar los 100 caracteres";

            formularioValido = false;

        }


        // =========================
        // CORREO
        // =========================

        if (correoValor === "") {

            errorCorreo.textContent = "El correo es obligatorio";

            formularioValido = false;

        } else if (correoValor.length > 100) {

            errorCorreo.textContent ="El correo no puede superar los 100 caracteres";

            formularioValido = false;

        } else if (!correoPermitido(correoValor)) {

            errorCorreo.textContent ="Ingrese un correo @duoc.cl, @profesor.duoc.cl o @gmail.com";

            formularioValido =false;

        }



        // =========================
        // TELEFONO
        // =========================

        if (telefonoValor === "") {

            errorTelefono.textContent ="El teléfono es obligatorio";

            formularioValido = false;

        } else if (telefonoValor.length !== 9 || isNaN(telefonoValor)) {

            errorTelefono.textContent = "Ingrese un teléfono de 9 dígitos";

            formularioValido = false;

        }



        // =========================
        // MENSAJE
        // =========================

        if (mensajeValor === "") {

            errorMensaje.textContent = "El mensaje es obligatorio";

            formularioValido = false;

        } else if (mensajeValor.length > 500) {

            errorMensaje.textContent ="El mensaje no puede superar los 500 caracteres";

            formularioValido = false;

        }



        // =========================
        // RESULTADO
        // =========================

        if (!formularioValido) {

            return;

        }


        mensajeEnviado.textContent = nombreValor + " " + apellidoValor + ", se ha enviado su mensaje correctamente";

        formulario.reset();

    }
);