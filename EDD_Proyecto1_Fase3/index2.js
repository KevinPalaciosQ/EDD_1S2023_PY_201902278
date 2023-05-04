//Importaciones Realizadas 
//import {TablaHash} from "./JavaScript/TablaHash.js";
const HASHTREEJson = localStorage.getItem("estudianteTablaHash")
const tHash = JSON.parse(HASHTREEJson);
const estudiantesHASH = new TablaHash();
estudiantesHASH.tabla = tHash
// Obtiene el form de Login
const form = document.getElementById("FormInicio");
console.log("hola")
// LLama la funcion en el html
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("floatingInput").value;
  const password = sha256(document.getElementById("floatingPassword").value).toString();
console.log(password)
  const user = {
    usuario,
    password,
  };
  if (user.usuario == "admin" && user.password == sha256("admin")) {
    alert("Bienvenido Administrador ;)");
    window.location.href = "./EDD_Proyecto1_Fase3/Administrador/Carga.html";
  } else {
    const student = estudiantesHASH.busquedaUsuario(user.usuario);
    if (student) {
      if (localStorage.getItem("EstudianteActual")) {
        localStorage.removeItem("EstudianteActual");
      }
      if (student.password === user.password) {
        localStorage.setItem("EstudianteActual", JSON.stringify(student));
        alert("Bienvenido Compañero: ");
        window.location.href = "./EDD_Proyecto1_Fase3/Estudiante/Dashboard.html";
      } else {
        alert("error");
        form.reset();
      }
    } else {
      alert("Usuario o contraseña incorrectos");
      form.reset();
    }
  }
});  