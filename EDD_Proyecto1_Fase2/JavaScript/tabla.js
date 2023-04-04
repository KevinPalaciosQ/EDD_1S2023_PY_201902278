// import the AVL tree
import { AVLTree } from "./AVL.js";

// get from localStorage the tree
const ArbolAVLJSon = localStorage.getItem("estudianteTreeAVL");
// parse the tree
const tree = JSON.parse(ArbolAVLJSon);
// parse to AVL Tree
const estudiantesAVL = new AVLTree();
// set the raiz
estudiantesAVL.raiz = tree;

// get the table 
const tableBody = document.querySelector("#table-estudiantes tbody");

// set by default inOrder table 
const setInOrderTable = () => {
    const listInOrder = estudiantesAVL.inOrder(estudiantesAVL.raiz);
    // set the table
    listInOrder.forEach((nodo, index) => {
        const estudiante = nodo.estudiante;
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.name}</td>
    `;
        tableBody.appendChild(row);
    });
}

// set in inOrder table
const setInOrderTableButton = document.querySelector("#b-inOrder");
setInOrderTableButton.addEventListener("click", () => {
    // clear the table
    tableBody.innerHTML = "";
    // set the table
    setInOrderTable();
});

// set in preOrder table
const setPreOrderTableButton = document.querySelector("#b-preOrder");
setPreOrderTableButton.addEventListener("click", () => {
    // clear the table
    tableBody.innerHTML = "";
    // set the table
    const listPreOrder = estudiantesAVL.preOrder(estudiantesAVL.raiz);
    listPreOrder.forEach((nodo, index) => {
        const estudiante = nodo.estudiante;
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.name}</td>
    `;
        tableBody.appendChild(row);
    });
});

// set in preOrder table
const setPostOrderTableButton = document.querySelector("#b-postOrder");
setPostOrderTableButton.addEventListener("click", () => {
    // clear the table
    tableBody.innerHTML = "";
    // set the table
    const listPreOrder = estudiantesAVL.postOrder(estudiantesAVL.raiz);
    listPreOrder.forEach((nodo, index) => {
        const estudiante = nodo.estudiante;
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${index + 1}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.carnet}</td>
      <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${estudiante.name}</td>
    `;
        tableBody.appendChild(row);
    });
});


// call 
setInOrderTable();