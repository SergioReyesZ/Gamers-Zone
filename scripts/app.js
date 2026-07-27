async function login(){
    const correo = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    
    console.log("Correo:", correo);
    console.log("Contraseña:", contraseña);

    try {
        console.log("Intentando conectar con Supabase...");
        
        const { data, error } = await db.auth.signInWithPassword({
            email: correo,
            password: contraseña
        });

        if (error) {
            console.error("Supabase rechazó el login:", error.message);
            return;
        }
        
        console.log("Autenticación exitosa. Buscando el ID:", data.user.id);
        
        const id = data.user.id; 
        
        const { data: perfil, error: errorPerfil } = await db.from("usuario").select("*").eq("id", id).single();
        
        if (errorPerfil) {
            console.error("Error al obtener el perfil de la base de datos:", errorPerfil.message);
        } else {
            console.log("Datos del perfil obtenidos:", perfil);
            if (perfil.tipo === "Admin") {
                console.log("Redirigiendo al index...");
                window.location.href = "index.html";
            } else {
                console.warn("El inicio de sesión funcionó, pero el rol es:", perfil.tipo, "y no 'Empleado'");
            }
        }
        
    } catch (falloCritico) {
        console.error("¡El código se rompió por completo! El error es:", falloCritico);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async(evento)=>{
        console.log("Se envió el formulario");
        evento.preventDefault();
        await login();
    });
});