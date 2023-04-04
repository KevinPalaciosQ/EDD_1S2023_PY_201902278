// import the AVL tree
import { AVLTree } from "../../EDD/AVL.js";

// get from localStorage the tree
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
// parse the tree
const tree = JSON.parse(AVLTreeJSon);
// parse to AVL Tree
const studentsAVL = new AVLTree();
// set the root
studentsAVL.root = tree;

// get the table 
const tableBody = document.querySelector("#table-students tbody");

// set by default inOrder table 
const setInOrderTable = () => {
    const listInOrder = studentsAVL.inOrder(studentsAVL.root);
    // set the table
    listInOrder.forEach((node, index) => {
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
    const listPreOrder = studentsAVL.preOrder(studentsAVL.root);
    listPreOrder.forEach((node, index) => {
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

// set in preOrder table
const setPostOrderTableButton = document.querySelector("#b-postOrder");
setPostOrderTableButton.addEventListener("click", () => {
    // clear the table
    tableBody.innerHTML = "";
    // set the table
    const listPreOrder = studentsAVL.postOrder(studentsAVL.root);
    listPreOrder.forEach((node, index) => {
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