// =========================
// MENU HAMBURGUESA
// =========================

const botonMenu = document.querySelector("#menu-hamburguesa");
const enlacesNav = document.querySelector("#enlaces-nav");

if (botonMenu && enlacesNav) {

    botonMenu.addEventListener("click", function() {

        enlacesNav.classList.toggle("abierto");

    });

}



// =========================
// SLIDER
// =========================

const slides = document.querySelectorAll(".slide");

let indiceActual = 0;

function siguienteSlide() {

    // Solo ejecuta el slider si existen imágenes
    if (slides.length === 0) {
        return;
    }

    // Oculto la imagen que actualmente está visible
    slides[indiceActual].classList.remove("active");

    // Avanzo una posición
    indiceActual = indiceActual + 1;

    // Si llegué al final vuelvo a la primera imagen
    if (indiceActual === slides.length) {
        indiceActual = 0;
    }

    // Muestro la nueva imagen
    slides[indiceActual].classList.add("active");
}


// Solo inicia el intervalo si existen slides
if (slides.length > 0) {

    setInterval(siguienteSlide, 3000);

}



// =========================
// CANTIDAD DEL CARRITO
// =========================

function actualizarCantidadCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.querySelector("#cantidad-carrito");

    if (!contador) {
        return;
    }

    let totalUnidades = 0;

    carrito.forEach(function(producto) {

        totalUnidades += producto.cantidad;

    });

    contador.textContent = totalUnidades;

}


actualizarCantidadCarrito();