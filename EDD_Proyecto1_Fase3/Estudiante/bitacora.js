import { CircularLinkedList,info } from "../JavaScript/ListaCircular.js";
// Coloca imagen
const graph = () => {
  // Obteniendo el usuario con localStorage
  const user = JSON.parse(localStorage.getItem("EstudianteActual"));
  console.log(user);

  const binnacleList = [];

  user.binnacle.forEach((node) => {
    binnacleList.push(node);
  });

  // Serialización de lista 
  const circular = new CircularLinkedList();

  binnacleList.forEach((node) => {
    // Asigna objeto a nodo 
    node = Object.assign(new info(), node);
    circular.append(node);
  });
  return circular.generateGraphviz();
};

// Obtiene la imagen con .src
const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph();

  const image = document.getElementById("image");

  image.src = url + body;
};


refreshImage();
