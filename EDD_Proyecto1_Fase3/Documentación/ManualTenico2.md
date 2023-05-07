# <center>Manual de Técnico Fase 3</center>
---
## AVL.js
En este archivo de javascript se encuentran la mayoria de funciones del Árbol de Busqueda Binaria, las cuales son.
altura: Obtiene la altura del árbol 

-  balanceoF: Es el factor de balance utilizado en el arbol AVL.
- insertar_Valor: Se encarga de insertar un estudiante.
- buscarEstudiante: Busca al estudiatne por nombre
- buscarCarnet: Busca el Carnet del estudiante.
- ActualizaEstudiante: Actualiza el estudiante.
- graphizAVL: Se encarga de graficar el Arbol.
- inOrder: se utiliza para recorrer los nodos del árbol en orden ascendente.

- preOrder:  se llama inicialmente con el nodo raíz del árbol AVL. Cada vez que la función se llama recursivamente, se imprime el valor del nodo actual, luego se llama a sí misma primero con el subárbol izquierdo del nodo actual y luego con el subárbol derecho del nodo actual.
- postOrder:  se utiliza para recorrer los nodos del árbol en post-orden.
<details>
<<summary> Descripción 🧐</summary>
<br>


``` javascript
//Importaciones
import { arbol_Nario } from "./nodo_Nario.js";
import { listaCircular } from "./ListaCircular.js";
export class userStudent {
  constructor(name, carnet, password, root_file) {
    this.name = name;
    this.carnet = carnet;
    this.password = password;
    this.root_file = root_file;
    // Implementando el arbol Nario y ListaCircular 
    this.directories = new arbol_Nario();
    this.binnacle = new listaCircular();
  }
}
// Nodo del Arbol 
export class Node {
  constructor(value, student) {
    this.value = value;
    this.student = student;
    this.izquierda = null;
    this.derecha = null;
    this.altura = 1;
    this.balance_factor = 0;
  }
}

export class AVLTree {
  constructor() {
    this.raiz = null;
  }

  // Retorna altura del arbol 
  altura(raiz) {
    return raiz === null ? 0 : raiz.altura;
  }

  //Retorna el factor de balance 
  balanceoF(raiz) {
    return raiz === null ? 0 : this.altura(raiz.derecha) - this.altura(raiz.izquierda);
  }

  // Rota a la izquierda simple
  rotarIzquierda(raiz) {
    let raiz_D = raiz.derecha;
    let raiz_hijo_I = raiz_D.izquierda;
    raiz_D.izquierda = raiz;
    raiz.derecha = raiz_hijo_I;
    // Cambia la Altura
    raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));
    raiz_D.altura =
      1 + Math.max(this.altura(raiz_D.izquierda), this.altura(raiz_D.derecha));

      raiz.balance_factor = this.balanceoF(raiz);

    raiz_D.balance_factor = this.balanceoF(raiz_D);

    return raiz_D;
  }

  rotarDerecha(raiz) {
    let root_left = raiz.izquierda;
    let root_child_right = root_left.derecha;
    root_left.derecha = raiz;
    raiz.izquierda = root_child_right;

    raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));
    root_left.altura =
      1 + Math.max(this.altura(root_left.izquierda), this.altura(root_left.derecha));

      raiz.balance_factor = this.balanceoF(raiz);

    root_left.balance_factor = this.balanceoF(root_left);

    return root_left;
  }

  insertar_Valor(node, raiz) {
    if (raiz === null) {
      return node;
    } else {
      if (raiz.value == node.value) {
        raiz.value = node.value;
      } else if (node.value < raiz.value) {
        raiz.izquierda = this.insertar_Valor(node, raiz.izquierda);
      } else {
        raiz.derecha = this.insertar_Valor(node, raiz.derecha);
      }
    }

    raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));
    let balance = this.balanceoF(raiz);
    raiz.balance_factor = balance;

    // Rotacion simple a la izquierda 
    if (balance > 1 && node.value > raiz.derecha.value) {
      return this.rotarIzquierda(raiz);
    }

    if (balance < -1 && node.value < raiz.izquierda.value) {

      return this.rotarDerecha(raiz);
    }

    if (balance > 1 && node.value < raiz.derecha.value) {
      raiz.derecha = this.rotarDerecha(raiz.derecha);
      return this.rotarIzquierda(raiz);
    }

    if (balance < -1 && node.value > raiz.izquierda.value) {
      raiz.izquierda = this.rotarIzquierda(raiz.izquierda);
      return this.rotarDerecha(raiz);
    }

    return raiz;
  }


  insertarValor(value, student) {
    const nuevoNodo = new Node(value, student);
    this.raiz = this.insertar_Valor(nuevoNodo, this.raiz);
  }
  
  buscarEstudiante(value) {
    let actual = this.raiz;
    while (actual != null) {
      if (actual.value == value) {
        return actual.student;
      } else if (value < actual.value) {
        actual = actual.izquierda;
      } else {
        actual = actual.derecha;
      }
    }
    return null;
  }

  buscarCarnet(value) {
    let actual = this.raiz;
    while (actual != null) {
      if (actual.value == value) {
        return true
      } else if (value < actual.value) {
        actual = actual.izquierda;
      } else {
        actual = actual.derecha;
      }
    }
    return false;
  }

  // Actualiza el Estudiante
  ActualizaEstudiante(value, student) {
    let actual = this.raiz;
    while (actual != null) {
      if (actual.value == value) {
        console.log("Encontrado");
        actual.student = student;
        return;
      } else if (value < actual.value) {
        actual = actual.izquierda;
      } else {
        actual = actual.derecha;
      }
    }
    return null;
  }
  

  // Vacia el Arbol 
  borrarTodo() {
    this.raiz = null;
  }
  
  graphizAVL() {
    let texto = "digraph G {\n";

    // Atributos de graphiz 
    texto += "  node [shape=circle, color=skyblue, fontcolor=white, style=filled];\n";
    texto += "  edge [arrowsize=1.0, color=green];\n";
    texto += "  graph [bgcolor=lightgrey];\n";

    function agregarNodo(node) {
      if (node != null) {
        let nodeLabel = node.value.toString();
        let student = node.student;
        texto += `  ${nodeLabel} [label="${nodeLabel} \\n ${student.name} \\n Altura:${node.altura}"];\n`;
        if (node.izquierda != null) {
          texto += `  ${nodeLabel} -> ${node.izquierda.value};\n`;
          agregarNodo(node.izquierda);
        }
        if (node.derecha != null) {
          texto += `  ${nodeLabel} -> ${node.derecha.value};\n`;
          agregarNodo(node.derecha);
        }
      }
    }

    agregarNodo(this.raiz);

    texto += "}";

    return texto;
  }
  inOrder(raiz) {
    let list = [];
    if (raiz != null) {
      list = list.concat(this.inOrder(raiz.izquierda));
      list.push(raiz);
      list = list.concat(this.inOrder(raiz.derecha));
    }
    return list;
  }
  preOrder(raiz) {
    let list = [];
    if (raiz != null) {
      list.push(raiz);
      list = list.concat(this.preOrder(raiz.izquierda));
      list = list.concat(this.preOrder(raiz.derecha));
    }
    return list;
  }
  postOrder(raiz) {
    let list = [];
    if (raiz != null) {
      list = list.concat(this.postOrder(raiz.izquierda));
      list = list.concat(this.postOrder(raiz.derecha));
      list.push(raiz);
    }
    return list;
  }
}
```

</details>


## __Index.js__
Se importa la clase AVLTree del módulo AVL.js. Luego, se obtiene una instancia previamente guardada del árbol AVL del almacenamiento local y se crea una nueva instancia de AVLTree con la raíz del árbol previamente guardado.

A continuación, se obtiene el formulario de inicio de sesión y se agrega un evento de escucha al formulario. Cuando se envía el formulario, se ejecuta la función que realiza la autenticación.

Primero, se obtienen el nombre de usuario y la contraseña del formulario. Luego, se verifica si el usuario y la contraseña coinciden con el usuario y la contraseña de administrador predefinidos. Si el usuario y la contraseña son correctos, se redirige al usuario a la página de carga del administrador.

Si el usuario y la contraseña no coinciden con el usuario y la contraseña de administrador, se busca al estudiante en el árbol AVL utilizando el nombre de usuario. Si se encuentra al estudiante, se verifica si la contraseña proporcionada coincide con la contraseña del estudiante. Si la contraseña coincide, se guarda el estudiante actual en el almacenamiento local y se redirige al estudiante a su página de inicio. Si la contraseña no coincide, se muestra un mensaje de error y se restablece el formulario.

Si el usuario no se encuentra en el árbol AVL, se muestra un mensaje de error y se restablece el formulario.
``` javascript
//Importaciones Realizadas 
import { AVLTree } from "./JavaScript/AVL.js";
const AVLTreeJSon = localStorage.getItem("studentTreeAVL");
const tree = JSON.parse(AVLTreeJSon);
const studentsAVL = new AVLTree();
studentsAVL.raiz = tree;

// Obtiene el form de Login
const form = document.getElementById("FormInicio");

// LLama la funcion en el html
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;

  const user = {
    usuario,
    password,
  };
  if (user.usuario === "admin" && user.password === "admin") {
    alert("Bienvenido Administrador ;)");
    window.location.href = "./EDD_Proyecto1_Fase2/Administrador/Carga.html";
  } else {
    const student = studentsAVL.buscarEstudiante(user.usuario);
    if (student) {
      if (localStorage.getItem("EstudianteActual")) {
        localStorage.removeItem("EstudianteActual");
      }
      if (student.password === user.password) {
        localStorage.setItem("EstudianteActual", JSON.stringify(student));
        alert("Bienvenido Compañero: "+student.name);
        window.location.href = "./EDD_Proyecto1_Fase2/Estudiante/Dashboard.html";
      } else {
        alert("Usuario o contraseña incorrectos");
        form.reset();
      }
    } else {
      alert("Usuario o contraseña incorrectos");
      form.reset();
    }
  }
});  
```
## __carga.js__
Se carga un archivo JSON con información de estudiantes y almacenarlos en una estructura de árbol AVL utilizando la clase AVLTree definida en el archivo AVL.js. Aquí se utiliza el objeto FileReader() para leer el archivo y JSON.parse() para convertirlo en un objeto JavaScript.

Luego, se recorre cada objeto estudiante del archivo y se crea un nuevo objeto userStudent con sus datos. Este objeto se inserta en el árbol AVL utilizando el método insertarValor() de la clase AVLTree.

Finalmente, se guarda la raíz del árbol AVL en el LocalStorage con la clave "studentTreeAVL". El código también incluye una alerta que se muestra al finalizar la carga del archivo. 
``` javascript
// Importaciones realizadas 
import { AVLTree, userStudent } from "../JavaScript/AVL.js";
const form = document.getElementById("Carga");
const reader = new FileReader();
// se da uso al Event Listener 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const studentsAVL = new AVLTree();
    const file = document.getElementById("Archivo").files[0];
    reader.readAsText(file);
    reader.onload = () => {
        const jsonFile = JSON.parse(reader.result);
        jsonFile["alumnos"].forEach((student) => {
                // Creación del estudiante
                const newStudent = new userStudent(student.nombre, student.carnet, student.password, student.root_file);
                // Se inserta el estudiante
                studentsAVL.insertarValor(newStudent.carnet, newStudent);
            })
            // Se obtiene el LocalStorage
        localStorage.setItem("studentTreeAVL", JSON.stringify(studentsAVL.raiz));
    };
    alert('Archivo cargado correctamente');
    form.reset();

});
```

## __mostrarArbol.js__
 Genera y muestra una imagen del árbol AVL de estudiantes utilizando la clase AVLTree definida en el archivo AVL.js. Primero, se obtiene la raíz del árbol AVL del LocalStorage utilizando la clave "studentTreeAVL" y se almacena en la variable tree.

Luego, se define una función graph() que toma como entrada la raíz del árbol AVL y crea una cadena de texto en formato DOT para representar el árbol. Esta función utiliza el método graphizAVL() de la clase AVLTree para generar la cadena de texto.

Después, se define una función refreshImage() que genera la imagen del árbol AVL utilizando la API de QuickChart. Esta función utiliza la función graph() para obtener la cadena de texto en formato DOT, la cual se concatena con la URL de QuickChart para generar la imagen. La imagen se muestra en un elemento HTML con el id "image".

Por último, se llama a la función refreshImage() para generar y mostrar la imagen del árbol AVL.
``` javascript
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

```

## __ListaCircular.js__
Este proporciona una implementación de una lista circular enlazada y una clase para mantener un registro de las acciones realizadas en el sistema, junto con su fecha y hora. La lista circular enlazada se utiliza para mantener un registro de estas acciones. Además, se proporcionan funciones para generar una representación en Graphviz de la lista y para serializar y deserializar la lista
``` javascript
export class info {
    constructor(action) {
      this.action = action;
      this.date = new Date();
    }
  }
  
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  export class listaCircular {
    constructor() {
      this.cabeza = null;
      this.cola = null;
    }
  
    append(data) {
      let nuevoNodo = new Node(data);
      if (!this.cabeza) {
        this.cabeza = nuevoNodo;
        this.cola = nuevoNodo;
        nuevoNodo.next = this.cabeza;
      } else {
        this.cola.next = nuevoNodo;
        this.cola = nuevoNodo;
        this.cola.next = this.cabeza;
      }
    }
  
    generateGraphviz() {
      let graphviz = "digraph G { \n";
      graphviz += "rankdir=LR \n";
      graphviz += "node [shape=box, color=skyblue, fontcolor=white, style=filled] \n";
      graphviz += "  edge [arrowsize=1.0, color=green];\n";
      graphviz += "  graph [bgcolor=lightgrey];\n";
      let aux = this.cabeza;
      let count = 0;
      do {
        // Formato de Fecha
        let date = new Date(aux.value.date);
        let newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} \\n Hora: ${date.getHours()}:${date.getMinutes()}`;
        graphviz += `node${count} [label="Acción: ${aux.value.action} \\n Fecha: ${newDate}"] \n`;
        aux = aux.next;
        count++;
      } while (aux != this.cabeza);
      aux = this.cabeza;
      count = 0;
      do {
        graphviz += `node${count} -> node${count + 1} \n`;
        aux = aux.next;
        count++;
      } while (aux.next != this.cabeza);
      graphviz += `node${count} -> node0 \n`;
      graphviz += "}";
      return graphviz;
    }
  
    serialize() {
      let list = [];
      let aux = this.cabeza;
      do {
        list.push(aux.value);
        aux = aux.next;
      } while (aux != this.cabeza);
      return list;
    }
  
    deserialize(list) {
      list.forEach((element) => {
        this.append(element);
      });
    }
  }
  
```

## __nodo_Nario.js__
   Es una implementación de un árbol n-ario que se utiliza para modelar un sistema de directorios similar al de un sistema operativo. El árbol se utiliza para organizar los directorios de forma jerárquica, donde cada nodo representa un directorio y puede tener varios hijos (subdirectorios).

Tiene tres clases: "nodoNario" que define los nodos del árbol, "arbol_Nario" que define el árbol y proporciona métodos para insertar nodos y buscar directorios, y "MatrizDispersa" que es una clase auxiliar para crear una matriz dispersa.

El método "buscarDirectorio" busca un directorio en el árbol y devuelve un código que indica si el directorio existe, no existe, si es inválido o si es una copia de otro directorio. El método "insertarValor" inserta un nuevo directorio en el árbol si no existe, si ya existe, crea una copia del directorio con un nombre diferente. El método "graficarArbol" genera un string en formato DOT para representar el árbol en un gráfico.

En general, el código se encarga de mantener la estructura jerárquica de los directorios y proporciona una forma eficiente de buscar y agregar directorios en el árbol.
``` javascript
import { MatrizDispersa } from "./matrizDispersa.js";

export class nodoNario {
  constructor(value, id) {
    this.next = null;
    this.value = value;
    this.first = null;
    this.id = id;
    this.matrix = new MatrizDispersa(value);
  }
}

export class arbol_Nario {
  constructor() {
    this.raiz = new nodoNario("/", 0);
    this.nodes_created = 1;
  }

  buscarDirectorio(new_directory, directory_list) {
    if (directory_list[1] === "" && this.raiz.first !== null) {
      let aux = this.raiz.first;
      while (aux) {
        if (aux.value === new_directory) {
          return 1;
        }
        aux = aux.next;
      }
      return 2;
    }
    else if (directory_list[1] === "" && this.raiz.first === null) {
      return 5;
    }

    else if (directory_list[1] === "" && this.raiz.first === null) {
      return 3;
    }

    else if (directory_list[1] !== "" && this.raiz.first !== null) {
      let aux = this.raiz.first;
      let level = directory_list.length;
      let position = 1;

      for (var i = 1; i < level; i++) {
        if (aux !== null) {
          while (aux) {
            if (
              position < directory_list.length &&
              directory_list[position] === aux.value
            ) {
              position++;
              if (aux.first !== null && position < directory_list.length) {
                aux = aux.first;
              }
              break;
            } else {
              aux = aux.next;
            }
          }
        }

        if (aux !== null) {
          aux = aux.first;
          while (aux) {
            if (aux.value === new_directory) {
              return 1;
            }
            aux = aux.next;
          }
          return 2;
        } else {
          return 4;
        }
      }
    }
  }

  insertarInOrder(raiz, nuevoNodo) {
    let piv = raiz.first;
    if (nuevoNodo.value < raiz.first.value) {
      nuevoNodo.next = raiz.first;
      raiz.first = nuevoNodo;
      return raiz;
    } else {
      while (piv.next) {
        if (nuevoNodo.value > piv.value && nuevoNodo.value < piv.next.value) {
          nuevoNodo.next = piv.next;
          piv.next = nuevoNodo;
          return raiz;
        } else if (nuevoNodo.value < piv.value) {
          nuevoNodo.next = piv;
          piv = nuevoNodo;
          return raiz;
        } else {
          piv = piv.next;
        }
      }
      piv.next = nuevoNodo;
      return raiz;
    }
  }

  insertarHijo(new_directory, directory_list) {

    const nuevoNodo = new nodoNario(new_directory, this.nodes_created);
    this.nodes_created++;

    if (directory_list[1] === "" && this.raiz.first === null) {
      this.raiz.first = nuevoNodo;
    }

    else if (directory_list[1] === "" && this.raiz.first !== null) {
      this.raiz = this.insertarInOrder(this.raiz, nuevoNodo);
    }

    else if (directory_list[1] !== "" && this.raiz.first !== null) {
      let aux = this.raiz.first;
      let level = directory_list.length;
      let position = 1;
      for (var i = 1; i < level; i++) {
        if (aux !== null) {
          while (aux) {
            if (
              position < directory_list.length &&
              directory_list[position] === aux.value
            ) {
              position++;
              if (aux.first !== null && position < directory_list.length) {
                aux = aux.first;
              }
              break;
            } else {
              aux = aux.next;
            }
          }
        } else {
          break;
        }
      }

      if (aux.first === null) {
        aux.first = nuevoNodo;
      } else {
        aux = this.insertarInOrder(aux, nuevoNodo);
      }
    }
  }

  insertarValor(path, new_directory) {
    let directory_list = path.split("/");
    let directory_exist = this.buscarDirectorio(new_directory, directory_list);
    switch (directory_exist) {
      case 1:
        let copyDirectory = `Copia ${new_directory}`;
        this.insertarHijo(copyDirectory, directory_list);
        break;
      case 2:
        this.insertarHijo(new_directory, directory_list);
        break;
      case 3:
        alert("El directorio no es valido");
        break;
      case 4:
        alert("El directorio no es valido");
        break;
      case 5:
        this.insertarHijo(new_directory, directory_list);
        break;
    }
  }

  graficarArbol() {
    let graph = "";
    if (this.raiz !== null) {
      graph = "digraph G {";
      graph += this.generarGrafica(this.raiz);
      graph += "}";
    } else {
      graph = "digraph G { voidTree }";
    }
    return graph;
  }

  generarGrafica(raiz) {
    let graph = "node[shape=record color=skyblue, fontcolor=white, style=filled]";
    let node = 1;
    let parent = 0;
    graph += "nodo" + parent + '[label="' + this.raiz.value + '"] ';
    graph += this.valoresSiguientes(this.raiz.first, node, parent);
    graph += this.conexiones(this.raiz.first, 0);
    return graph;
  }

  valoresSiguientes(raiz, node, parent) {
    let graph = "";
    let aux = raiz;
    let parent_plus = parent;
    if (aux !== null) {
      while (aux) {
        graph += "nodo" + aux.id + '[label="' + aux.value + '"] ';
        aux = aux.next;
      }
      aux = raiz;
      while (aux) {
        parent_plus++;
        graph += this.valoresSiguientes(aux.first, this.nodes_created, parent_plus);
        aux = aux.next;
      }
    }
    return graph;
  }

  conexiones(raiz, parent) {
    let graph = "";
    let aux = raiz;
    if (aux !== null) {
      while (aux) {
        graph += "nodo" + parent + " -> nodo" + aux.id + " ";
        aux = aux.next;
      }
      aux = raiz;
      while (aux) {
        graph += this.conexiones(aux.first, aux.id);
        aux = aux.next;
      }
    }
    return graph;
  }
  
  eliminarDirectorio(path) {
    let directoryList = path.split("/");
    this.nodes_created--;
    if (directoryList.length === 2) {
      if (this.raiz.first.value === directoryList[1]) {
        this.raiz.first = this.raiz.first.next;
      } else {
        let aux = this.raiz.first;
        while (aux.next !== null) {
          if (aux.next.value === directoryList[1]) {
            aux.next = aux.next.next;
            break;
          }
          aux = aux.next;
        }
      }
      return;
    }

    let nodeDirectory = this.buscarValorDirectorio(directoryList);
    let parentDirectory = this.buscarValorDirectorio(
      directoryList.slice(0, directoryList.length - 1)
    );

    if (nodeDirectory === this.raiz) {
      this.raiz = null;
    } else if (nodeDirectory === null) {
      alert("Ingresa una ruta válida");
    } else {

      let currentNode = parentDirectory.first;
      let prevNode = null;
      while (currentNode !== null) {
        if (currentNode === nodeDirectory) {
          if (prevNode === null) {
            parentDirectory.first = currentNode.next;
          } else {
            prevNode.next = currentNode.next;
          }
          currentNode.next = null;
          break;
        }
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
    }
  }

  buscarValorDirectorio(directory_list) {
    if (directory_list[1] === "" && this.raiz.first !== null) {
      return this.raiz;
    }
    else if (directory_list[1] === "" && this.raiz.first === null) {
      return null;
    }
    else if (directory_list[1] !== "" && this.raiz.first === null) {
      return null;
    }
    else if (directory_list[1] !== "" && this.raiz.first !== null) {
      let aux = this.raiz.first;
      let level = directory_list.length;
      let position = 1;
      for (var i = 1; i < level; i++) {
        if (aux !== null) {
          while (aux) {
            if (
              position < directory_list.length &&
              directory_list[position] === aux.value
            ) {
              position++;
              if (aux.first !== null && position < directory_list.length) {
                aux = aux.first;
              }
              break;
            } else {
              aux = aux.next;
            }
          }
        } else {
          break;
        }
      }
      if (aux !== null) {
        return aux;
      } else {
        return null;
      }
    }
  }
  actualizarDirectorio(path, new_directory) {
    let directory_list = path.split("/");
    let directory_exist = this.buscarValorDirectorio(directory_list);
    if (directory_exist !== null) {
      directory_exist = new_directory;
    } else {
      alert("La ruta no es válida");
    }
  }
  DirectorioActual(path) {
    let directory_list = path.split("/");
    let directory_exist = this.buscarValorDirectorio(directory_list);
    if (directory_exist !== null) {
      return directory_exist;
    } else {
      return null;
    }
  }

  mostrarDirectorios(path) {
    const list_directories = [];
    let directory_list = path.split("/");
    let directory_exist = this.buscarValorDirectorio(directory_list);
    try {
      if (directory_exist !== null) {
        let aux = directory_exist.first;
        while (aux) {
          list_directories.push(aux.value);
          aux = aux.next;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return list_directories;
  }
}

```

## __matrizDispersa.js__
El código es una implementación de una matriz dispersa en JavaScript, y se compone de dos clases: "nodeMatrix" y "MatrizDispersa".
La clase "nodeMatrix" representa un nodo en la matriz y tiene cuatro atributos: "next", "prev", "below" y "above", que son punteros a los nodos adyacentes. Además, tiene los atributos "posX", "posY", "position" y "content" que representan la posición del nodo y su contenido.
La clase "MatrizDispersa" es la clase principal y tiene un atributo llamado "principal" que es el nodo principal de la matriz dispersa. También tiene los atributos "coorX" y "coorY" que se utilizan para llevar un seguimiento de las coordenadas actuales de la matriz.
La clase tiene varios métodos, entre ellos, "searchR" y "searchC" para buscar nodos por su posición en fila o columna, "insertColumn" e "insertRow" para insertar nuevas columnas o filas en la matriz, y "insertNode" para insertar un nuevo nodo en una posición determinada. También tiene "insertFile" para insertar un nuevo archivo en la matriz y "setPermission" para establecer permisos en un archivo determinado para un usuario específico. Además, tiene "searchX" para buscar un nodo en la matriz por su coordenada en x.
``` javascript
export class nodeMatrix {
  constructor(posX, posY, file_name, content) {
    this.next = null;
    this.prev = null;
    this.below = null;
    this.above = null;
    this.posX = posX;
    this.posY = posY;
    this.position = file_name;
    this.content = content;
  }
}

export class MatrizDispersa {
  constructor(directory) {
    this.principal = new nodeMatrix(-1, -1, directory, null);
    this.coorX = 0;
    this.coorY = 0;
  }

  searchR(file_name) {
    let aux = this.principal;
    while (aux) {
      if (aux.position === file_name) {
        return aux;
      } else {
        aux = aux.below;
      }
    }
    return null;
  }

  searchC(carnet) {
    let aux = this.principal;
    while (aux) {
      if (aux.position === carnet) {
        return aux;
      } else {
        aux = aux.next;
      }
    }
    return null;
  }

  insertColumn(position, carnet) {
    const nuevoNodo = new nodeMatrix(position, -1, carnet, null);
    let piv = this.principal;
    let pivA = this.principal;

    while (piv.next) {
      if (nuevoNodo.posX > piv.posX) {
        pivA = piv;
        piv = piv.next;
      } else {
        nuevoNodo.next = piv;
        nuevoNodo.prev = pivA;
        pivA.next = nuevoNodo;
        piv.prev = nuevoNodo;
        return;
      }
    }
    nuevoNodo.prev = piv;
    piv.next = nuevoNodo;
  }

  insertRow(position, file_name, content) {
    const nuevoNodo = new nodeMatrix(-1, position, file_name, content);
    let piv = this.principal;
    let pivA = this.principal;

    while (piv.below) {
      if (nuevoNodo.posY > piv.posY) {
        pivA = piv;
        piv = piv.below;
      } else {
        nuevoNodo.below = piv;
        nuevoNodo.above = pivA;
        pivA.below = nuevoNodo;
        piv.above = nuevoNodo;
        return;
      }
    }
    nuevoNodo.above = piv;
    piv.below = nuevoNodo;
  }

  insertNode(x, y, permisions) {
    const nuevoNodo = new nodeMatrix(x, y, permisions, permisions);
    let tempX = this.principal;
    let tempY = this.principal;

    while (tempX.next) {
      if (tempX.posX === nuevoNodo.posX) {
        break;
      }
      tempX = tempX.next;
    }
    while (true) {
      if (tempX.posY === nuevoNodo.posY) {
        break;
      } else if (tempX.below !== null && tempX.below.posY > nuevoNodo.posY) {
        nuevoNodo.below = tempX.below;
        nuevoNodo.above = tempX;
        tempX.below = nuevoNodo;
        break;
      } else if (tempX.below === null) {
        nuevoNodo.above = tempX;
        nuevoNodo.below = tempX.below;
        tempX.below = nuevoNodo;
        break;
      } else {
        tempX = tempX.below;
      }
    }

    while (tempY.below) {
      if (tempY.posY === nuevoNodo.posY) {
        break;
      }
      tempY = tempY.below;
    }
    while (true) {
      if (tempY.posX === nuevoNodo.posX) {
        break;
      } else if (tempY.next !== null && tempY.next.posX > nuevoNodo.posX) {
        nuevoNodo.next = tempY.next;
        nuevoNodo.prev = tempY;
        tempY.next = nuevoNodo;
      } else if (tempY.next === null) {
        nuevoNodo.prev = tempY;
        nuevoNodo.next = tempY.next;
        tempY.next = nuevoNodo;
      } else {
        tempY = tempY.next;
      }
    }
  }

  insertFile(file_name, copy_num, content) {
    let newRow = this.searchR(file_name);
    if (newRow === null) {
      this.insertRow(this.coorY, file_name, content);
      this.coorY++;
    } else {
      let newFile =
        file_name.slice(0, file_name.indexOf(".")) +
        "(" +
        "Copia" +
        copy_num +
        ")" +
        file_name.slice(file_name.indexOf("."));
      this.insertFile(newFile, copy_num, content);
    }
  }

  setPermission(file_name, carnet, permission) {
    let newCol = this.searchC(carnet);
    let newRow = this.searchR(file_name);

    if (newCol === null) {
      this.insertColumn(this.coorX, carnet);
      this.coorX++;
      newCol = this.searchC(carnet);
    }

    if (newCol !== null && newRow !== null) {
      this.insertNode(newCol.posX, newRow.posY, permission);
    }
  }
  searchX(x) {
    let aux = this.principal;
    while (aux) {
      if (aux.posX === x && aux.posY === -1) {
        return aux;
      } else {
        aux = aux.next;
      }
    }
    return null;
  }

  searchY(y) {
    let aux = this.principal;
    while (aux) {
      if (aux.posY === y && aux.posX === -1) {
        return aux;
      } else {
        aux = aux.below;
      }
    }
    return null;
  }
  toJSON() {

    const convertedFiles = [];

    const permisos = [];
    let aux1 = this.principal;
    let aux2 = this.principal;
    if (aux1 !== null) {

      aux1 = aux1.below;
      while (aux1) {
        convertedFiles.push({
          content: aux1.content,
          num: 1,
          file_name: aux1.position,
        });
        aux1 = aux1.below;
      }

      while (aux2) {
        aux1 = aux2;
        while (aux1) {
          aux1 = aux1.next;
          if (aux1 !== null) {
            if (aux1.posY !== -1) {
              const fileName = this.searchY(aux1.posY);
              const carnet = this.searchX(aux1.posX);
              permisos.push({
                file_name: fileName.position,
                carnet: carnet.position,
                permission: aux1.content,
              });
            }
          }
        }
        aux2 = aux2.below;
      }
    }
    return {
      permisos,
      convertedFiles,
    };
  }
  makeList() {
    let aux = this.principal;
    let list = [];
    if (aux !== null) {
      aux = aux.below;
      while (aux) {
        list.push(aux.position);
        aux = aux.below;
      }
    }
    return list;
  }

  graphvizReport(name_path) {
    let cadena = "";
    let aux1 = this.principal;
    let aux2 = this.principal;
    let aux3 = this.principal;
    if (aux1 !== null) {
      cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
      while (aux1) {
        if (aux1.posX === -1 && aux1.posY === -1) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            '[label="' +
            name_path +
            '" ,rankdir=LR,group=' +
            (aux1.posX + 1) +
            "]; ";
        } else {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            '[label="' +
            aux1.position +
            '" ,rankdir=LR,group=' +
            (aux1.posX + 1) +
            "]; ";
        }
        aux1 = aux1.next;
      }
      cadena += "}";
      while (aux2) {
        aux1 = aux2;
        cadena += "{rank=same; ";
        while (aux1) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            '[label="' +
            aux1.position +
            '" ,group=' +
            (aux1.posX + 1) +
            "]; ";
          aux1 = aux1.next;
        }
        cadena += "}";
        aux2 = aux2.below;
      }
      aux2 = aux3;
      while (aux2) {
        aux1 = aux2;
        while (aux1.next) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            " -> " +
            "nodo" +
            (aux1.next.posX + 1) +
            (aux1.next.posY + 1) +
            " [dir=both];";
          aux1 = aux1.next;
        }
        aux2 = aux2.below;
      }
      aux2 = aux3;
      while (aux2) {
        aux1 = aux2;
        while (aux1.below) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            " -> " +
            "nodo" +
            (aux1.below.posX + 1) +
            (aux1.below.posY + 1) +
            " [dir=both];";
          aux1 = aux1.below;
        }
        aux2 = aux2.next;
      }
      cadena += "}";
    } else {
      cadena = "No hay elementos en la matriz";
    }
    return cadena;
  }
}
```
## __transferencia.js__
este código implementa la carga de un archivo JSON con información de estudiantes y lo inserta en una estructura de árbol AVL en el navegador web. Luego, utiliza las contraseñas de los estudiantes para crear una tabla hash encriptada y la guarda en el almacenamiento local del navegador. También crea una cadena de bloques vacía y la guarda en el almacenamiento local del navegador.

La parte del código que maneja la carga del archivo utiliza el objeto FileReader para leer el contenido del archivo. Luego, parsea el archivo JSON y crea objetos de estudiante con la información proporcionada en el archivo. Luego, se inserta cada objeto de estudiante en una instancia de AVLTree.

La parte del código que crea una tabla hash encriptada utiliza la función de encriptación de contraseñas importada de un módulo personalizado. Crea una lista de promesas para encriptar cada contraseña de estudiante y espera a que se resuelvan todas las promesas. Luego, crea una nueva instancia de HashTable y agrega cada estudiante y su contraseña encriptada a la tabla hash.


``` javascript
//Importaciones utilizadas
import { AVLTree, userStudent } from "../JavaScript/AVL.js";
import { HashTable } from "../JavaScript/Hash.js";
import { encryptPassword } from "../JavaScript/encriptador.js";
// obtiene el form 
const form = document.getElementById("uploadForm");

// obtiene el boton 
const button = document.getElementById("changeHash");
// añade funcionalidad
button.addEventListener("click", (event) => {
  // obtiene el arbol avl del local storage 
  const avl = JSON.parse(localStorage.getItem("studentTreeAVL"));
  // assing to the avl tree
  const avlTree = new AVLTree();
  avlTree.root = avl;
  //itera del lado izquierdo y derecho del arbol 
  const listUsers = iterateAVL(avlTree.root);

  // crea una lista de promesas para encriptar el arbol 
  const encryptPromises = listUsers.map(async (user) => {
    const encryptedPassword = await encryptPassword(user.password);
    return { carnet: user.carnet.toString(), user, encryptedPassword };
  });

  // espera a que se resuelvan todas las promesas
  Promise.all(encryptPromises)
    .then((usersWithEncryptedPasswords) => {
      // crea una nueva tabla hash con las contraseñas encriptadas 
      const hashTable = new HashTable();
      usersWithEncryptedPasswords.forEach(
        ({ carnet, user, encryptedPassword }) => {
          hashTable.insert(carnet, user, encryptedPassword);
        }
      );
      // guarda la tabla hash en el local storage 
      localStorage.setItem("hashTable", JSON.stringify(hashTable));
      console.log(hashTable);
      // crea el blockchain
      const blockchain = [];
      // guarda el blockchain en el local storage
      localStorage.setItem("blockchain", JSON.stringify(blockchain));
    })
    .catch((error) => {
      console.error(error);
    });

});
// itera el nodo del arbol AVL y lo guarda en una lista 
function iterateAVL(node) {
  // crea la lista 
  const list = [];
  // función recursiva
  function iterate(node) {
    if (node != null) {
      // añade el valor 
      list.push(node.student);
      // itera por la izquierda
      iterate(node.left);
      //itera por la derecha
      iterate(node.right);
    }
  }
  // llama la función recursiva 
  iterate(node);
  // retorna la lista 
  return list;
}

const reader = new FileReader();
// añade funcionalidad 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // añade al arbol AVL
  const studentsAVL = new AVLTree();
  const file = document.getElementById("file").files[0];
  // parsea el File a json
  reader.readAsText(file);
  reader.onload = () => {
    // parsea a json
    const jsonFile = JSON.parse(reader.result);
    // inserta a los alumnos
    jsonFile["alumnos"].forEach((student) => {
      // crea un estudiante 
      const newStudent = new userStudent(
        student.nombre,
        parseInt(student.carnet),
        student.password,
        student.Carpeta_Raiz
      );
      // inserta el estudiante 
      studentsAVL.insertarValor(newStudent.carnet, newStudent);
    });
    // guarda el arbol en el local storage 
    localStorage.setItem("studentTreeAVL", JSON.stringify(studentsAVL.root));
  };
  alert("Archivo cargado correctamente");
  form.reset();
});
```
## __tablaHash.js__
 La primera tabla muestra información sobre los estudiantes almacenados en la tabla hash, como su número de carnet, nombre de usuario y contraseña. La segunda tabla muestra información sobre los permisos de acceso a archivos que han sido otorgados a los usuarios almacenados en la tabla hash.

La tabla hash se obtiene del almacenamiento local y se recorre para crear las tablas HTML. La función "setInOrderTable" itera sobre la tabla hash y agrega una fila por cada estudiante almacenado en ella a la primera tabla HTML. La función "setPermissions" itera sobre la tabla hash y agrega filas a la segunda tabla HTML solo para aquellos estudiantes que tengan al menos un permiso otorgado.

La función "getMatrix" es una función recursiva que se llama para obtener una lista de matrices que tienen permisos otorgados. La lista se utiliza para crear la segunda tabla HTML.

``` javascript
const hashTable = JSON.parse(localStorage.getItem("hashTable"));

// obtiene la tabla 
const tableBody = document.querySelector("#table-students tbody");
const tablePermissionsBody = document.querySelector("#table-permissions tbody");
//setea inorder 
const setInOrderTable = () => {
  //coloca la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${
          index + 1
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.carnet
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.user.name
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.password
        }</td>
      `;
      tableBody.appendChild(row);
    }
  });
};

// da los permisos 
const setPermissions = () => {
  // obtiene la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      if (
        !(node.user.directories.root.matrix.permisos.length === 0) ||
        !(node.user.directories.root.matrix.convertedFiles.length === 0)
      ) {
        const directories = node.user.directories.root;
        // crea una lista para guardar matrz con permisos 
        let listMatrix = [];
        // evalua si la matriz esta vacia 
        if (directories.matrix.permisos.length !== 0) {
          listMatrix.push({
            matrix: directories.matrix,
            path: directories.value,
          });
        }
        // funcion recursiva para iterar el siguiente y primer nodo para encontrar si la matriz esta vacia o no 
        listMatrix = [...listMatrix, ...getMatrix(directories.first)];

        // itera la lista para crear una tabla 
        listMatrix.forEach((permissions, index) => {
          permissions.matrix.permisos.forEach((permission) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${node.user.carnet.toString()}</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.carnet
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">"${
              permissions.path 
            }"</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.file_name 
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.permission 
            }</td>
            `;
            tablePermissionsBody.appendChild(row);
          });
        });
      }
    }
  });
};

let path = "";

const getMatrix = (node) => {
  let listMatrix = [];

  // si la matriz no esta vacía la añade al path 
  if (node) {
    if (
      node.matrix.permisos.length !== 0 &&
      node.matrix.convertedFiles.length !== 0
    ) {
      listMatrix.push({ matrix: node.matrix, path: path + node.value });
    }
    path = "";
    if (node.first) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.first));
    }
    if (node.next) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.next));
    }
  }
  path = "";
  return listMatrix;
};

setInOrderTable();
setPermissions();

```
## encriptador.js__
Este es un código JavaScript que utiliza la API de Web Crypto para encriptar y desencriptar datos utilizando el algoritmo de cifrado AES (Advanced Encryption Standard).

La primera parte del código define una clave secreta y crea un buffer y una vista para almacenar la clave en forma de bytes. A continuación, se define un vector de inicialización (iv) y se especifica el algoritmo AES-GCM.

Las funciones "encryptPassword" y "decryptPassword" se encargan de encriptar y desencriptar una contraseña respectivamente, utilizando el modo de cifrado AES-CBC (Cipher Block Chaining) en lugar de AES-GCM.

Las funciones "encrypt" y "decrypt" se encargan de encriptar y desencriptar cualquier dato utilizando el algoritmo AES-GCM.

La función "encrypt" toma un string como entrada, lo codifica como UTF-8, lo encripta con AES-GCM, y lo codifica como base64 para que sea más fácil de transmitir. La función "decrypt" realiza el proceso inverso, decodificando el string base64, desencriptándolo y decodificando el resultado como UTF-8.
``` javascript
const secretKey = '1234567890ABCDEF';
const buffer = new ArrayBuffer(16); //se usan 16 bytes para AES-128
const view = new Uint8Array(buffer);

//convierte la llave a un Array de 16 bytes
for(let i = 0; i < secretKey.length; i++) {
  view[i] = secretKey.charCodeAt(i); //guardar el código de caracteres
}

const iv = new Uint8Array(16) //crea un Array de 16 bytes
const algorithm = { name: 'AES-GCM', iv: iv }; //especifica el algoritmo y le inicialización del vector


//encripta los datos 
export async function encryptPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const key = await crypto.subtle.importKey('raw', encoder.encode(secretKey), { name: 'AES-CBC' }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const cipherText = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data);
  const cipherArray = Array.from(new Uint8Array(cipherText));
  const base64Cipher = btoa(cipherArray.map(byte => String.fromCharCode(byte)).join(''));
  const base64Iv = btoa(Array.from(iv).map(byte => String.fromCharCode(byte)).join(''));
  return `${base64Cipher}.${base64Iv}`;  
}

//desencripta los datos
export async function decryptPassword(encryptedPassword) {
  const [base64Cipher, base64Iv] = encryptedPassword.split('.');
  const decoder = new TextDecoder();
  const cipherArray = new Uint8Array(atob(base64Cipher).split('').map(char => char.charCodeAt(0)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secretKey), { name: 'AES-CBC' }, false, ['decrypt']);
  const iv = new Uint8Array(atob(base64Iv).split('').map(char => char.charCodeAt(0)));
  const plainText = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, cipherArray);
  return decoder.decode(plainText);
}


//encripta los datos 
export async function encrypt(data) {
  const encoder= new TextEncoder();
  const dataEnconder = encoder.encode(data); //codifica los datos como UTF-8

  const keyCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt']); //importa la llave

  const encrypted = await crypto.subtle.encrypt(algorithm, keyCrypto, dataEnconder); //encrypta los datos 

  const base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(encrypted))); //codifica los datos encriptados como base 64

  return base64;
}

//desencripta los datos 
export async function decrypt(data) {

  const msgEncrypted = new Uint8Array(atob(data).split("").map(char => char.charCodeAt(0))); //decodifica la base 64 de los datos
  
  const keyCrypted = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt']); //importa la llave
  
  const msgDecrypted = await crypto.subtle.decrypt(algorithm, keyCrypted, msgEncrypted); //desencripta los datos
  
  const decoder = new TextDecoder();
  
  const msg = decoder.decode(msgDecrypted); //decodifica los datos como UTF-8
  
  return msg;
}

```
## Hash.js__
La tabla hash se implementa usando una matriz y los elementos se almacenan en nodos que contienen tres campos: el carnet, el usuario y la contraseña. La tabla hash utiliza una función hash para determinar la ubicación del nodo en la matriz. Si la posición está ocupada, se utiliza un algoritmo de recálculo de índice para encontrar la siguiente posición disponible. El rehashing se realiza cuando la tabla alcanza un cierto porcentaje de capacidad y se crea una nueva tabla con una capacidad mayor. La búsqueda se realiza utilizando la misma función hash y el algoritmo de recálculo de índice si es necesario. Si el nodo no se encuentra, se devuelve un valor falso.
``` javascript

class nodeHash {
    constructor(carnet, user, password) {
      this.carnet = carnet;
      this.user = user;
      this.password = password;
      //añade el grafo == arbol enario
    }
  }
  
  //inicia tabla Hash
  export class HashTable {
    constructor() {
      this.table = new Array(7); // Se usan site posiciones
      this.capacity = 7; //ahora si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla-> 13
      this.util = 0; //cuenta cuantos elementos hay en la tabla 
    }
  
    // añade un nuevo elemento 
    insert(carnet, user, password) {
      let index = this.calcuateIndex(carnet);
  
      const newNode = new nodeHash(carnet, user, password);
  
      if(index < this.capacity) { //inserta elementos en la tabla 
        try {
          if(this.table[index] == null) {
            this.table[index] = newNode;
            this.util++;
            this.capacityTable(); //si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla 
          }else {
            let c = 1;
            index = this.reCalculateIndex(carnet, c);
            while(this.table[index] != null) {
              c++;
              index = this.reCalculateIndex(carnet, c);
            }
            this.table[index] = newNode;
            this.util++;
            this.capacityTable(); //si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  
    //calcula el indice y su posición ingresa un nuevo elemento
    calcuateIndex(carnet) {
      let string_carnet = carnet.toString();
      let divisor = 0;
  
      for(let i = 0; i<string_carnet.length; i++) {
        divisor = divisor + string_carnet.charCodeAt(i);
      }
  
      let final_index = divisor % this.capacity; //index actual
      return final_index;
    }
  
    //recalcula el inidice 
    reCalculateIndex(carnet, c) {
      let newIndex = this.calcuateIndex(carnet) + c*c;
      let newValue = this.newIndex(newIndex);
      return newValue;
    }
  
    //calcula un nuevo indice 
    newIndex(number) {
      let newPosition = 0;
      if(number < this.capacity) {
        newPosition = number;
      }else {
        newPosition = number - this.capacity;
        newPosition = this.newIndex(newPosition);
      }
  
      return newPosition;
    }
  
    //hace rehashing a la nueva tabla
    capacityTable() {
      let aux_util = this.capacity*0.75; //se encuentra al 75% de su capacidad
      if(this.util > aux_util){
        this.capacity = this.newCapacity();
        this.util = 0;
        this.rehashing();
      }
    }
  
    //calcula la nueva capacidad 
    newCapacity() { //nuevo numero primo 
      let number = this.capacity + 1;
      while(!this.isPrime(number)) {
        number++;
      }
      return number;
    }
  
    //crea el  rehashing
    rehashing() {
      const aux_table = this.table;
      this.table = new Array(this.capacity);
      aux_table.forEach( e => {
        this.insert(e.carnet, e.user, e.password);
      })
    }
  
    //revisa si el número es primo 
    isPrime(number) {
      for(let i = 2; i<number; i++) {
        if(number % i === 0) {
          return false;
        }
      }
      return true;
    }
  
    //busca el usuario 
    searchUser(carnet) {
      console.log(carnet);  
      let index = this.calcuateIndex(carnet);
      if(index < this.capacity) {
        try {
          if(this.table[index] == null){
            return false;
          }else if(this.table[index] != null && this.table[index].carnet == carnet) {
            return this.table[index];
          }else {
            let c = 1;
            index = this.reCalculateIndex(carnet, c);
            while(this.table[index] != null) {
              if(this.table[index].carnet == carnet) {
                return this.table[index];
              }
              c++;
              index = this.reCalculateIndex(carnet, c);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

```
## BlockChain.js__
El código define dos clases, "nodeBlock" y "BlockChain". La clase "nodeBlock" define un nodo de bloque que contiene información como el índice del bloque, la fecha de creación, el remitente, el destinatario, el mensaje, el hash previo y el hash del bloque actual. La clase "BlockChain" es la cadena de bloques en sí misma y contiene una referencia al bloque "head" y el número de bloques en la cadena "blocks".

La clase "BlockChain" contiene varios métodos. El método "insertBlock" se utiliza para agregar un nuevo bloque a la cadena. El método utiliza la información proporcionada como argumentos (fecha, emisor, receptor y mensaje) para crear un nuevo bloque y agregarlo a la cadena. El mensaje se encripta antes de almacenarlo en el bloque. El método "sha256" se utiliza para calcular el hash de la cadena. El método "serialize" se utiliza para convertir la cadena de bloques en un formato que se puede enviar a través de la red. El método "deserialize" se utiliza para reconstruir la cadena de bloques a partir de una cadena serializada.
``` javascript
  import { encrypt,decrypt } from "./encriptador.js";
// Crea el Nodo de Block
class nodeBlock {
  constructor(index, date, emitter, receiver, message, previousHash, hash) {
    this.value = {
      'index': index,
      'timestamp': date,
      'transmitter': emitter,
      'receiver': receiver,
      'message': message,
      'previousHash': previousHash,
      'hash': hash
    }
    this.next = null;
    this.previous = null;
  }
}

export class BlockChain {
  constructor(){
    this.head = null;
    this.blocks = 0; // Cantidad de bloques
  }

  // añade un nuevo bloque a la cadena
  async insertBlcok(date, emitter, receiver, message) {
    if(this.head === null) {
      let chain = this.blocks + date + emitter + receiver + message;
      let hash = await this.sha256(chain);
      let encyptedMessage = await encrypt(message);
      const newBlock = new nodeBlock(this.blocks,date, emitter, receiver, encyptedMessage, '0000', hash);
      this.head = newBlock;
      this.blocks++;
    }else {
      let chain = this.blocks + date + emitter + receiver + message;
      let hash = await this.sha256(chain);
      let encyptedMessage = await encrypt(message);
      let aux = this.head;
      while(aux.next) {
        aux = aux.next;
      }
      const newBlock = new nodeBlock(this.blocks,date, emitter, receiver, encyptedMessage, aux.value["hash"], hash);
      newBlock.previous = aux;
      aux.next = newBlock;
      this.blocks++;
    }
  }


  // Crea el sha256
  async sha256(message) {
    let finalChain ;
    const encoder = new TextEncoder();
    const messageDecode = encoder.encode(message);
    
    await crypto.subtle.digest('SHA-256', messageDecode) // Encripta el mensaje
    .then(result => {
      const hashArray = Array.from(new Uint8Array(result)); // Convierte el Array de un buffer a otro
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      finalChain = hashHex;
    })
    .catch(error => console.error(error));

    return finalChain;
  }

  // Serializa el Blockchain
  serialize() {
    let aux = this.head;
    let chain = [];
    while(aux) {
      chain.push(aux.value);
      aux = aux.next;
    }
    return chain;
  }

  // Deserializa el Blockchain
  deserialize(chain) {
    for(let i = 0; i < chain.length; i++) {
      let newBlock = new nodeBlock(chain[i].index, chain[i].timestamp, chain[i].transmitter, chain[i].receiver, chain[i].message, chain[i].previousHash, chain[i].hash);
      if(this.head === null) {
        this.head = newBlock;
      }else {
        let aux = this.head;
        while(aux.next) {
          aux = aux.next;
        }
        aux.next = newBlock;
        newBlock.previous = aux;
      }
      this.blocks++;
    }
  }
}
```
## tablaHash.js__
La función JSON.parse se utiliza para convertir la información almacenada en localStorage en un objeto JavaScript. La variable hashTable contiene la tabla hash que se ha almacenado en localStorage.

La función setInOrderTable recorre la tabla hash y crea una tabla HTML que muestra el número de índice, carnet de estudiante, nombre de usuario y contraseña de cada nodo en la tabla hash.

La función setPermissions recorre la tabla hash y crea una tabla HTML que muestra los permisos de acceso de cada usuario a cada directorio y archivo. Para hacer esto, se utiliza una función recursiva getMatrix que itera a través de cada nodo del directorio para encontrar los nodos que tienen permisos de acceso.

En general, este código es parte de un sistema de gestión de archivos y permisos de acceso a ellos.

``` javascript
import { HashTable } from "../JavaScript/Hash.js";
import { BlockChain } from "../JavaScript/BlockChain.js";
import { decrypt } from "../JavaScript/encriptador.js";

// obtiene la tabla hash en el local storage
const hashTable = JSON.parse(localStorage.getItem("hashTable"));
const newHashTable = new HashTable();
newHashTable.capacity = hashTable.capacity;
newHashTable.util = hashTable.util;
newHashTable.table = hashTable.table;

let currentBlock;

// obtiene el form 
const form = document.getElementById("send-message");
// obtiene el contenedor del chat
const chatContainer = document.getElementById("chat-container");
// guarda el estudiante actual de su respectivo contenedor
let currentChatUser = null;
let currentCarne = "";
// genera la lista de usuarios
function generateChatList() {
  const userTables = newHashTable.table;
// itera sobre la tabla hash y crea un div por cada usuario y el boton de chat
  for (let i = 0; i < userTables.length; i++) {
    const user = userTables[i];
    // obtiene el estudiante actual del local storage 
    const userC = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      if (user.carnet != userC.carnet) {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `
        <div class="chat-button mb-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100" id="${user.carnet}" >
        Carnet - ${user.carnet} - ${user.user.name}</div>
        `;
        chatContainer.appendChild(userDiv);

        userDiv.addEventListener("click", (event) => {
          //obtiene el ID del usuario
          const userId = event.currentTarget.id;
          // encuentra al usuario basandose en busqueda por ID
          const selectedUser = userTables.find(
            (user) => user != null && user.carnet === userId
          );
          // Obtiene el boton de chat 
          const chatButton = event.currentTarget.querySelector(".chat-button");
          // guarda el carnet actual en el local storage 
          localStorage.setItem("currentCarnet", chatButton.id);
          setCurrentChatUser();
        });
      }
    }
  }
}

//obtiene la hora actual
function currentDate() {
  let cadena = "";
  const fechaActual = new Date();
  cadena +=
    fechaActual.getDate() < 10
      ? "0" + fechaActual.getDate() + "-"
      : fechaActual.getDate() + "-";
  cadena +=
    fechaActual.getMonth() < 10
      ? "0" + (fechaActual.getMonth() + 1) + "-"
      : fechaActual.getMonth() + "-";
  cadena += fechaActual.getFullYear() + "::";
  cadena +=
    fechaActual.getHours() < 10
      ? "0" + fechaActual.getHours() + ":"
      : fechaActual.getHours() + ":";
  cadena +=
    fechaActual.getMinutes() < 10
      ? "0" + fechaActual.getMinutes() + ":"
      : fechaActual.getMinutes() + ":";
  cadena +=
    fechaActual.getSeconds() < 10
      ? "0" + fechaActual.getSeconds()
      : fechaActual.getSeconds();
  return cadena;
}

// funcion para enviar un mensaje
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // crea el blockchain
  const blockchain = getBlockchain();
  //obtiene el mensaje
  const message = document.getElementById("message").value;
  const { carnet } = JSON.parse(localStorage.getItem("user")); 
  const receiver = currentChatUser.carnet; 
  // inserta el bloque en el blockchain
  await blockchain.insertBlcok(currentDate(), carnet, receiver, message);
  //blockchain serializado
  const serializedBlockChain = blockchain.serialize();
  //guarda el blockchain en el local storage
  localStorage.setItem("blockchain", JSON.stringify(serializedBlockChain));

  document.getElementById("message").value = "";
  setCurrentChatUser();
});

// funcion para colocar el chat del estudiante actual
async function setCurrentChatUser() {
  // obtiene el chat del estudiante actual
  const carnet = localStorage.getItem("currentCarnet");
  // obtiene el ID del mensaje
  const selectedUser = newHashTable.table.find(
    (user) => user != null && user.carnet === carnet
  );
  currentChatUser = selectedUser;
  const chatTitle = document.getElementById("title-chat");
  chatTitle.innerHTML = `Chateando con:  ${currentChatUser.user.name}`;

  // obtiene el contenedor de mensajes
  const messagesContainer = document.getElementById("chat-messages");
  // obtiene el usuario 
  const user = JSON.parse(localStorage.getItem("user"));
  // setea los mensajes
  const messages = getBlocks();

  // limpia el contenedor de mensajes
  messagesContainer.innerHTML = "";
  for (const message of messages) {
    // muestra los mensajes del estudiante actual y el seleccionado
    if (
      (message.receiver === carnet && message.transmitter === user.carnet) ||
      (message.receiver === user.carnet && message.transmitter === carnet)
    ) {
      if (message.transmitter == user.carnet) {
        // desencripta el mensaje del emisor
        let string = await decrypt(message.message);
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `
        <div class="bg-blue-300 rounded-lg p-2 mb-2 text-right">
        <p class="font-bold"><font size="3" color="gold">Tú: ${string}</font></p>
          <p></p>
        </div>
        `;
        messagesContainer.appendChild(messageDiv);
      } else {
        // desencripta el mensaje del emisor
        let string = await decrypt(message.message);
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `
        <div class="bg-gray-200 rounded-lg p-2 mb-2">
          <p class="font-bold">${currentChatUser.user.name}: ${string} </p>
    
        </div>
        `;
        messagesContainer.appendChild(messageDiv);
      }
    }
  }
}

// otiene blockchain del local storage
function getBlockchain() {
  const blockchain = JSON.parse(localStorage.getItem("blockchain"));
  // si blockchain vacio,crea uno nuevo 
  if (blockchain.length === 0) {
    return new BlockChain();
  }

  //si el blockchain no es nulo lo deserealiza 
  const newBlockchain = new BlockChain();
  newBlockchain.deserialize(blockchain);
  return newBlockchain;
}

//obtiene la lista de bloques del local storage 
function getBlocks() {
  const blockchain = JSON.parse(localStorage.getItem("blockchain"));
  return blockchain;
}

generateChatList();
```
## tablaHash.js__

``` javascript
const hashTable = JSON.parse(localStorage.getItem("hashTable"));

// obtiene la tabla 
const tableBody = document.querySelector("#table-students tbody");
const tablePermissionsBody = document.querySelector("#table-permissions tbody");
//setea inorder 
const setInOrderTable = () => {
  //coloca la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${
          index + 1
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.carnet
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.user.name
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.password
        }</td>
      `;
      tableBody.appendChild(row);
    }
  });
};

// da los permisos 
const setPermissions = () => {
  // obtiene la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      if (
        !(node.user.directories.root.matrix.permisos.length === 0) ||
        !(node.user.directories.root.matrix.convertedFiles.length === 0)
      ) {
        const directories = node.user.directories.root;
        // crea una lista para guardar matrz con permisos 
        let listMatrix = [];
        // evalua si la matriz esta vacia 
        if (directories.matrix.permisos.length !== 0) {
          listMatrix.push({
            matrix: directories.matrix,
            path: directories.value,
          });
        }
        // funcion recursiva para iterar el siguiente y primer nodo para encontrar si la matriz esta vacia o no 
        listMatrix = [...listMatrix, ...getMatrix(directories.first)];

        // itera la lista para crear una tabla 
        listMatrix.forEach((permissions, index) => {
          permissions.matrix.permisos.forEach((permission) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${node.user.carnet.toString()}</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.carnet
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">"${
              permissions.path 
            }"</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.file_name 
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.permission 
            }</td>
            `;
            tablePermissionsBody.appendChild(row);
          });
        });
      }
    }
  });
};

let path = "";

const getMatrix = (node) => {
  let listMatrix = [];

  // si la matriz no esta vacía la añade al path 
  if (node) {
    if (
      node.matrix.permisos.length !== 0 &&
      node.matrix.convertedFiles.length !== 0
    ) {
      listMatrix.push({ matrix: node.matrix, path: path + node.value });
    }
    path = "";
    if (node.first) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.first));
    }
    if (node.next) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.next));
    }
  }
  path = "";
  return listMatrix;
};

setInOrderTable();
setPermissions();


```