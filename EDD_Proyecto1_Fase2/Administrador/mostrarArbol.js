import  {AVLTree}  from "../JavaScript/AVL.js";

// se obtiene el estudiante del  localStorage 
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");

const tree = JSON.parse(AVLTreeJSon);

const graph = (tree) => {

  const studentsAVL = new AVLTree();

  studentsAVL.raiz = tree;
  return studentsAVL.graphizAVL();
};


const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph(tree);

  const image = document.getElementById("image");

  image.src = url + body;
};


refreshImage(); 
