let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const fecha = new Date();
const dia = fecha.getDate();
const diasemana = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];
const ano = fecha.getFullYear();

const fechaActual = document.getElementById("fecha");
fechaActual.innerText = `${diasemana} ${dia} de ${mes} del ${ano}`;

//Abrir cuenta
const abrircuenta = document.querySelector("#botonCuenta");
const navecuenta = document.querySelector("#navCuenta");

abrircuenta.addEventListener("click", (evento) =>
    {
        evento.stopPropagation();
    navecuenta.classList.toggle("visible");
}
);

//Click afuera de los menus
document.addEventListener("click", (evento) =>{
    if (navecuenta.classList.contains("visible") && !navecuenta.contains(evento.target)) {
        navecuenta.classList.remove("visible");
    }
    if (divalerta.classList.contains("visible") && !divalerta.contains(evento.target)){
        divalerta.classList.remove("visible");
    }
});


//Alerta

const carrito = document.querySelector('#abrirAlerta');
const divalerta = document.querySelector('#alert');
const cerrarAlerta = document.querySelector('#cerrarAlert');
carrito.addEventListener("click", (evento)=>{
    evento.stopPropagation();
    divalerta.classList.add("visible");
});

cerrarAlerta.addEventListener("click", ()=>{
    divalerta.classList.remove("visible");
})

//Aumentar o disminuir cantidad en alerta

function cambiarCantidad(valor) {
  const input = document.getElementById('inputCantidad');
  const nuevoValor = parseInt(input.value) + valor;
  input.value = nuevoValor;
}