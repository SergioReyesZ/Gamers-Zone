// Cargar CSS del navbar si aún no existe
if (!document.querySelector('link[href="css/navbar.css"]')) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "css/navbar.css";
    document.head.appendChild(css);
}

function marcarPaginaActiva() {
    let paginaActual = window.location.pathname.split("/").pop();

    // Si está en la raíz, asumir index.html
    if (paginaActual === "") {
        paginaActual = "index.html";
    }

    document.querySelectorAll(".nav-bar a").forEach(link => {
        link.classList.toggle(
            "activo",
            link.getAttribute("href") === paginaActual
        );
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Carga el archivo externo navbar.html dentro del contenedor
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            // Una vez que el HTML ya existe en la página, se ejecutan las funciones del menú:
            inicializarMenu();
            marcarPaginaActiva();
        });
});



function inicializarMenu() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    //Abrir cuenta
    const abrircuenta = document.querySelector("#botonCuenta");
    const navecuenta = document.querySelector("#navCuenta");

    let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    const fecha = new Date();
    const dia = fecha.getDate();
    const diasemana = dias[fecha.getDay()];
    const mes = meses[fecha.getMonth()];
    const ano = fecha.getFullYear();

    const fechaActual = document.getElementById("fecha");
    if(fechaActual) {
        fechaActual.innerText = `${diasemana} ${dia} de ${mes} del ${ano}`;
    }

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
            listaNav.classList.remove("ocultar");
            inputDatos.classList.remove("visible");
            tituloNav.textContent = textoOriginal;
        }
    });

    //Menu hamburguesa
    abrir.addEventListener("click", (evento) => {   
        evento.stopPropagation(); 
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });

    //Cuenta
    abrircuenta.addEventListener("click", (evento) => {
        evento.stopPropagation();
        navecuenta.classList.toggle("visible");
    });

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

    //Función para que el menú desplegable esconda sus elementos para guardar datos del cliente
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
    });

    volver.addEventListener('click', ()=>{
        tituloNav.textContent = textoOriginal;
        listaNav.classList.remove("ocultar");
        inputDatos.classList.remove("visible");
    });

    //Funcion para vaciar los inputs (Movido adentro de la función inicializarMenu)
    borrar.addEventListener('click', ()=>{
        document.getElementById('DatosCliente').reset();
    });
}

//Filtro (Esto se queda afuera porque pertenece a index.html, no al navbar)
const abrirfiltro = document.querySelector("#boton-filtrar");
const divFiltro = document.querySelector('#filtro');

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        evento.preventDefault(); 
        divFiltro.classList.remove("visible");
    }
});

abrirfiltro.addEventListener('click', (evento) =>{
    evento.stopPropagation();
    divFiltro.classList.toggle("visible");
});

//Click afuera de los menus
document.addEventListener("click", (evento) =>{
    if (divFiltro.classList.contains("visible") && !divFiltro.contains(evento.target)) {
        divFiltro.classList.remove("visible");
    }
});

const borrador = document.querySelector('#remove');
const barraInput = document.querySelector('#barra');
borrador.addEventListener('click', ()=>{
        barraInput.value = '';
    });