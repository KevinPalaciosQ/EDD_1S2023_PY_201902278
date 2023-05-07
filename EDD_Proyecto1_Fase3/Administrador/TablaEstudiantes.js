// importa el arbol AVL 
import { AVLTree  } from "../JavaScript/AVL.js";

// Obtiene el arbol del local storage
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
// parsea el arbol
const tree = JSON.parse(AVLTreeJSon);
const studentsAVL = new AVLTree();
studentsAVL.root = tree;

// obtiene la tabla
const tableBody = document.querySelector("#table-students tbody");

// coloca por default la tabla inorder 
const setInOrderTable = () => {
  const listInOrder = studentsAVL.inOrder(studentsAVL.root);  
  listInOrder.forEach((node,index) => {
    const student = node.student;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.name}</td>
    `;
    tableBody.appendChild(row);
  });
}

// setea en inOrder la tabla 
const setInOrderTableButton = document.querySelector("#b-inOrder");
setInOrderTableButton.addEventListener("click", () => {
  tableBody.innerHTML = "";

  setInOrderTable();
});
// setea en preOrder la tabla 

const setPreOrderTableButton = document.querySelector("#b-preOrder");
setPreOrderTableButton.addEventListener("click", () => {

  tableBody.innerHTML = "";

  const listPreOrder = studentsAVL.preOrder(studentsAVL.root);
  listPreOrder.forEach((node,index) => {
    const student = node.student;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.name}</td>
    `;
    tableBody.appendChild(row);
  });
});

// setea en preOrder la tabla 
const setPostOrderTableButton = document.querySelector("#b-postOrder");
setPostOrderTableButton.addEventListener("click", () => {
  // Limpia la tabla 
  tableBody.innerHTML = "";
  const listPreOrder = studentsAVL.postOrder(studentsAVL.root);
  listPreOrder.forEach((node,index) => {
    const student = node.student;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${student.name}</td>
    `;
    tableBody.appendChild(row);
  });
});

setInOrderTable();