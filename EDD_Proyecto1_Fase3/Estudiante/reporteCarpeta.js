import { N_arioTree } from "../JavaScript/nodo_Nario.js";
// Coloca la imagen
const graph = () => {
  // Obtiene al usuario del  localStorage
  const user = JSON.parse(localStorage.getItem("EstudianteActual"));

  // Parsea los directorios en N-ario
  const NewTree = new N_arioTree();
  NewTree.raiz = user.directories.raiz;
  NewTree.nodes_created = user.directories.nodes_created;
  
  return NewTree.graphTree()
};

// Obtiene la imagen de .src
const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph();

  const image = document.getElementById("image");

  image.src = url + body;
};


refreshImage();
