//Importaciones utilizadas
import { AVLTree, userStudent } from "../JavaScript/AVL.js";
import { HashTable } from "../JavaScript/Hash.js";
import { encryptPassword } from "../JavaScript/encriptador.js";
// obtiene el form 
const form = document.getElementById("uploadForm");

// obtiene el boton 
const button = document.getElementById("changeHash");
// añade funcionalidad
button.addEventListener("click", (event) => {
  // obtiene el arbol avl del local storage 
  const avl = JSON.parse(localStorage.getItem("studentTreeAVL"));
  // assing to the avl tree
  const avlTree = new AVLTree();
  avlTree.root = avl;
  //itera del lado izquierdo y derecho del arbol 
  const listUsers = iterateAVL(avlTree.root);

  // crea una lista de promesas para encriptar el arbol 
  const encryptPromises = listUsers.map(async (user) => {
    const encryptedPassword = await encryptPassword(user.password);
    return { carnet: user.carnet.toString(), user, encryptedPassword };
  });

  // espera a que se resuelvan todas las promesas
  Promise.all(encryptPromises)
    .then((usersWithEncryptedPasswords) => {
      // crea una nueva tabla hash con las contraseñas encriptadas 
      const hashTable = new HashTable();
      usersWithEncryptedPasswords.forEach(
        ({ carnet, user, encryptedPassword }) => {
          hashTable.insert(carnet, user, encryptedPassword);
        }
      );
      // guarda la tabla hash en el local storage 
      localStorage.setItem("hashTable", JSON.stringify(hashTable));
      console.log(hashTable);
      // crea el blockchain
      const blockchain = [];
      // guarda el blockchain en el local storage
      localStorage.setItem("blockchain", JSON.stringify(blockchain));
    })
    .catch((error) => {
      console.error(error);
    });

});
// itera el nodo del arbol AVL y lo guarda en una lista 
function iterateAVL(node) {
  // crea la lista 
  const list = [];
  // función recursiva
  function iterate(node) {
    if (node != null) {
      // añade el valor 
      list.push(node.student);
      // itera por la izquierda
      iterate(node.left);
      //itera por la derecha
      iterate(node.right);
    }
  }
  // llama la función recursiva 
  iterate(node);
  // retorna la lista 
  return list;
}

const reader = new FileReader();
// añade funcionalidad 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // añade al arbol AVL
  const studentsAVL = new AVLTree();
  const file = document.getElementById("file").files[0];
  // parsea el File a json
  reader.readAsText(file);
  reader.onload = () => {
    // parsea a json
    const jsonFile = JSON.parse(reader.result);
    // inserta a los alumnos
    jsonFile["alumnos"].forEach((student) => {
      // crea un estudiante 
      const newStudent = new userStudent(
        student.nombre,
        parseInt(student.carnet),
        student.password,
        student.Carpeta_Raiz
      );
      // inserta el estudiante 
      studentsAVL.insertarValor(newStudent.carnet, newStudent);
    });
    // guarda el arbol en el local storage 
    localStorage.setItem("studentTreeAVL", JSON.stringify(studentsAVL.root));
  };
  alert("Archivo cargado correctamente");
  form.reset();
});
