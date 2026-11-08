//Declaraciones de variables
let nombre_de_ususario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let confirmar_contraseña = document.getElementById("confirmar_contraseña");
let correo_electronico = document.getElementById("email");
let formulario = document.getElementById("formulario");
let mensaje_contraseña = document.getElementById("mensaje_contraseña");
let mensaje_usuario = document.getElementById("mensaje_usuario");
let mensaje_email = document.getElementById("mensaje_email");
let mensaje_registro = document.getElementById("mensaje_registro");

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
    const nombre_usuario_trim = nombre_de_ususario.value.trim();

    if (/^[a-zA-Z0-9]{3,20}$/.test(nombre_usuario_trim) === false) {
      mensaje_usuario.textContent =
        "El nombre de usuario debe tener entre 3 y 20 caracteres";
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

function validar_email() {
  try {
    const correo_electronico_trim = correo_electronico.value.trim();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_electronico_trim) === false) {
      mensaje_email.textContent = "El correo electronico no es valido";
      mensaje_email.classList.add("textorojo");
      return false;
    } else {
      mensaje_email.textContent = "";
      return true;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

function validar_registro() {
  try {
    const contraseña_ok = validar_contraseña();
    const usuario_ok = validar_usuario();
    const email_ok = validar_email();

    if (contraseña_ok && usuario_ok && email_ok) {
      mensaje_registro.textContent = "Registro exitoso";
      mensaje_registro.classList.add("textoverde");
      return true;
    } else {
      mensaje_registro.textContent = "";
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
}


formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validar_registro()) {
    enviar_registro()
  }
});

async function enviar_registro() {
  try {
    const respuesta_del_backend = await fetch(
      "http://127.0.0.1:8000/registro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: nombre_de_ususario.value.trim(),
          email: correo_electronico.value.trim(),
          password: contraseña.value,
        }),
      },
    );

    const datos = await respuesta_del_backend.json();
    console.log(respuesta_del_backend.status, datos);
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
