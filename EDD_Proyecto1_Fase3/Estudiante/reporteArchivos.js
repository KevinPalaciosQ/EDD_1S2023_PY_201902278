import { arbol_Nario } from "../JavaScript/nodo_Nario.js";
import { listaCircular, info } from "../JavaScript/ListaCircular.js";
import { MatrizDispersa } from "../JavaScript/matrizDispersa.js";


// obtiene el input de busqueda 
let globalPath = "";
const searchFile = document.getElementById("search-path");


// busca los directorios
searchFile.addEventListener("input", function (event) {
  const path = event.target.value;
  globalPath = path;
  const user = getCurrentUser();
  const directoriesMatrix = user.directories; //obtiene los directorios
  try {
    const DirectorioActual = directoriesMatrix.DirectorioActual(globalPath); //obtiene los directorios 
    const matrix = DirectorioActual.matrix; //obtiene la matriz
    const url = "https://quickchart.io/graphviz?graph=";
    const body = matrix.graphvizReport(DirectorioActual.value);
    const image = document.getElementById("image");
    image.src = url + body;
  } catch (error) {
    const url = "https://quickchart.io/graphviz?graph=";
    const body = 'digraph G {  node1[label="Buscando directorio..."] }';
    const image = document.getElementById("image");
    image.src = url + body;
  }
});





// seralize the N-ario
const serializeN_ario = (root) => {
  if (root) {
    // serialize the N-ario
    const NaryTree = Object.assign(new arbol_Nario(), root);
    // convert root matrix
    const matrixConverted = serializeMatrix(NaryTree.root.matrix);
    NaryTree.root.matrix = matrixConverted;
    // change nested matrix
    const changeNestedMatrix = (node) => {
      if (node) {
        if (node.matrix) {
          const matrixConverted = serializeMatrix(node.matrix);
          node.matrix = matrixConverted;
        }
        if (node.first) {
          changeNestedMatrix(node.first);
        }
        if (node.next) {
          changeNestedMatrix(node.next);
        }
      }
    };
    changeNestedMatrix(NaryTree.root.first);

    return NaryTree;
  }
  return null;
};

// serialize the Matrix
const serializeMatrix = (matrixToParse) => {
  if (matrixToParse) {
    //if the root is an Object type
    const matrix = new MatrizDispersa();
    const files = matrixToParse.convertedFiles;
    const permisions = matrixToParse.permisos;

    files.forEach((file) => {
      matrix.insertFile(file.file_name, file.num, file.content);
    });

    permisions.forEach((permission) => {
      matrix.setPermission(
        permission.file_name,
        permission.carnet,
        permission.permission
      );
    });
    return matrix;
  }
  return null;
};

// seralize the listaCircular
const serializeCircularLinkedList = (root) => {
  if (root) {
    // if the root is an array
    if (Array.isArray(root)) {
      const circularLinkedList = new listaCircular();
      root.forEach((node) => {
        circularLinkedList.append(node);
      });
      return circularLinkedList;
    } else {
      const circularLinkedList = Object.assign(new listaCircular(), root);
      return circularLinkedList;
    }
  }
  return null;
};

// charge the current from the local Storage
export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // serialize the N-ario
  currentUser.directories = serializeN_ario(currentUser.directories);
  // serialize the circular linked list
  currentUser.binnacle = serializeCircularLinkedList(currentUser.binnacle);
  return currentUser;
};