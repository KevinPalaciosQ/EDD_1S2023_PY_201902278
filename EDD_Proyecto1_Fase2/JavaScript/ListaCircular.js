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
  
  export class CircularLinkedList {
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
  