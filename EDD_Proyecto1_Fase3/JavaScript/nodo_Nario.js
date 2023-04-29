import { SparseMatrix } from "./matrizDispersa.js";

export class nodoNario {
  constructor(value, id) {
    this.next = null;
    this.value = value;
    this.first = null;
    this.id = id;
    this.matrix = new SparseMatrix(value);
  }
}

export class N_arioTree {
  constructor() {
    this.raiz = new nodoNario("/", 0);
    this.nodes_created = 1;
  }

  searchDirectory(new_directory, directory_list) {
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

  insertInOrder(raiz, nuevoNodo) {
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

  insertChildren(new_directory, directory_list) {

    const nuevoNodo = new nodoNario(new_directory, this.nodes_created);
    this.nodes_created++;

    if (directory_list[1] === "" && this.raiz.first === null) {
      this.raiz.first = nuevoNodo;
    }

    else if (directory_list[1] === "" && this.raiz.first !== null) {
      this.raiz = this.insertInOrder(this.raiz, nuevoNodo);
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
        aux = this.insertInOrder(aux, nuevoNodo);
      }
    }
  }

  insertarValor(path, new_directory) {
    let directory_list = path.split("/");
    let directory_exist = this.searchDirectory(new_directory, directory_list);
    switch (directory_exist) {
      case 1:
        let copyDirectory = `Copia ${new_directory}`;
        this.insertChildren(copyDirectory, directory_list);
        break;
      case 2:
        this.insertChildren(new_directory, directory_list);
        break;
      case 3:
        alert("El directorio no es valido");
        break;
      case 4:
        alert("El directorio no es valido");
        break;
      case 5:
        this.insertChildren(new_directory, directory_list);
        break;
    }
  }

  graphTree() {
    let graph = "";
    if (this.raiz !== null) {
      graph = "digraph G {";
      graph += this.generateGraph(this.raiz);
      graph += "}";
    } else {
      graph = "digraph G { voidTree }";
    }
    return graph;
  }

  generateGraph(raiz) {
    let graph = "node[shape=record color=skyblue, fontcolor=white, style=filled]";
    let node = 1;
    let parent = 0;
    graph += "nodo" + parent + '[label="' + this.raiz.value + '"] ';
    graph += this.nextValues(this.raiz.first, node, parent);
    graph += this.conections(this.raiz.first, 0);
    return graph;
  }

  nextValues(raiz, node, parent) {
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
        graph += this.nextValues(aux.first, this.nodes_created, parent_plus);
        aux = aux.next;
      }
    }
    return graph;
  }

  conections(raiz, parent) {
    let graph = "";
    let aux = raiz;
    if (aux !== null) {
      while (aux) {
        graph += "nodo" + parent + " -> nodo" + aux.id + " ";
        aux = aux.next;
      }
      aux = raiz;
      while (aux) {
        graph += this.conections(aux.first, aux.id);
        aux = aux.next;
      }
    }
    return graph;
  }
  
  deleteDirectory(path) {
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

    let nodeDirectory = this.searchDirectoryValue(directoryList);
    let parentDirectory = this.searchDirectoryValue(
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

  searchDirectoryValue(directory_list) {
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

  updateDirectory(path, new_directory) {
    let directory_list = path.split("/");
    let directory_exist = this.searchDirectoryValue(directory_list);
    if (directory_exist !== null) {
      directory_exist = new_directory;
    } else {
      alert("La ruta no es válida");
    }
  }

  currentDirectory(path) {
    let directory_list = path.split("/");
    let directory_exist = this.searchDirectoryValue(directory_list);
    if (directory_exist !== null) {
      return directory_exist;
    } else {
      return null;
    }
  }

  showDirectories(path) {
    const list_directories = [];
    let directory_list = path.split("/");
    let directory_exist = this.searchDirectoryValue(directory_list);
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
