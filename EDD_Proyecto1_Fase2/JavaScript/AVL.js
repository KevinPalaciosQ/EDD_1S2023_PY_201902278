//Importaciones
import { N_arioTree } from "./nodo_Nario.js";
import { CircularLinkedList } from "./ListaCircular.js";
export class userStudent {
  constructor(name, carnet, password, root_file) {
    this.name = name;
    this.carnet = carnet;
    this.password = password;
    this.root_file = root_file;
    // Implementando el arbol Nario y ListaCircular 
    this.directories = new N_arioTree();
    this.binnacle = new CircularLinkedList();
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