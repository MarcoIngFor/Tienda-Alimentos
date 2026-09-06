const correoLogin = document.querySelector("#correo-login");
const passwordLogin = document.querySelector("#password-login");
const botonLogin = document.querySelector("#btn-login");

const errorCorreo = document.querySelector("#error-correo-login");
const errorPassword = document.querySelector("#error-password-login");
const mensajeLogin = document.querySelector("#mensaje-login");


botonLogin.addEventListener("click", function() {

    errorCorreo.textContent = "";
    errorPassword.textContent = "";
    mensajeLogin.textContent = "";

    const correo = correoLogin.value.trim().toLowerCase();
    const password = passwordLogin.value.trim();


    // Validación de campos vacíos
    if (correo === "") {
        errorCorreo.textContent = "Debe ingresar un correo electrónico";
        return;
    }

    if (password === "") {
        errorPassword.textContent = "Debe ingresar una contraseña";
        return;
    }


    // Usuario administrador
    if (
        correo === "admin@laparadadelmedio.cl" &&
        password === "admin123"
    ) {

        localStorage.setItem("usuarioActivo", "admin");

        mensajeLogin.textContent = "Inicio de sesión como administrador";

        window.location.href = "admin.html";

    }


    // Usuario normal
    else if (
        correo === "usuario@gmail.com" &&
        password === "usuario123"
    ) {

        localStorage.setItem("usuarioActivo", "usuario");

        mensajeLogin.textContent = "Inicio de sesión correcto";

        window.location.href = "index.html";

    }


    // Datos incorrectos
    else {

        mensajeLogin.textContent = "Correo o contraseña incorrectos";

    }

});