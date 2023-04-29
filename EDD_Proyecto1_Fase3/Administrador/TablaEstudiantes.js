// Importaciones utilizadas
import { AVLTree  } from "../JavaScript/AVL.js";

// Obteniendo localStorage
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
// Parsea el arbol 
const tree = JSON.parse(AVLTreeJSon);

const studentsAVL = new AVLTree();

studentsAVL.raiz = tree;

// Obteniendo la tabla
const tableBody = document.querySelector("#table-students tbody");

// InOrderTable
const setInOrderTable = () => {
  const listInOrder = studentsAVL.inOrder(studentsAVL.raiz);  
  
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

// inOrder 
const setInOrderTableButton = document.querySelector("#b-inOrder");
setInOrderTableButton.addEventListener("click", () => {

  tableBody.innerHTML = "";

  setInOrderTable();
});

// preOrder
const setPreOrderTableButton = document.querySelector("#b-preOrder");
setPreOrderTableButton.addEventListener("click", () => {

  tableBody.innerHTML = "";

  const listPreOrder = studentsAVL.preOrder(studentsAVL.raiz);
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


const setPostOrderTableButton = document.querySelector("#b-postOrder");
setPostOrderTableButton.addEventListener("click", () => {

  tableBody.innerHTML = "";

  const listPreOrder = studentsAVL.postOrder(studentsAVL.raiz);
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


// call 
setInOrderTable();