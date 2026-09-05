console.log("JavaScript conectado correctamente");
const formulario = document.querySelector("form");
console.log(formulario);

// Trabajo directamente con los contenedores del formulario para verificar si se encuentran llenos
const nombre = document.querySelector("#nombre"); //Variable constante que asumira el valor del contenedor de id nombre
console.log(nombre); // Me muestra por consola el valor que se encuentra en el contenedor
const errorNombre = document.querySelector("#error-nombre"); //Variable constante que asumira el valor del contenedor de id error-nombre

const apellido = document.querySelector("#apellido");
console.log(apellido);
const errorApellido = document.querySelector("#error-apellido");

const correo = document.querySelector("#correo");
console.log(correo);
const errorCorreo = document.querySelector("#error-correo");

const telefono = document.querySelector("#telefono");
console.log(telefono);
const errorTelefono = document.querySelector("#error-telefono");

const mensaje = document.querySelector("#mensaje");
console.log(mensaje);
const errorMensaje = document.querySelector("#error-mensaje");
const mensajeEnviado = document.querySelector("#mensaje-enviado");




//Programo como se comportara el formulario a realizar el evento de enviar cuando apreto el boton
formulario.addEventListener("submit",function(event){
    event.preventDefault();
    console.log("Formulario Enviado...");
    let formularioValido = true;
    
    //Validacion de Nombre
    if (nombre.value.trim() === "")
    {
        console.log("El nombre es Obligatorio");
        errorNombre.textContent="El nombre es Obligatorio";
        formularioValido = false;
    }
    else{
        console.log(nombre.value);
        errorNombre.textContent="";
    }

    //Validacion de Apellido
    if (apellido.value.trim() === "")
    {
        console.log("El apellido es Obligatorio");
        errorApellido.textContent="El apellido es Obligatorio";
        formularioValido = false;
    }
    else{
        console.log(apellido.value);
        errorApellido.textContent="";
    }

    //Validacion de Correo
    if (correo.value.trim() === "")
    {
        console.log("El correo es Obligatorio");
        errorCorreo.textContent="El correo es Obligatorio";
        formularioValido = false;
    }else if ((!correo.value.includes("@duoc.cl")) && (!correo.value.includes("@profesor.duoc.cl")) && (!correo.value.includes("@gmail.com")))
    {
        console.log("Formato Incorrecto");
        errorCorreo.textContent="Ingrese Formato Correcto: algo@duoc.cl, algo@profesor.duoc.cl, algo@gmail.com";
        formularioValido = false;
    }else{
        console.log(correo.value);
        errorCorreo.textContent="";
    }

    //Validacion de Telefono
    if (telefono.value.trim() === "")
    {
        console.log("El telefono es Obligatorio");
        errorTelefono.textContent="El telefono es Obligatorio";
        formularioValido = false;
    }else if (telefono.value.length !== 9 || isNaN(telefono.value))
    {
        console.log("Formato Incorrecto");
        errorTelefono.textContent="Ingrese Formato Correcto: 123456789";
        formularioValido = false;
    }else{
        console.log(telefono.value);
        errorTelefono.textContent="";
    }    

    //Validacion de Mensaje a Enviar
        if (mensaje.value.trim() === "")
    {
        console.log("El Mensaje es Obligatorio");
        errorMensaje.textContent="El Mensaje no puede estar vacio";
        formularioValido = false;
    }else if (mensaje.value.trim().length > 300)
    {
        console.log("Mensaje Supera Maximo Permitido");
        errorMensaje.textContent="El Mensaje no puede superar los 300 caracteres";
        formularioValido = false;
    }else{
        console.log(mensaje.value);
        errorMensaje.textContent="";
    }
    console.log("Formulario Validado",formularioValido);

    if(formularioValido){
        console.log(nombre.value+" "+apellido.value + ", Se ha enviado su mensaje");
        mensajeEnviado.textContent=nombre.value+" "+apellido.value + ", Se ha enviado su mensaje";
        formulario.reset();
    }
})

