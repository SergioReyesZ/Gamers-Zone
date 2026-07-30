async function actualizarCuenta() {

    const { data: { user } } = await db.auth.getUser();

    if (user) {
        await mostrarUsuario(user);
    } else {
        mostrarInvitado();
    }
}
async function mostrarUsuario(user){

    const { data } = await db
        .from("usuario")
        .select("*")
        .eq("id", user.id)
        .single();

    const nav = document.getElementById("navCuenta");
    const navTel = document.getElementById("navCuentaTel");

    nav.innerHTML=  `
        <ul class="cuenta-list">
            <li class="usuario">Bienvenido ${data.username} !</li>
            <li class="lista" onclick="window.location.href='cuenta.html';"><i class="bi bi-person"></i><a>Mi cuenta</a></li>
            <li class="lista" onclick="window.location.href='configuracion.html';"><i class="bi bi-gear"></i><a>Configuración</a></li>
            <li class="lista" id=cerrarSesion><i class="bi bi-box-arrow-left"></i><a href="#" id=cerrarSesion>Cerrar sesión</a></li>
        </ul>
        `;

        document.getElementById("cerrarSesion").addEventListener("click", async ()=>{

        await db.auth.signOut();

        location.reload();

    });

    navTel.innerHTML=  `
        <ul class="cuenta-list">
            <li class="usuario">Bienvenido ${data.username} !</li>
            <li class="lista" onclick="window.location.href='cuenta.html';"><i class="bi bi-person"></i><a>Mi cuenta</a></li>
            <li class="lista" onclick="window.location.href='configuracion.html';"><i class="bi bi-gear"></i><a>Configuración</a></li>
            <li class="lista" id=cerrarSesionTel><i class="bi bi-box-arrow-left"></i><a href="#" id=cerrarSesionTel>Cerrar sesión</a></li>
        </ul>
        `;

        document.getElementById("cerrarSesionTel").addEventListener("click", async ()=>{

        await db.auth.signOut();

        location.reload();

    });
}

function mostrarInvitado(){
    const nav = document.getElementById("navCuenta");
    const navTel = document.getElementById("navCuentaTel");

    nav.innerHTML=  `
        <ul class="cuenta-list">
            <li class="lista"><i class="bi bi-box-arrow-in-right"></i><a href="login.html">Iniciar sesión</a></li>
            <li class="lista"><i class="bi bi-pencil-square"></i><a href="registro.html">Registrarse</a></li>
        </ul>
        `;

        navTel.innerHTML=  `
        <ul class="cuenta-list">
            <li class="lista"><i class="bi bi-box-arrow-in-right"></i><a href="login.html">Iniciar sesión</a></li>
            <li class="lista"><i class="bi bi-pencil-square"></i><a href="registro.html">Registrarse</a></li>
        </ul>
        `;
}
