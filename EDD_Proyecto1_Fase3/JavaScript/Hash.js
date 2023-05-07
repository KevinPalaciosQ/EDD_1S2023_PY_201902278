class nodeHash {
    constructor(carnet, user, password) {
      this.carnet = carnet;
      this.user = user;
      this.password = password;
      //añade el grafo == arbol enario
    }
  }
  
  //inicia tabla Hash
  export class HashTable {
    constructor() {
      this.table = new Array(7); // Se usan site posiciones
      this.capacity = 7; //ahora si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla-> 13
      this.util = 0; //cuenta cuantos elementos hay en la tabla 
    }
  
    // añade un nuevo elemento 
    insert(carnet, user, password) {
      let index = this.calcuateIndex(carnet);
  
      const newNode = new nodeHash(carnet, user, password);
  
      if(index < this.capacity) { //inserta elementos en la tabla 
        try {
          if(this.table[index] == null) {
            this.table[index] = newNode;
            this.util++;
            this.capacityTable(); //si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla 
          }else {
            let c = 1;
            index = this.reCalculateIndex(carnet, c);
            while(this.table[index] != null) {
              c++;
              index = this.reCalculateIndex(carnet, c);
            }
            this.table[index] = newNode;
            this.util++;
            this.capacityTable(); //si pasamos el 75% de la capacidad necesitamos aumentar el rehashing de la tabla
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  
    //calcula el indice y su posición ingresa un nuevo elemento
    calcuateIndex(carnet) {
      let string_carnet = carnet.toString();
      let divisor = 0;
  
      for(let i = 0; i<string_carnet.length; i++) {
        divisor = divisor + string_carnet.charCodeAt(i);
      }
  
      let final_index = divisor % this.capacity; //index actual
      return final_index;
    }
  
    //recalcula el inidice 
    reCalculateIndex(carnet, c) {
      let newIndex = this.calcuateIndex(carnet) + c*c;
      let newValue = this.newIndex(newIndex);
      return newValue;
    }
  
    //calcula un nuevo indice 
    newIndex(number) {
      let newPosition = 0;
      if(number < this.capacity) {
        newPosition = number;
      }else {
        newPosition = number - this.capacity;
        newPosition = this.newIndex(newPosition);
      }
  
      return newPosition;
    }
  
    //hace rehashing a la nueva tabla
    capacityTable() {
      let aux_util = this.capacity*0.75; //se encuentra al 75% de su capacidad
      if(this.util > aux_util){
        this.capacity = this.newCapacity();
        this.util = 0;
        this.rehashing();
      }
    }
  
    //calcula la nueva capacidad 
    newCapacity() { //nuevo numero primo 
      let number = this.capacity + 1;
      while(!this.isPrime(number)) {
        number++;
      }
      return number;
    }
  
    //crea el  rehashing
    rehashing() {
      const aux_table = this.table;
      this.table = new Array(this.capacity);
      aux_table.forEach( e => {
        this.insert(e.carnet, e.user, e.password);
      })
    }
  
    //revisa si el número es primo 
    isPrime(number) {
      for(let i = 2; i<number; i++) {
        if(number % i === 0) {
          return false;
        }
      }
      return true;
    }
  
    //busca el usuario 
    searchUser(carnet) {
      console.log(carnet);  
      let index = this.calcuateIndex(carnet);
      if(index < this.capacity) {
        try {
          if(this.table[index] == null){
            return false;
          }else if(this.table[index] != null && this.table[index].carnet == carnet) {
            return this.table[index];
          }else {
            let c = 1;
            index = this.reCalculateIndex(carnet, c);
            while(this.table[index] != null) {
              if(this.table[index].carnet == carnet) {
                return this.table[index];
              }
              c++;
              index = this.reCalculateIndex(carnet, c);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }