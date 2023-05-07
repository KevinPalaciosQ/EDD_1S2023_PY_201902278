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
    this.left = null;
    this.right = null;
    this.height = 1;
    this.balance_factor = 0;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
  }

  // Retorna altura del arbol 
  height(root) {
    return root === null ? 0 : root.height;
  }

  //Retorna el factor de balance 
  balanceFactor(root) {
    return root === null ? 0 : this.height(root.right) - this.height(root.left);
  }

  // Rotación simple a la izquierda
  rotateLeft(root) {
    let root_right = root.right;
    let root_child_left = root_right.left;
    root_right.left = root;
    root.right = root_child_left;
    // Cambia la Altura
    root.height = 1 + Math.max(this.height(root.left), this.height(root.right));
    root_right.height =
      1 + Math.max(this.height(root_right.left), this.height(root_right.right));
    root.balance_factor = this.balanceFactor(root);

    root_right.balance_factor = this.balanceFactor(root_right);

    return root_right;
  }
  // rotacion simple a la derecha
  rotateRight(root) {
    let root_left = root.left;
    let root_child_right = root_left.right;
    root_left.right = root;
    root.left = root_child_right;
    // cambia la altura
    root.height = 1 + Math.max(this.height(root.left), this.height(root.right));
    root_left.height =
      1 + Math.max(this.height(root_left.left), this.height(root_left.right));
    root.balance_factor = this.balanceFactor(root);
    root_left.balance_factor = this.balanceFactor(root_left);
    return root_left;
  }


  _insertValue(node, root) {
    if (root === null) {
      return node;
    } else {
      if (root.value == node.value) {
        root.value = node.value;
      } else if (node.value < root.value) {
        root.left = this._insertValue(node, root.left);
      } else {
        root.right = this._insertValue(node, root.right);
      }
    }
    // modifica la altura de las hojas
    root.height = 1 + Math.max(this.height(root.left), this.height(root.right));

    let balance = this.balanceFactor(root);
    root.balance_factor = balance;

    // rotación simple a la derecha
    if (balance > 1 && node.value > root.right.value) {
      return this.rotateLeft(root);
    }
    if (balance < -1 && node.value < root.left.value) {
      return this.rotateRight(root);
    }
    if (balance > 1 && node.value < root.right.value) {
      root.right = this.rotateRight(root.right);
      return this.rotateLeft(root);
    }
    if (balance < -1 && node.value > root.left.value) {
      root.left = this.rotateLeft(root.left);
      return this.rotateRight(root);
    }

    return root;
  }


  insertarValor(value, student) {
    const newNode = new Node(value, student);
    this.root = this._insertValue(newNode, this.root);
  }
  // busca y retorna al estudiante
  searchStudent(value) {
    let current = this.root;
    while (current != null) {
      if (current.value == value) {
        return current.student;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  searchCarnet(value) {
    let current = this.root;
    while (current != null) {
      if (current.value == value) {
        return true
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  // Actualiza el estudiante
  updateStudent(value, student) {
    let current = this.root;
    while (current != null) {
      if (current.value == value) {
        console.log("Encontrado");
        current.student = student;
        return;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }
  

  //elimina el arbol 
  deleteAll() {
    this.root = null;
  }
  
  createGraphvizCode() {
    let texto = "digraph G {\n";

    // Añade los atributos de graphiz
    texto += "  node [shape=circle, color=skyblue, fontcolor=white, style=filled];\n";
    texto += "  edge [arrowsize=1.0, color=green];\n";
    texto += "  graph [bgcolor=lightgrey];\n";
    function addNode(node) {
      if (node != null) {
        let nodeLabel = node.value.toString();
        let student = node.student;
        texto += `  ${nodeLabel} [label="${nodeLabel} \\n ${student.name} \\n Altura:${node.height}"];\n`;
        if (node.left != null) {
          texto += `  ${nodeLabel} -> ${node.left.value};\n`;
          addNode(node.left);
        }
        if (node.right != null) {
          texto += `  ${nodeLabel} -> ${node.right.value};\n`;
          addNode(node.right);
        }
      }
    }


    addNode(this.root);

    texto += "}";

    return texto;
  }

  inOrder(root) {
    let list = [];
    if (root != null) {
      list = list.concat(this.inOrder(root.left));
      list.push(root);
      list = list.concat(this.inOrder(root.right));
    }
    return list;
  }

  preOrder(root) {
    let list = [];
    if (root != null) {
      list.push(root);
      list = list.concat(this.preOrder(root.left));
      list = list.concat(this.preOrder(root.right));
    }
    return list;
  }

  postOrder(root) {
    let list = [];
    if (root != null) {
      list = list.concat(this.postOrder(root.left));
      list = list.concat(this.postOrder(root.right));
      list.push(root);
    }
    return list;
  }
}