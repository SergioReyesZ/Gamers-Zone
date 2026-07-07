
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

//Abrir cuenta
const abrircuenta = document.querySelector("#botonCuenta");
const navecuenta = document.querySelector("#navCuenta");

//Filtro
const abrirfiltro = document.querySelector("#boton-filtrar");
const divFiltro = document.querySelector('#filtro');

let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const fecha = new Date();
const dia = fecha.getDate();
const diasemana = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];
const ano = fecha.getFullYear();

const fechaActual = document.getElementById("fecha");
fechaActual.innerText = `${diasemana} ${dia} de ${mes} del ${ano}`;

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'F2') {
        nav.classList.toggle("visible");
        if (nav.classList != "visible"){
            listaNav.classList.remove("ocultar");
            inputDatos.classList.remove("visible");
            tituloNav.textContent = textoOriginal;
        }
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        evento.preventDefault(); 

        nav.classList.remove("visible");
        navecuenta.classList.remove("visible");
        divFiltro.classList.remove("visible");
        listaNav.classList.remove("ocultar");
        inputDatos.classList.remove("visible");
        tituloNav.textContent = textoOriginal;
    }
});

//Menu hamburguesa
abrir.addEventListener("click", (evento) =>
{   
evento.stopPropagation(); 
nav.classList.add("visible");
}
);

cerrar.addEventListener("click", () =>
{
nav.classList.remove("visible");
}
);

//Click afuera de los menus
document.addEventListener("click", (evento) =>{
    if(nav.classList.contains("visible") && !nav.contains(evento.target)){
        nav.classList.remove("visible");
        listaNav.classList.remove("ocultar");
        inputDatos.classList.remove("visible");
        tituloNav.textContent = textoOriginal;
    }

    if (navecuenta.classList.contains("visible") && !navecuenta.contains(evento.target)) {
        navecuenta.classList.remove("visible");
    }
});

//Función para que el menú desplegable esconda sus elementos para guardar datos del cliente dentro del mismo
//espacio

const listaNav = document.querySelector('#nav-list');
const tituloNav = document.querySelector('#titulo');
const abrirDatoscliente = document.querySelector('#abrirDatoscliente');
const inputDatos = document.querySelector('#Input-datos');
const textoOriginal = tituloNav.textContent;
const volver = document.querySelector('#regresar');
const borrar = document.querySelector('#borrar');

abrirDatoscliente.addEventListener('click', ()=>{
    tituloNav.textContent="Guardar datos del cliente";
    listaNav.classList.add("ocultar");
    inputDatos.classList.add("visible");
})

volver.addEventListener('click', ()=>{
    tituloNav.textContent = textoOriginal;
    listaNav.classList.remove("ocultar");
    inputDatos.classList.remove("visible");
})


//Funcion para vaciar los inputs

borrar.addEventListener('click', ()=>{
    document.getElementById('DatosCliente').reset();
})