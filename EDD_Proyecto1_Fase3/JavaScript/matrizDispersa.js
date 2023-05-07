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
      const newNode = new nodeMatrix(position, -1, carnet, null);
      let piv = this.principal;
      let pivA = this.principal;
  
      while (piv.next) {
        if (newNode.posX > piv.posX) {
          pivA = piv;
          piv = piv.next;
        } else {
          newNode.next = piv;
          newNode.prev = pivA;
          pivA.next = newNode;
          piv.prev = newNode;
          return;
        }
      }
      newNode.prev = piv;
      piv.next = newNode;
    }
  
    insertRow(position, file_name, content) {
      const newNode = new nodeMatrix(-1, position, file_name, content);
      let piv = this.principal;
      let pivA = this.principal;
  
      while (piv.below) {
        if (newNode.posY > piv.posY) {
          pivA = piv;
          piv = piv.below;
        } else {
          newNode.below = piv;
          newNode.above = pivA;
          pivA.below = newNode;
          piv.above = newNode;
          return;
        }
      }
      newNode.above = piv;
      piv.below = newNode;
    }
  
    insertNode(x, y, permisions) {
      const newNode = new nodeMatrix(x, y, permisions, permisions);
      let tempX = this.principal;
      let tempY = this.principal;
  

      while (tempX.next) {
        if (tempX.posX === newNode.posX) {
          break;
        }
        tempX = tempX.next;
      }
      while (true) {
        if (tempX.posY === newNode.posY) {
          break;
        } else if (tempX.below !== null && tempX.below.posY > newNode.posY) {
          newNode.below = tempX.below;
          newNode.above = tempX;
          tempX.below = newNode;
          break;
        } else if (tempX.below === null) {
          newNode.above = tempX;
          newNode.below = tempX.below;
          tempX.below = newNode;
          break;
        } else {
          tempX = tempX.below;
        }
      }
  

      while (tempY.below) {
        if (tempY.posY === newNode.posY) {
          break;
        }
        tempY = tempY.below;
      }
      while (true) {
        if (tempY.posX === newNode.posX) {
          break;
        } else if (tempY.next !== null && tempY.next.posX > newNode.posX) {
          newNode.next = tempY.next;
          newNode.prev = tempY;
          tempY.next = newNode;
        } else if (tempY.next === null) {
          newNode.prev = tempY;
          newNode.next = tempY.next;
          tempY.next = newNode;
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
    //Serializa
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
  
    // Gaphviz
    graphvizReport(name_path) {
      let cadena = "";
      let aux1 = this.principal;
      let aux2 = this.principal;
      let aux3 = this.principal;
      if (aux1 !== null) {
        cadena = "digraph MatrizCapa{ node[shape=box color=skyblue, fontcolor=white, style=filled]  rankdir=UD;  {rank=min; ";
        /** Creacion de los nodos actuales */
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
        /** Conexiones entre los nodos de la matriz */
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
  