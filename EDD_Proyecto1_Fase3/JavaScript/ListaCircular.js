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
    this.head = null;
    this.tail = null;
  }

  append(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = this.head;
    }
  }

  // genera graphviz
  generateGraphviz() {
    let texto = "digraph G { \n";
    texto += "rankdir=LR \n";
    texto += "node [shape=box, color=skyblue, fontcolor=white, style=filled] \n";
    texto += "edge [arrowsize=1.0, color=green];\n";
    texto += "graph [bgcolor=lightgrey];\n";
    let aux = this.head;
    let count = 0;
    do {
      // cambia el formato de fecha 
      let date = new Date(aux.value.date);
      let newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} \\n Hora: ${date.getHours()}:${date.getMinutes()}`;
      texto += `node${count} [label="Acción: ${aux.value.action} \\n Fecha: ${newDate}"] \n`;
      aux = aux.next;
      count++;
    } while (aux != this.head);
    aux = this.head;
    count = 0;
    do {
      texto += `node${count} -> node${count + 1} \n`;
      aux = aux.next;
      count++;
    } while (aux.next != this.head);
    texto += `node${count} -> node0 \n`;
    texto += "}";
    return texto;
  }

  // serializa la lista 
  serialize() {
    let list = [];
    let aux = this.head;
    do {
      list.push(aux.value);
      aux = aux.next;
    } while (aux != this.head);
    return list;
  }

  // deserializa la lista 
  deserialize(list) {
    list.forEach((element) => {
      this.append(element);
    });
  }
}
