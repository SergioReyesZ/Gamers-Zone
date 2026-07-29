async function registrarse(){
    
    const { data: { user } } = await db.auth.getUser();

    if (user) {
        console.log("Ya existe una sesión iniciada.");
        await db.auth.signOut();
    }

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;
    const genero = document.getElementById("genero").value;
    console.log(nombre);
    try {
        const { data, error } = await db.auth.signUp({
            email: correo,
            password: contrasena
        });

        if (error) {
            console.error("Supabase rechazó el registro:", error.message);
            if(error.message === "User already registered"){
                document.getElementById("mensaje").textContent = "Ya existe un usuario registrado con ese correo";
            }else{
                document.getElementById("mensaje").textContent = "Ocurrió un error al registrarse.";
            }
            return;
        }

        console.log("Usuario creado id: ", data.user.id);

        const id = data.user.id;

        const { data: sesion } = await db.auth.getUser();

        console.log("Usuario autenticado:", sesion.user);
        console.log("auth.uid:", sesion.user?.id);
        console.log("id que insertaré:", id);

        const { data: perfil, error: errorPerfil } = await db.from('usuario').insert({id: id, username: nombre, nombre: nombre, apellido: apellido, telefono: telefono, correo: correo, sexo: genero, tipo: "Cliente"})
        
        if (errorPerfil) {
            console.error("Error al obtener el perfil de la base de datos:", errorPerfil.message);
        } else {
            console.log("Datos ingresados a la BD correctamente");
            window.location.href = "index.html";
        }
        
    } catch (falloCritico) {
        console.error("¡El código se rompió por completo! El error es:", falloCritico);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signUp-form");
    form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
        document.getElementById("mensaje").textContent =
            "Por favor completa todos los campos obligatorios.";
        form.reportValidity(); // muestra los mensajes del navegador
        return;
    }

    await registrarse();
});
});