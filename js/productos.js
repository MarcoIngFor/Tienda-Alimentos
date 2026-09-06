const botonesAumentar = document.querySelectorAll(".aumentar");

botonesAumentar.forEach(function(boton){
    boton.addEventListener("click",function(){
        const producto = boton.closest(".producto");
        const cantidad = producto.querySelector(".cantidad");
        let numero = parseInt(cantidad.textContent);
        numero ++;
        cantidad.textContent = numero;
    });
});