
import { BlockChain } from "../JavaScript/BlockChain.js"
// obtiene el blockchain de local storage
const blockchain = JSON.parse(localStorage.getItem('blockchain'));

// convierte el blockchain a BlockChain objecto
const currentBlockChain = new BlockChain();
currentBlockChain.deserialize(blockchain);

// bloque actual
let currentBlock ;

// botones
const next = document.getElementById("siguiente");
const previous = document.getElementById("anterior");
const report = document.getElementById("reporte");

// coloca bloque actualo
report.addEventListener("click", () => {
  currentBlock = currentBlockChain.head;
  console.log(currentBlock);
  if(currentBlock != null ){
    let string =`
    Index: ${currentBlock.value.index} \n
    TimeStamp: ${currentBlock.value.timestamp} \n
    Emisor: ${currentBlock.value.transmitter} \n
    Receptor: ${currentBlock.value.receiver} \n
    Previous: ${currentBlock.value.previousHash} \n
    Hash: ${currentBlock.value.hash} \n
    `;
    //coloca el texto en el text area 
    document.getElementById("messages").value = string;
  }
});

// siguiente reporte 
next.addEventListener('click', () => {
  if(currentBlock.next != null) {
    currentBlock = currentBlock.next;
    let string =`
    Index: ${currentBlock.value.index} \n
    TimeStamp: ${currentBlock.value.timestamp} \n
    Emisor: ${currentBlock.value.transmitter} \n
    Receptor: ${currentBlock.value.receiver} \n
    Previous: ${currentBlock.value.previousHash} \n
    Hash: ${currentBlock.value.hash} \n
    `;
    // coloca el texto en el text area 
    document.getElementById('messages').value = string;
  }
});

// reporte previo 
previous.addEventListener('click', () => {
  if(currentBlock.previous != null) {
    currentBlock = currentBlock.previous;
    let string =`
    Index: ${currentBlock.value.index} \n
    TimeStamp: ${currentBlock.value.timestamp} \n
    Emisor: ${currentBlock.value.transmitter} \n
    Receptor: ${currentBlock.value.receiver} \n
    Previous: ${currentBlock.value.previousHash} \n
    Hash: ${currentBlock.value.hash} \n
    `;
    // coloca el texto en el text area 
    document.getElementById("messages").value = string;
  }
});


const graph = (block) => {
  // crea el graphiz
  let code = 'digraph G {';
  let currNode = 'node0';
  code += `${currNode} [label="", shape="square"color=skyblue, fontcolor=white, style=filled];`;
  
  for (let i = 1; i < block.length; i++) {
    let nextNode = `node${i}`;
    let data = `
    TimeStamp: ${block[i].timeStamp} \\n
    Emisor: ${block[i].transmitter} \\n
    Receptor: ${block[i].receiver} \\n
    Previous: ${block[i].previousHash} \\n
    `;
    code += `${nextNode} [label=" ${data}",color=skyblue, fontcolor=white, style=filled];`;
    
    code += `${currNode} -> ${nextNode};`;
    currNode = nextNode;
  }
  code += '}';
  return code;
};

const refreshImage = () => {
  const url = "https://quickchart.io/graphviz?graph=";
  const body = graph(blockchain);
  const image = document.getElementById("image");
  image.src = url + body;
};

refreshImage(); 