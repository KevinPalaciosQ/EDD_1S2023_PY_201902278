// Importaciones
import { AVLTree } from "./JavaScript/AVL.js";
import { HashTable } from "./JavaScript/Hash.js";
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
import { decryptPassword } from "./JavaScript/encriptador.js";
const tree = JSON.parse(AVLTreeJSon);
// Parsea el arbol 
const studentsAVL = new AVLTree();
studentsAVL.root = tree;
// Obteniendo form
const form = document.getElementById("FormInicio");
// Funcionalidad del Modulo
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;
  const user = {
    username,
    password,
  };
  // Si el usuario es Administrador
  if (user.username === "admin" && user.password === "admin") {
    // Redirige a Carga admin
    window.location.href = "./EDD_Proyecto1_Fase3/Administrador/Carga.html";
  } else {
    // Si el usuario es de tipo estudiante obtiene la tabla hash 
    const hashTableFill = JSON.parse(localStorage.getItem("hashTable"));

    if(hashTableFill){
      const newHashTable = new HashTable();
      newHashTable.capacity = hashTableFill.capacity;
      newHashTable.util = hashTableFill.util;
      newHashTable.table = hashTableFill.table;
      // Itera tabla hash para obtener estudiante
      const userFound = newHashTable.searchUser(user.username);
      if(!userFound) {
        alert("Usuario no encontrado");
      }else {
        // Desencripta la contraseña
        decryptPassword(userFound.password).then((decryptedPassword) => {
          if (decryptedPassword === user.password) {
            // Guarda Usuario en Local Storage
            localStorage.setItem("user", JSON.stringify(userFound));
            localStorage.setItem("currentUser", JSON.stringify(userFound.user));
            // Redirige a Estudiante
            window.location.href = "./EDD_Proyecto1_Fase3/Estudiante/Dashboard.html";
            alert("Bienvenido Compañero");
          } else {
            alert("Contraseña incorrecta");
          }
        });
      }
    }
  }
});
