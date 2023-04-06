import { AVLTree } from "./JavaScript/AVL.js";
const AVLTreeJSon = localStorage.getItem("estudianteTreeAVL");
const tree = JSON.parse(AVLTreeJSon);
const studentsAVL = new AVLTree();
studentsAVL.raiz = tree;

const form = document.getElementById('loginForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;

  const user = {
    username,
    password,
  };
  if (user.username === "admin" && user.password === "admin") {
    alert("Bienvenido Administrador ;)");
    window.location.href = './EDD_Proyecto1_Fase2/Administrador/Carga.html';
  } else {
    const estudiante = studentsAVL.BuscarEstudiante(user.username);
    if (estudiante) {
      if (localStorage.getItem("currentUser") === null) {
        if (estudiante.password === user.password) {
          localStorage.setItem("currentUser", JSON.stringify(estudiante));
          alert("Bienvenido Estudiante: "+estudiante.name);
          window.location.href = './EDD_Proyecto1_Fase2/Estudiante/index.html';
        }
      }else {
        console.log(localStorage.getItem("currentUser"));
        alert("Hay un usuario logueado");
        form.reset();
      }
    } else {
      alert("Usuario o contraseña incorrectos");
      form.reset();
    }
  }
});