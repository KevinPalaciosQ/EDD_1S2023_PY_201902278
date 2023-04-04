import  {AVLTree}  from "./AVL.js";

// get from localStorage the tree
const ArbolAVLJSon = localStorage.getItem("estudianteTreeAVL");
// parse the tree
const tree = JSON.parse(ArbolAVLJSon);

const graph = (tree) => {
  // parse to AVL Tree
  const estudiantesAVL = new AVLTree();
  // set the raiz
  estudiantesAVL.raiz = tree;
  return estudiantesAVL.crearTextoParaGraphiz();
};

// get the image id and set the src
const RefrescarImagen = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph(tree);
  // get the image
  const image = document.getElementById("image");
  // set the src
  image.src = url + body;
};

// execuse the function
RefrescarImagen(); 
