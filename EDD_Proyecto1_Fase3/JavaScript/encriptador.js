
const secretKey = '1234567890ABCDEF';
const buffer = new ArrayBuffer(16); //se usan 16 bytes para AES-128
const view = new Uint8Array(buffer);

//convierte la llave a un Array de 16 bytes
for(let i = 0; i < secretKey.length; i++) {
  view[i] = secretKey.charCodeAt(i); //guardar el código de caracteres
}

const iv = new Uint8Array(16) //crea un Array de 16 bytes
const algorithm = { name: 'AES-GCM', iv: iv }; //especifica el algoritmo y le inicialización del vector


//encripta los datos 
export async function encryptPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const key = await crypto.subtle.importKey('raw', encoder.encode(secretKey), { name: 'AES-CBC' }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const cipherText = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data);
  const cipherArray = Array.from(new Uint8Array(cipherText));
  const base64Cipher = btoa(cipherArray.map(byte => String.fromCharCode(byte)).join(''));
  const base64Iv = btoa(Array.from(iv).map(byte => String.fromCharCode(byte)).join(''));
  return `${base64Cipher}.${base64Iv}`;  
}

//desencripta los datos
export async function decryptPassword(encryptedPassword) {
  const [base64Cipher, base64Iv] = encryptedPassword.split('.');
  const decoder = new TextDecoder();
  const cipherArray = new Uint8Array(atob(base64Cipher).split('').map(char => char.charCodeAt(0)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secretKey), { name: 'AES-CBC' }, false, ['decrypt']);
  const iv = new Uint8Array(atob(base64Iv).split('').map(char => char.charCodeAt(0)));
  const plainText = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, cipherArray);
  return decoder.decode(plainText);
}


//encripta los datos 
export async function encrypt(data) {
  const encoder= new TextEncoder();
  const dataEnconder = encoder.encode(data); //codifica los datos como UTF-8

  const keyCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt']); //importa la llave

  const encrypted = await crypto.subtle.encrypt(algorithm, keyCrypto, dataEnconder); //encrypta los datos 

  const base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(encrypted))); //codifica los datos encriptados como base 64

  return base64;
}

//desencripta los datos 
export async function decrypt(data) {

  const msgEncrypted = new Uint8Array(atob(data).split("").map(char => char.charCodeAt(0))); //decodifica la base 64 de los datos
  
  const keyCrypted = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt']); //importa la llave
  
  const msgDecrypted = await crypto.subtle.decrypt(algorithm, keyCrypted, msgEncrypted); //desencripta los datos
  
  const decoder = new TextDecoder();
  
  const msg = decoder.decode(msgDecrypted); //decodifica los datos como UTF-8
  
  return msg;
}