// Importaciones utilizadas 
import { AVLTree,Node } from "../JavaScript/AVL.js";
import { N_arioTree } from "../JavaScript/nodo_Nario.js";
import { CircularLinkedList, info } from "../JavaScript/ListaCircular.js";
import { SparseMatrix } from "../JavaScript/matrizDispersa.js";

let globalPath = "";
const searchFile = document.getElementById("search-file");
const creatBtn = document.getElementById("create-btn");

const deleteBtn = document.getElementById("delete-btn");
const uploadFile = document.getElementById("upload-btn");
const setPermissionsBtn = document.getElementById("set-permissions-btn");

// Da los permisos 
setPermissionsBtn.addEventListener("click", function () {
  // Obtiene inputs de las plantillas 
  const file_name = document.getElementById("nameFile").value;
  const carnet = document.getElementById("carnetFile").value;
  const permission = document.getElementById("permissionFile").value;
  // Valida los inputs
  if (file_name === "" || carnet === "" || permission === "")
    return alert("Todos los campos son obligatorios");

  const AVLTreeJSon = JSON.parse(localStorage.getItem("studentTreeAVL"));

  const studentsAVL = new AVLTree();

  studentsAVL.raiz = AVLTreeJSon;
  if (!studentsAVL.buscarCarnet(carnet))
    return alert("No se encontró Carnet :c");
 
  const user = getCurrentUser();
  const directories = user.directories; 
  const currentDirectory = directories.currentDirectory(globalPath); 

  const matrix = currentDirectory.matrix;
  matrix.setPermission(file_name, carnet, permission);

  const matrixSerialized = matrix.toJSON();
  currentDirectory.matrix = matrixSerialized;

  directories.updateDirectory(globalPath, currentDirectory);

  user.directories = directories;

  const binnacleList = user.binnacle.serialize();

  user.binnacle = binnacleList;

  localStorage.setItem("EstudianteActual", JSON.stringify(user));

  alert("Se otorgo permiso correctamente");

  document.getElementById("nameFile").value = "";
  document.getElementById("carnetFile").value = "";
  document.getElementById("permissionFile").value = "";
});

// Actualiza el documento
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
// Guarda el archivo en la matriz 
uploadFile.addEventListener("click", function () {
  // Obtiene el estudiante actual 
  const user = getCurrentUser();
  const directories = user.directories; 
  const currentDirectory = directories.currentDirectory(globalPath); 

  const matrix = currentDirectory.matrix;
  matrix.insertFile(file_name_input, 1, "data");

  user.binnacle.append(new info(`Se creo el archivo ${file_name_input}`));

    const binnacleList = user.binnacle.serialize();

    user.binnacle = binnacleList;

  const matrixSerialized = matrix.toJSON();
  currentDirectory.matrix = matrixSerialized;

  directories.updateDirectory(globalPath, currentDirectory);

  user.directories = directories;
  // Actualiza el estudiante actual 
  localStorage.setItem("EstudianteActual", JSON.stringify(user));
  searchFile.dispatchEvent(new Event("input"));
});

// Busca en los directorios 
searchFile.addEventListener("input", function (event) {
  const path = event.target.value;
  globalPath = path;

  document.getElementById("title-th").innerHTML =
    "Directorios y Archivos de " + '"' + path + '"';

  const table = document.getElementById("table-body");

  table.innerHTML = "";

  const user = getCurrentUser();
  const directories = user.directories.showDirectories(path);

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

  try {
    const directoriesMatrix = user.directories; 
    const currentDirectory = directoriesMatrix.currentDirectory(globalPath);
    const matrix = currentDirectory.matrix; 
    const fileList = matrix.makeList();
    if (fileList.length > 0) {

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


creatBtn.addEventListener("click", function () {
  const newDiretory = document.getElementById("new-directory").value;
  if (newDiretory === "")
    return alert("Por favor no olvides Nombrar la carpeta");
  const path = globalPath;
  const user = getCurrentUser();
  user.directories.insertarValor(path, newDiretory);
  user.binnacle.append(new info(`Se creo la carpeta ${newDiretory}`));
  const binnacleList = user.binnacle.serialize();
  user.binnacle = binnacleList;
  localStorage.setItem("EstudianteActual", JSON.stringify(user));
  document.getElementById("new-directory").value = "";
  searchFile.dispatchEvent(new Event("input"));
});

// Borra carpetas
deleteBtn.addEventListener("click", function () {

  const newDiretory = document.getElementById("new-directory").value;
  if (newDiretory === "")
    return alert("Por favor no olvides Nombrar la carpeta");
 
  const path = globalPath;
  const user = getCurrentUser();
  let completePath = "";
  if (path === "/") {
    completePath = `/${newDiretory}`;
  } else {
    completePath = `${path}/${newDiretory}`;
  }
  user.directories.deleteDirectory(completePath);
  user.binnacle.append(new info(`Se eliminó la carpeta: ${newDiretory}`));
  const binnacleList = user.binnacle.serialize();
  user.binnacle = binnacleList;
  localStorage.setItem("EstudianteActual", JSON.stringify(user));

  document.getElementById("new-directory").value = "";
  searchFile.dispatchEvent(new Event("input"));
});


const serializeN_ario = (raiz) => {
  if (raiz) {
    const NaryTree = Object.assign(new N_arioTree(), raiz);
    const matrixConverted = serializeMatrix(NaryTree.raiz.matrix);
    NaryTree.raiz.matrix = matrixConverted;
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
    changeNestedMatrix(NaryTree.raiz.first);

    return NaryTree;
  }
  return null;
};

const serializeMatrix = (matrixToParse) => {
  if (matrixToParse) {
    const matrix = new SparseMatrix();
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

// Selializa la  CircularLinkedList
const serializeCircularLinkedList = (raiz) => {
  if (raiz) {

    if (Array.isArray(raiz)) {
      const circularLinkedList = new CircularLinkedList();
      raiz.forEach((node) => {
        circularLinkedList.append(node);
      });
      return circularLinkedList;
    } else {
      const circularLinkedList = Object.assign(new CircularLinkedList(), raiz);
      return circularLinkedList;
    }
  }
  return null;
};

// Cambia actual en localstorage
export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("EstudianteActual"));
  currentUser.directories = serializeN_ario(currentUser.directories);
  currentUser.binnacle = serializeCircularLinkedList(currentUser.binnacle);
  return currentUser;
};
