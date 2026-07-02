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
});

//Script para el span del select

const texto = document.getElementById('texto-seleccionado');
const divCalendario = document.getElementById('div-calendario');
const inputFecha = document.getElementById('input-fecha');

divCalendario.addEventListener('click', ()=>{
    inputFecha.showPicker();
})

inputFecha.addEventListener('change', function(){
    texto.textContent = this.value;
})