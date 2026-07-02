
//Constantes de menú de hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

//Constantes de cuenta
const abrircuenta = document.querySelector("#botonCuenta");
const navecuenta = document.querySelector("#navCuenta");

//Constantes de fecha
let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const fecha = new Date();
const dia = fecha.getDate();
const diasemana = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];
const ano = fecha.getFullYear();

const fechaActual = document.getElementById("fecha");
fechaActual.innerText = `${diasemana} ${dia} de ${mes} del ${ano}`;

//Constantes de menus desplegables
const abrirDispo = document.querySelector('#abrirDisp');
const dispo = document.querySelector('#dispToggle');

const abrirCategoria = document.querySelector('#abrirCat');
const categoria = document.querySelector('#cat');

const abrirPrecio = document.querySelector('#abrirPrec');
const precio = document.querySelector('#prec');

const abrirAlmacenamiento = document.querySelector('#abrirAlmac');
const almacenamiento = document.querySelector('#almac');

const abrirColor = document.querySelector('#abrirColor');
const color = document.querySelector('#color');

const abrirCondicion = document.querySelector('#abrirCond');
const condicion = document.querySelector('#cond');

const abrirArticulable = document.querySelector('#abrirArti');
const articulable = document.querySelector('#artiToggle');
const pArticulable = document.querySelector('#p-arti');
const testToggle = document.querySelector('#test2');
//Evento menús desplegables

testToggle.addEventListener('click', ()=>{
    pArticulable.classList.toggle("visible");
})

abrirDispo.addEventListener('click', ()=>{
    dispo.classList.toggle("visible");    
    abrirDispo.classList.toggle("activo");
})

abrirCategoria.addEventListener('click', ()=>{
    categoria.classList.toggle("visible");
    abrirCategoria.classList.toggle("activo");
})

abrirPrecio.addEventListener('click', ()=>{
    precio.classList.toggle("visible");
    abrirPrecio.classList.toggle("activo");
})

abrirAlmacenamiento.addEventListener('click', ()=>{
    almacenamiento.classList.toggle("visible");
    abrirAlmacenamiento.classList.toggle("activo");
})

abrirColor.addEventListener('click', ()=>{
    color.classList.toggle("visible");
    abrirColor.classList.toggle("activo");
})

abrirCondicion.addEventListener('click', ()=>{
    condicion.classList.toggle("visible");
    abrirCondicion.classList.toggle("activo");
})

abrirArticulable.addEventListener('click', ()=>{
    articulable.classList.toggle("visible");
    abrirArticulable.classList.toggle("activo");
})
//Evento para menú de hamburguesa se abra al picar F2
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'F2') {
        nav.classList.toggle("visible");
    }
});


//Evento para salir de los menú con Esc
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        evento.preventDefault(); 
        nav.classList.remove("visible");
        navecuenta.classList.remove("visible");
        divalerta.classList.remove("visible");
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

//Cuenta
abrircuenta.addEventListener("click", (evento) =>
    {
        evento.stopPropagation();
    navecuenta.classList.toggle("visible");
}
);

//Click afuera de los menus
document.addEventListener("click", (evento) =>{
    if(nav.classList.contains("visible") && !nav.contains(evento.target)){
        nav.classList.remove("visible");
    }

    if (navecuenta.classList.contains("visible") && !navecuenta.contains(evento.target)) {
        navecuenta.classList.remove("visible");
    }

    if (divalerta.classList.contains("visible") && !divalerta.contains(evento.target)){
        divalerta.classList.remove("visible");
    }

});


const carrito = document.querySelector('#abrirCarrito');
const divalerta = document.querySelector('#alert');
const cerrarAlerta = document.querySelector('#cerrarAlert');
carrito.addEventListener("click", (evento)=>{
    evento.stopPropagation();
    divalerta.classList.add("visible");
});

cerrarAlerta.addEventListener("click", ()=>{
    divalerta.classList.remove("visible");
})