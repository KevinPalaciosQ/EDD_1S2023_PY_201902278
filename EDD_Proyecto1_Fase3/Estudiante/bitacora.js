import { listaCircular,info } from "../JavaScript/ListaCircular.js";

const graph = () => {
  // obtiene al usuario del local storage
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  const binnacleList = [];

  user.binnacle.forEach((node) => {
    binnacleList.push(node);
  });

  // serializa la lista 
  const circular = new listaCircular();

  binnacleList.forEach((node) => {
    node = Object.assign(new info(), node);
    circular.append(node);
  });
  return circular.generateGraphviz();
};

const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph();
  const image = document.getElementById("image");
  image.src = url + body;
};

refreshImage();
