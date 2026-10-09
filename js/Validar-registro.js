//Declaraciones de variables
let nombre_de_ususario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let confirmar_contraseña = document.getElementById("confirmar_contraseña");
let correo_electronico = document.getElementById("email");
let formulario = document.getElementById("formulario");
let mensaje_contraseña = document.getElementById("mensaje_contraseña");
let mensaje_usuario = document.getElementById("mensaje_usuario");
let mensaje_email = document.getElementById("mensaje_email")

function validar_contraseña() {
  try {
    if (contraseña.value === confirmar_contraseña.value) {
      mensaje_contraseña.textContent = "";
      return true;
    } else {
      mensaje_contraseña.textContent = "las contraseñas no coinciden";
      mensaje_contraseña.classList.add("textorojo");
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

function validar_usuario() {
  try {
    nombre_usuario_trim = nombre_de_ususario.value.trim();
    
    if (/^[a-zA-Z0-9]{3-20}$/.test(nombre_usuario_trim) === false) {
        mensaje_usuario.textContent = "El nombre de usuario debe tener entre 3 y 20 caracteres";
        mensaje_usuario.classList.add("textorojo");
        return false;
    } else {
        mensaje_usuario.textContent = "";
        return true;
    }


  } catch (error) {
    console.log("error", error);
    return false;
  }
}

function validar_email(){
  try {
    correo_electronico_trim = correo_electronico.value.trim()

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_electronico_trim) === false) {
      mensaje_email.textContent = "El correo electronico no es valido";
      mensaje_email.classList.add("textorojo");
      return false;
    } else {
      mensaje_email.textContent = "";
      return true;
    }


    
  } catch (error) {
    
  }
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  validar_usuario();
  validar_contraseña();
  validar_email();
});

