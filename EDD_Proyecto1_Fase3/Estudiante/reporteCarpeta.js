import { arbol_Nario } from "../JavaScript/nodo_Nario.js";
// Coloca la imagen
const graph = () => {
  // obtiene el usuario de  local storage
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // parsea los directorios a N-ario
  const NewTree = new arbol_Nario();
  NewTree.root = user.directories.root;
  NewTree.nodes_created = user.directories.nodes_created;
  
  return NewTree.graficarArbol()
};


const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph();
  const image = document.getElementById("image");
  image.src = url + body;
};

// ejecuta la función
refreshImage();
