const slides = document.querySelectorAll(".slide");
console.log(slides);
let indiceActual = 0;

function siguienteSlide(){

    //Oculto la imagen que actualmente esta visible
    slides[indiceActual].classList.remove("active");

    //Avanzo una posicion
    indiceActual = indiceActual +1;

    //Si llegue al final vuelvo a la primera imagen
    if(indiceActual === slides.length){
        indiceActual = 0;
    }

    //Muestro la imagen correspondiente a la nuecva posicion
    slides[indiceActual].classList.add("active");
}

setInterval(siguienteSlide, 3000);
setInterval(siguienteSlide,3000);
