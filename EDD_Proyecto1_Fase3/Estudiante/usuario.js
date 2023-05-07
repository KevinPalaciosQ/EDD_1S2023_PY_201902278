
// Importaciones Realizadas
import { AVLTree,Node } from "../JavaScript/AVL.js";
import { arbol_Nario } from "../JavaScript/nodo_Nario.js";
import { listaCircular, info } from "../JavaScript/ListaCircular.js";
import { MatrizDispersa } from "../JavaScript/matrizDispersa.js";


// encuentra boton de entrada
let globalPath = "";
const searchFile = document.getElementById("search-file");
const creatBtn = document.getElementById("create-btn");
const deleteBtn = document.getElementById("delete-btn");
const uploadFile = document.getElementById("upload-btn");
const setPermissionsBtn = document.getElementById("set-permissions-btn");

// Dar permisos
setPermissionsBtn.addEventListener("click", function () {
  //Obteniendo inputs
  const file_name = document.getElementById("nameFile").value;
  const carnet = document.getElementById("carnetFile").value;
  const permission = document.getElementById("permissionFile").value;
  // Valindando los inputs
  if (file_name === "" || carnet === "" || permission === "")
    return alert("Todos los campos son obligatorios");
  // valida la existencia del carnet en el arbol avl
  const AVLTreeJSon = JSON.parse(localStorage.getItem("studentTreeAVL"));
  // parsea el arbol AVL 
  const studentsAVL = new AVLTree();
  studentsAVL.root = AVLTreeJSon;
  if (!studentsAVL.searchCarnet(carnet))
    return alert("El carnet no existe en la base de datos");
  // Obtiene estudiante actual
  const user = getCurrentUser();
  const directories = user.directories; // obtiene los directorios
  const DirectorioActual = directories.DirectorioActual(globalPath); 
  const matrix = DirectorioActual.matrix;
  matrix.setPermission(file_name, carnet, permission);
  // actualizamatriz
  const matrixSerialized = matrix.toJSON();
  DirectorioActual.matrix = matrixSerialized;
  // actualiza directorio
  directories.actualizarDirectorio(globalPath, DirectorioActual);
  user.directories = directories;
  const binnacleList = user.binnacle.serialize();
  user.binnacle = binnacleList;
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("Se otorgo permiso correctamente");
  // resetea los inputs
  document.getElementById("nameFile").value = "";
  document.getElementById("carnetFile").value = "";
  document.getElementById("permissionFile").value = "";
});

// actualiza el archivo
const inputElement = document.getElementById("file-upload");
inputElement.addEventListener("change", handleFiles, false);
let file_name_input = "";
let base64String = "";

function handleFiles() {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  file_name_input = event.target.files[0].name;
  reader.readAsDataURL(event.target.files[0]);
}

function onReaderLoad(event) {
  base64String = event.target.result;
}
//guarda el archivo en la matriz
uploadFile.addEventListener("click", function () {
  // Obtiene estudiante actual
  const user = getCurrentUser();
  const directories = user.directories; 
  const DirectorioActual = directories.DirectorioActual(globalPath); 
  const matrix = DirectorioActual.matrix;
  matrix.insertFile(file_name_input, 1, base64String);
  user.binnacle.append(new info(`Se creo el archivo ${file_name_input}`));
    const binnacleList = user.binnacle.serialize();
    user.binnacle = binnacleList;
  // actualiza la matriz
  const matrixSerialized = matrix.toJSON();
  DirectorioActual.matrix = matrixSerialized;
  directories.actualizarDirectorio(globalPath, DirectorioActual);
  user.directories = directories;
  localStorage.setItem("currentUser", JSON.stringify(user));
  searchFile.dispatchEvent(new Event("input"));
});

// busca en los directorios
searchFile.addEventListener("input", function (event) {
  const path = event.target.value;
  globalPath = path;
  document.getElementById("title-th").innerHTML =
    "Directorios y Archivos de " + '"' + path + '"';
  // obtiene la tabla 
  const table = document.getElementById("table-body");
  // limpia la tabla 
  table.innerHTML = "";
  // obtiene el estudiante actual 
  const user = getCurrentUser();
  const directories = user.directories.mostrarDirectorios(path);
  // si el directorio existe
  if (directories.length > 0) {
    directories.forEach((di) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        ${di}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
        </td>
        `;
      table.appendChild(row);
    });
  }
  // añade los archivos 
  try {
    const directoriesMatrix = user.directories; 
    const DirectorioActual = directoriesMatrix.DirectorioActual(globalPath);
    const matrix = DirectorioActual.matrix; 
    const fileList = matrix.makeList();
    if (fileList.length > 0) {
      // añade los archivos a la tabla 
      fileList.forEach((file) => {
        const row = document.createElement("tr");
        if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")) {
          row.innerHTML = `
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            ${file}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            </td>
            `;
        }else {
          row.innerHTML = `
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          ${file}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        
          </td>
          `;
        }
        table.appendChild(row);
      });
    }
  } catch (error) {
  }
});

// añade le directorio y lo guarda en el local storage
creatBtn.addEventListener("click", function () {
  const newDiretory = document.getElementById("new-directory").value;
  if (newDiretory === "")
    return alert("El nombre de la carpeta no puede estar vacio");
  const path = globalPath;
  const user = getCurrentUser();
  user.directories.insertarValor(path, newDiretory);
  user.binnacle.append(new info(`Se creo la carpeta ${newDiretory}`));
  const binnacleList = user.binnacle.serialize();
  user.binnacle = binnacleList;
  localStorage.setItem("currentUser", JSON.stringify(user));
  document.getElementById("new-directory").value = "";
  searchFile.dispatchEvent(new Event("input"));
});

//elimina el directorio 
deleteBtn.addEventListener("click", function () {
  // Obtiene el nombre del directorio 
  const newDiretory = document.getElementById("new-directory").value;
  if (newDiretory === "")
    return alert("Por favor nombra la carpeta");
  const path = globalPath;
  const user = getCurrentUser();
  let completePath = "";
  if (path === "/") {
    completePath = `/${newDiretory}`;
  } else {
    completePath = `${path}/${newDiretory}`;
  }
  user.directories.eliminarDirectorio(completePath);
  user.binnacle.append(new info(`Se eliminó la carpeta: ${newDiretory}`));
  const binnacleList = user.binnacle.serialize();
  user.binnacle = binnacleList;
  //Actualiza al estudiante actual 
  localStorage.setItem("currentUser", JSON.stringify(user));
  document.getElementById("new-directory").value = "";
  searchFile.dispatchEvent(new Event("input"));
});

// serealiza el N-ario
const serializeN_ario = (root) => {
  if (root) {
    const NaryTree = Object.assign(new arbol_Nario(), root);
    const matrixConverted = serializeMatrix(NaryTree.root.matrix);
    NaryTree.root.matrix = matrixConverted;
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

// serializa la Matriz
const serializeMatrix = (matrixToParse) => {
  if (matrixToParse) {
    //Si la raiz ser encuentra en el objeto 
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

// serealiza la lista circular
const serializeCircularLinkedList = (root) => {
  if (root) {
    // si raiz esta en el aArray
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

// cambia el estudiante actual en el local storage
export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // serializa el arbol N-ario
  currentUser.directories = serializeN_ario(currentUser.directories);
  // serializa la lista circular 
  currentUser.binnacle = serializeCircularLinkedList(currentUser.binnacle);
  return currentUser;
};
