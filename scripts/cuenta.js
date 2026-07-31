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
        .then(async (data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            // Una vez que el HTML ya existe en la página, se ejecutan las funciones del menú:
            inicializarMenu();
            marcarPaginaActiva();

            await actualizarCuenta();
        });
});


function inicializarMenu() {
    const menu = document.querySelector('#principal');
    menu.classList.add("ocultar");

    const menuSwitch = document.querySelector('#menu');
    menuSwitch.classList.add("switch")
    
    const menuTel = document.querySelector('#menu-telefono');
    menuTel.classList.add("switch");

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

const editar = document.getElementById("editar");
const cont = document.querySelector(".contenedor-principal");
const contEdit = document.querySelector(".contenedor-principal.editar-info");
const volver = document.getElementById("volver");

editar.addEventListener("click", ()=>{
    cont.classList.add("ocultar");
    contEdit.classList.add("visible");
});

volver.addEventListener("click", ()=>{
    cont.classList.remove("ocultar");
    contEdit.classList.remove("visible");
})

const divInputFoto = document.getElementById("divInputFoto");
const inputFoto = document.getElementById("inputFoto");

divInputFoto.addEventListener("click", ()=>{
    inputFoto.click();
});

mostrarInfo();
async function mostrarInfo() {
    const { data: { user } } = await db.auth.getUser();

    if (user) {
        const { data } = await db
        .from("usuario")
        .select("*")
        .eq("id", user.id)
        .single();
        
        document.getElementById("formCorreo").placeholder = user.email;
        document.getElementById("formTelefono").placeholder = data.telefono;
        document.getElementById("inicial").textContent = data.nombre[0];
        document.getElementById("nombre").textContent = data.username + " " + data.apellido;
        document.getElementById("usuario").textContent = data.nombre;
        document.getElementById("tipo").textContent = data.tipo;
        document.getElementById("correo").textContent = user.email;
        document.getElementById("telefono").textContent = data.telefono;
        if(data.sexo === "M"){
            document.getElementById("genero").textContent = "Masculino"; 
        }else{
            document.getElementById("genero").textContent = "Femenino"; 
        }
        if (data.avatar) {
            document.getElementById("foto").src = data.avatar;
        } else {
            document.getElementById("foto").src = "iconos/default.png";
        }
        
    }else{
        document.getElementById("foto").src = "iconos/default.png";
        console.log("No hay datos, Inicie sesión.");
    }
}

inputFoto.addEventListener("change", async (evento)=>{
    if(evento.target.files.length > 0){
        console.log("Subiendo archivo");
        await cambiarFoto();
    }
});

async function cambiarFoto() {
    
    const { data: { user } } = await db.auth.getUser();
    
    if (user) {
        const archivoFisico = inputFoto.files[0]; 
        if (!archivoFisico) {
            console.error("No se seleccionó ningún archivo");
            return;
        }
        const rutaArchivo = `${user.id}/${archivoFisico.name}`;

        const { data: perfil, error: errorPerfil } = await db.storage.from('usuarios').upload(rutaArchivo, archivoFisico,{upsert: true})
        if (errorPerfil) {
        console.error("Error al subir:", errorPerfil.message);
        } else {
            console.log("¡Foto actualizada con éxito!", perfil);
            const { publicUrl } = db.storage.from('usuarios').getPublicUrl(rutaArchivo).data;

            console.log("URL generada para guardar:", publicUrl);

            // 3. Guardar el String de la URL en la columna 'avatar' de tu tabla
            const { error: dbError } = await db
                .from('usuario')
                .update({ avatar: publicUrl })
                .eq('id', user.id);

            if (dbError) {
                console.error("Error al actualizar la tabla usuario:", dbError.message);
            } else {
                console.log("¡Base de datos actualizada con éxito!");
                await mostrarInfo();
            }
        }
    }else{
        console.log("No hay datos inicie sesión")
    }
}