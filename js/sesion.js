// =========================
// USUARIOS DE DEMOSTRACION
// =========================

function inicializarUsuariosDemo() {

    let usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    const usuariosDemo = [

        {
            run: "190110222",
            nombre: "Administrador",
            apellido: "Demo",
            correo: "admin@gmail.com",
            password: "admin123",
            fechaNacimiento: "",
            tipoUsuario: "admin",
            region: "metropolitana",
            comuna: "Cerrillos",
            direccion: "La Parada del Medio"
        },

        {
            run: "165444787",
            nombre: "Vendedor",
            apellido: "Demo",
            correo: "vendedor@gmail.com",
            password: "vende123",
            fechaNacimiento: "",
            tipoUsuario: "vendedor",
            region: "metropolitana",
            comuna: "Maipú",
            direccion: "La Parada del Medio"
        },

        {
            run: "247969802",
            nombre: "Cliente",
            apellido: "Demo",
            correo: "cliente@gmail.com",
            password: "cliente1",
            fechaNacimiento: "",
            tipoUsuario: "cliente",
            region: "metropolitana",
            comuna: "Cerrillos",
            direccion: "La Parada del Medio"
        }

    ];


    usuariosDemo.forEach(
        function(usuarioDemo) {

            const existe =
                usuarios.some(
                    function(usuario) {

                        return (
                            usuario.correo ===
                            usuarioDemo.correo
                        );

                    }
                );


            if (!existe) {

                usuarios.push(
                    usuarioDemo
                );

            }

        }
    );


    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


inicializarUsuariosDemo();

const formularioLogin =
    document.querySelector("#form-login");

const correoLogin =
    document.querySelector("#correo-login");

const passwordLogin =
    document.querySelector("#password-login");

const errorCorreoLogin =
    document.querySelector("#error-correo-login");

const errorPasswordLogin =
    document.querySelector("#error-password-login");

const mensajeLogin =
    document.querySelector("#mensaje-login");



// =========================
// VALIDAR CORREO
// =========================

function correoPermitidoLogin(correo) {

    const correoLimpio =
        correo
            .trim()
            .toLowerCase();


    return (
        correoLimpio.endsWith("@duoc.cl") ||
        correoLimpio.endsWith("@profesor.duoc.cl") ||
        correoLimpio.endsWith("@gmail.com")
    );

}



// =========================
// LIMPIAR MENSAJES
// =========================

function limpiarMensajesLogin() {

    errorCorreoLogin.textContent =
        "";

    errorPasswordLogin.textContent =
        "";

    mensajeLogin.textContent =
        "";

}



// =========================
// INICIAR SESION
// =========================

formularioLogin.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        limpiarMensajesLogin();


        let formularioValido =
            true;


        const correo =
            correoLogin
                .value
                .trim()
                .toLowerCase();


        const password =
            passwordLogin.value;



        // =========================
        // CORREO
        // =========================

        if (correo === "") {

            errorCorreoLogin.textContent =
                "Debe ingresar un correo electrónico";

            formularioValido =
                false;

        } else if (
            correo.length > 100
        ) {

            errorCorreoLogin.textContent =
                "El correo no puede superar los 100 caracteres";

            formularioValido =
                false;

        } else if (
            !correoPermitidoLogin(correo)
        ) {

            errorCorreoLogin.textContent =
                "Ingrese un correo @duoc.cl, @profesor.duoc.cl o @gmail.com";

            formularioValido =
                false;

        }



        // =========================
        // CONTRASEÑA
        // =========================

        if (password === "") {

            errorPasswordLogin.textContent =
                "Debe ingresar una contraseña";

            formularioValido =
                false;

        } else if (
            password.length < 4 ||
            password.length > 10
        ) {

            errorPasswordLogin.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres";

            formularioValido =
                false;

        }



        if (!formularioValido) {

            return;

        }



        // =========================
        // USUARIOS REGISTRADOS
        // =========================

        const usuarios =
            JSON.parse(
                localStorage.getItem("usuarios")
            ) || [];


        const usuarioEncontrado =
            usuarios.find(
                function(usuario) {

                    return (
                        usuario.correo
                            .toLowerCase() === correo &&

                        usuario.password ===
                        password
                    );

                }
            );



        // =========================
        // USUARIO ENCONTRADO
        // =========================

        if (usuarioEncontrado) {

            localStorage.setItem(
                "usuarioActivo",
                usuarioEncontrado.tipoUsuario
            );


            localStorage.setItem(
                "usuarioSesion",
                JSON.stringify(
                    usuarioEncontrado
                )
            );


            mensajeLogin.textContent =
                "Inicio de sesión correcto";


            // ADMINISTRADOR

            if (
                usuarioEncontrado.tipoUsuario ===
                "admin"
            ) {

                window.location.href =
                    "admin.html";

            }


            // VENDEDOR

            else if (
                usuarioEncontrado.tipoUsuario ===
                "vendedor"
            ) {

                window.location.href =
                    "admin.html";

            }


            // CLIENTE

            else {

                window.location.href =
                    "index.html";

            }


            return;

        }



        // =========================
        // CREDENCIALES INCORRECTAS
        // =========================

        mensajeLogin.textContent =
            "Correo o contraseña incorrectos";

    }
);