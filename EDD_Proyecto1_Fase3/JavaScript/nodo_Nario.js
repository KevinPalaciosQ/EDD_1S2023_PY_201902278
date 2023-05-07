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
    this.root = new nodoNario("/", 0);
    this.nodes_created = 1;
  }

  buscarDirectorio(new_directory, directory_list) {
    if (directory_list[1] === "" && this.root.first !== null) {
      let aux = this.root.first;
      while (aux) {
        if (aux.value === new_directory) {
          return 1;
        }
        aux = aux.next;
      }
      return 2;
    }
    else if (directory_list[1] === "" && this.root.first === null) {
      return 5;
    }

    else if (directory_list[1] === "" && this.root.first === null) {
      return 3;
    }
    else if (directory_list[1] !== "" && this.root.first !== null) {
      let aux = this.root.first;
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

  insertarInOrder(root, newNode) {
    let piv = root.first;
    if (newNode.value < root.first.value) {
      newNode.next = root.first;
      root.first = newNode;
      return root;
    } else {
      while (piv.next) {
        if (newNode.value > piv.value && newNode.value < piv.next.value) {
          newNode.next = piv.next;
          piv.next = newNode;
          return root;
        } else if (newNode.value < piv.value) {
          newNode.next = piv;
          piv = newNode;
          return root;
        } else {
          piv = piv.next;
        }
      }
      piv.next = newNode;
      return root;
    }
  }

  insertarHijo(new_directory, directory_list) {
    const newNode = new nodoNario(new_directory, this.nodes_created);
    this.nodes_created++;

    if (directory_list[1] === "" && this.root.first === null) {
      this.root.first = newNode;
    }

    else if (directory_list[1] === "" && this.root.first !== null) {
      this.root = this.insertarInOrder(this.root, newNode);
    }
    else if (directory_list[1] !== "" && this.root.first !== null) {
      let aux = this.root.first;
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
        aux.first = newNode;
      } else {
        aux = this.insertarInOrder(aux, newNode);
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
    let texto = "";
    if (this.root !== null) {
      texto = "digraph G {";
      texto += this.generarGrafica(this.root);
      texto += "}";
    } else {
      texto = "digraph G { voidTree }";
    }
    return texto;
  }

  generarGrafica(root) {
    let texto = "node[shape=record color=skyblue, fontcolor=white, style=filled]";
    let node = 1;
    let parent = 0;
    texto += "nodo" + parent + '[label="' + this.root.value + '"] ';
    texto += this.valoresSiguientes(this.root.first, node, parent);
    texto += this.conexiones(this.root.first, 0);
    return texto;
  }

  valoresSiguientes(root, node, parent) {
    let texto = "";
    let aux = root;
    let parent_plus = parent;
    if (aux !== null) {
      while (aux) {
        texto += "nodo" + aux.id + '[label="' + aux.value + '"] ';
        aux = aux.next;
      }
      aux = root;
      while (aux) {
        parent_plus++;
        texto += this.valoresSiguientes(aux.first, this.nodes_created, parent_plus);
        aux = aux.next;
      }
    }
    return texto;
  }

  conexiones(root, parent) {
    let texto = "";
    let aux = root;
    if (aux !== null) {
      while (aux) {
        texto += "nodo" + parent + " -> nodo" + aux.id + " ";
        aux = aux.next;
      }
      aux = root;
      while (aux) {
        texto += this.conexiones(aux.first, aux.id);
        aux = aux.next;
      }
    }
    return texto;
  }
  
  eliminarDirectorio(path) {
    let directoryList = path.split("/");
    this.nodes_created--;
    if (directoryList.length === 2) {
      if (this.root.first.value === directoryList[1]) {
        this.root.first = this.root.first.next;
      } else {
        let aux = this.root.first;
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

    if (nodeDirectory === this.root) {
      this.root = null;
    } else if (nodeDirectory === null) {
      alert("La ruta no es válida");
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
    if (directory_list[1] === "" && this.root.first !== null) {
      return this.root;
    }
    else if (directory_list[1] === "" && this.root.first === null) {
      return null;
    }
    else if (directory_list[1] !== "" && this.root.first === null) {
      return null;
    }

    else if (directory_list[1] !== "" && this.root.first !== null) {
      let aux = this.root.first;
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
