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
