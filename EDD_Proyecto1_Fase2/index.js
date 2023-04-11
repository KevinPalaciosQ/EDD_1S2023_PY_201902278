//Importaciones Realizadas 
import { AVLTree } from "./JavaScript/AVL.js";
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
const tree = JSON.parse(AVLTreeJSon);
const studentsAVL = new AVLTree();
studentsAVL.raiz = tree;

// Obtiene el form de Login
const form = document.getElementById("FormInicio");

// LLama la funcion en el html
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;

  const user = {
    usuario,
    password,
  };
  if (user.usuario === "admin" && user.password === "admin") {
    alert("Bienvenido Administrador ;)");
    window.location.href = "./EDD_Proyecto1_Fase2/Administrador/Carga.html";
  } else {
    const student = studentsAVL.buscarEstudiante(user.usuario);
    if (student) {
      if (localStorage.getItem("EstudianteActual")) {
        localStorage.removeItem("EstudianteActual");
      }
      if (student.password === user.password) {
        localStorage.setItem("EstudianteActual", JSON.stringify(student));
        alert("Bienvenido Compañero: "+student.name);
        window.location.href = "./EDD_Proyecto1_Fase2/Estudiante/Dashboard.html";
      } else {
        alert("Usuario o contraseña incorrectos");
        form.reset();
      }
    } else {
      alert("Usuario o contraseña incorrectos");
      form.reset();
    }
  }
});  