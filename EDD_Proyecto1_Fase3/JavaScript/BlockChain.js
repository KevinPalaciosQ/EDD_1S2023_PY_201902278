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