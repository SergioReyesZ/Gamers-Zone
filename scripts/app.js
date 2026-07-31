const botonOjo = document.querySelector(".ojo");
const botonOjoTachado = document.querySelector(".ojo.tachado");
const inputPassword = document.getElementById("password");

botonOjo.addEventListener("click", ()=>{
    botonOjo.classList.add("ocultar");
    botonOjoTachado.classList.add("visible");
    inputPassword.type = "text";
});


    botonOjoTachado.addEventListener("click", ()=>{
        botonOjo.classList.remove("ocultar");
        botonOjoTachado.classList.remove("visible");
        inputPassword.type = "password";
    });

async function login(){
    const correo = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    
    try {
        console.log("Intentando conectar con Supabase...");
        
        const { data, error } = await db.auth.signInWithPassword({
            email: correo,
            password: contraseña
        });

        if (error) {
            console.error("Supabase rechazó el login:", error.message);
            if(error.message === "Invalid login credentials"){
                document.getElementById("mensaje").textContent = "Correo o contraseña incorrectos";
            }else{
                document.getElementById("mensaje").textContent = "Ocurrió un error al iniciar sesión";
            }
            return;
        }
        
        console.log("Autenticación exitosa. Buscando el ID:", data.user.id);
        
        const id = data.user.id; 
        
        const { data: perfil, error: errorPerfil } = await db.from("usuario").select("*").eq("id", id).single();
        
        if (errorPerfil) {
            console.error("Error al obtener el perfil de la base de datos:", errorPerfil.message);
        } else {
            console.log("Datos del perfil obtenidos:", perfil);
            if (perfil.tipo === "Admin" || true) {
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
        document.getElementById("mensaje").textContent = "";

        if (!form.checkValidity()) {
        document.getElementById("mensaje").textContent =
            "Por favor completa todos los campos obligatorios.";
        form.reportValidity(); // muestra los mensajes del navegador
        return;
        }
        
        await login();
    });
});